import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import "nodemailer";
//#region src/pages/api/contact.ts
var contact_exports = /* @__PURE__ */ __exportAll({
	ALL: () => ALL,
	POST: () => POST,
	prerender: () => false
});
var ContactSchema = z.object({
	nombre: z.string().trim().min(2, "El nombre es muy corto.").max(100, "El nombre es muy largo."),
	email: z.email("Email inválido.").max(150, "Email demasiado largo."),
	telefono: z.string().trim().max(30, "Teléfono demasiado largo.").optional().or(z.literal("")).transform((v) => v ? v : void 0),
	asunto: z.enum([
		"general",
		"servicios",
		"convenios",
		"otro"
	], { message: "Asunto inválido." }),
	mensaje: z.string().trim().min(10, "El mensaje es muy corto (mínimo 10 caracteres).").max(2e3, "El mensaje es muy largo (máximo 2000 caracteres)."),
	website: z.string().max(0, "Spam detectado.").optional()
});
var RATE_LIMIT = 5;
var RATE_WINDOW_MS = 6e4;
var rateLimitMap = /* @__PURE__ */ new Map();
function checkRateLimit(ip) {
	const now = Date.now();
	const record = rateLimitMap.get(ip);
	if (!record || record.resetAt < now) {
		rateLimitMap.set(ip, {
			count: 1,
			resetAt: now + RATE_WINDOW_MS
		});
		return {
			allowed: true,
			resetInSec: 0
		};
	}
	if (record.count >= RATE_LIMIT) return {
		allowed: false,
		resetInSec: Math.ceil((record.resetAt - now) / 1e3)
	};
	record.count++;
	return {
		allowed: true,
		resetInSec: 0
	};
}
function getClientIp(request) {
	const xff = request.headers.get("x-forwarded-for");
	if (xff) return xff.split(",")[0].trim();
	const realIp = request.headers.get("x-real-ip");
	if (realIp) return realIp.trim();
	return "unknown";
}
var app = new Hono().use("*", async (c, next) => {
	await next();
	c.header("X-Content-Type-Options", "nosniff");
	c.header("X-Frame-Options", "DENY");
	c.header("Referrer-Policy", "strict-origin-when-cross-origin");
	c.header("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
}).post("/api/contact", zValidator("json", ContactSchema, (result, c) => {
	if (!result.success) {
		const flat = z.flattenError(result.error);
		return c.json({
			ok: false,
			errors: flat.fieldErrors
		}, 400);
	}
}), async (c) => {
	const data = c.req.valid("json");
	if (data.website && data.website.length > 0) return c.json({ ok: true });
	const rl = checkRateLimit(getClientIp(c.req.raw));
	if (!rl.allowed) return c.json({
		ok: false,
		error: `Demasiadas solicitudes. Probá en ${rl.resetInSec}s.`
	}, 429);
	console.error("[contact] SMTP_USER or SMTP_PASS not configured");
	return c.json({
		ok: false,
		error: "Servicio no configurado. Contactanos por WhatsApp."
	}, 500);
}).get("/api/contact", (c) => c.text("Method Not Allowed", 405)).all("*", (c) => c.text("Not Found", 404));
var ALL = ({ request }) => app.fetch(request);
var POST = ({ request }) => app.fetch(request);
//#endregion
//#region \0virtual:astro:page:src/pages/api/contact@_@ts
var page = () => contact_exports;
//#endregion
export { page };
