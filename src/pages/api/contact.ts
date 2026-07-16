/**
 * POST /api/contact — receives the contact form on the landing page,
 * validates input with Zod, applies a basic in-memory rate limit per
 * IP, and forwards the message to contacto@fisiored.cl via SMTP using
 * the configured Gmail App Password.
 *
 * Same pattern as a FastAPI endpoint:
 *   - schema validation (Pydantic -> Zod)
 *   - typed handler (Python type hints -> TS inference)
 *   - automatic 400 on invalid body
 *
 * Env vars required at runtime:
 *   SMTP_HOST  — SMTP server hostname (defaults to smtp.hostinger.com)
 *   SMTP_PORT  — SMTP port (defaults to 465, SSL)
 *   SMTP_USER  — sending account (e.g. contacto@fisiored.cl)
 *   SMTP_PASS  — password for that account
 *   MAIL_TO    — destination address (defaults to contacto@fisiored.cl)
 */

// @ts-check
import type { APIRoute } from 'astro';
import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import nodemailer from 'nodemailer';

export const prerender = false;

const ContactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, 'El nombre es muy corto.')
    .max(100, 'El nombre es muy largo.'),
  email: z.email('Email inválido.').max(150, 'Email demasiado largo.'),
  telefono: z
    .string()
    .trim()
    .max(30, 'Teléfono demasiado largo.')
    .optional()
    .or(z.literal(''))
    .transform((v) => (v ? v : undefined)),
  asunto: z.enum(['general', 'servicios', 'convenios', 'otro'], {
    message: 'Asunto inválido.',
  }),
  mensaje: z
    .string()
    .trim()
    .min(10, 'El mensaje es muy corto (mínimo 10 caracteres).')
    .max(2000, 'El mensaje es muy largo (máximo 2000 caracteres).'),
  // Honeypot field — must remain empty. Bots typically fill every input.
  website: z
    .string()
    .max(0, 'Spam detectado.')
    .optional(),
});

const AsuntoLabel: Record<z.infer<typeof ContactSchema>['asunto'], string> = {
  general: 'Información general',
  servicios: 'Consulta sobre servicios',
  convenios: 'Coberturas y convenios',
  otro: 'Otro',
};

// ---------- Helpers ----------

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Naive in-memory rate limit: 5 requests / minute / IP.
 *  Resets on process restart. Good enough for a landing page. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; resetInSec: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || record.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true, resetInSec: 0 };
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, resetInSec: Math.ceil((record.resetAt - now) / 1000) };
  }

  record.count++;
  return { allowed: true, resetInSec: 0 };
}

function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

// ---------- Hono app ----------

const app = new Hono()
  .use('*', async (c, next) => {
    // Security headers on every response
    await next();
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('X-Frame-Options', 'DENY');
    c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    c.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  })
  .post(
    '/api/contact',
    zValidator('json', ContactSchema, (result, c) => {
      if (!result.success) {
        const flat = z.flattenError(result.error);
        return c.json({ ok: false, errors: flat.fieldErrors }, 400);
      }
      return undefined;
    }),
    async (c) => {
      const data = c.req.valid('json');

      // Honeypot — silently succeed so bots don't learn.
      if (data.website && data.website.length > 0) {
        return c.json({ ok: true });
      }

      // Rate limit
      const ip = getClientIp(c.req.raw);
      const rl = checkRateLimit(ip);
      if (!rl.allowed) {
        return c.json(
          {
            ok: false,
            error: `Demasiadas solicitudes. Probá en ${rl.resetInSec}s.`,
          },
          429
        );
      }

      // Send email
      const smtpUser = import.meta.env.SMTP_USER;
      const smtpPass = import.meta.env.SMTP_PASS;
      const mailTo = import.meta.env.MAIL_TO ?? 'contacto@fisiored.cl';

      if (!smtpUser || !smtpPass) {
        console.error('[contact] SMTP_USER or SMTP_PASS not configured');
        return c.json(
          { ok: false, error: 'Servicio no configurado. Contactanos por WhatsApp.' },
          500
        );
      }

      try {
        const smtpHost = import.meta.env.SMTP_HOST ?? 'smtp.hostinger.com';
        const smtpPort = Number(import.meta.env.SMTP_PORT ?? 465);
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: { user: smtpUser, pass: smtpPass },
        });

        const subject = `[Web] [${AsuntoLabel[data.asunto]}] ${data.nombre}`;
        const safeNombre = escapeHtml(data.nombre);
        const safeEmail = escapeHtml(data.email);
        const safeTel = data.telefono ? escapeHtml(data.telefono) : '—';
        const safeAsunto = escapeHtml(AsuntoLabel[data.asunto]);
        const safeMsg = escapeHtml(data.mensaje).replace(/\n/g, '<br>');

        await transporter.sendMail({
          from: `"FisioRed Web" <${smtpUser}>`,
          to: mailTo,
          replyTo: data.email,
          subject,
          text: [
            `Nombre: ${data.nombre}`,
            `Email: ${data.email}`,
            `Teléfono: ${data.telefono ?? '—'}`,
            `Asunto: ${AsuntoLabel[data.asunto]}`,
            '',
            'Mensaje:',
            data.mensaje,
          ].join('\n'),
          html: `
            <div style="font-family: Inter, system-ui, sans-serif; max-width: 560px; color: #191c1d;">
              <h2 style="margin: 0 0 16px; color: #006857; font-weight: 700;">Nueva consulta desde la web</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #6d7a75; width: 110px;">Nombre</td><td style="padding: 6px 0; font-weight: 600;">${safeNombre}</td></tr>
                <tr><td style="padding: 6px 0; color: #6d7a75;">Email</td><td style="padding: 6px 0;"><a href="mailto:${data.email}" style="color: #006857;">${safeEmail}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #6d7a75;">Teléfono</td><td style="padding: 6px 0;">${safeTel}</td></tr>
                <tr><td style="padding: 6px 0; color: #6d7a75;">Asunto</td><td style="padding: 6px 0;">${safeAsunto}</td></tr>
              </table>
              <hr style="border: 0; border-top: 1px solid #e1e3e4; margin: 20px 0;" />
              <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${safeMsg}</p>
              <hr style="border: 0; border-top: 1px solid #e1e3e4; margin: 20px 0;" />
              <p style="color: #6d7a75; font-size: 12px; margin: 0;">
                IP origen: ${escapeHtml(ip)} · ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}
              </p>
            </div>
          `,
        });

        return c.json({ ok: true });
      } catch (err) {
        console.error('[contact] SMTP error:', err);
        return c.json(
          {
            ok: false,
            error:
              'No pudimos enviar tu mensaje. Por favor escribinos por WhatsApp al +56 9 2009 2455.',
          },
          500
        );
      }
    }
  )
  .get('/api/contact', (c) => c.text('Method Not Allowed', 405))
  .all('*', (c) => c.text('Not Found', 404));

export const ALL: APIRoute = ({ request }) => app.fetch(request);
export const POST: APIRoute = ({ request }) => app.fetch(request);
