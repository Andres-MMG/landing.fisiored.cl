// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
//
// Astro 7 default output is 'static', which already supports on-demand
// (server-rendered) routes for any page that sets `export const
// prerender = false`. With @astrojs/node adapter mounted, the build
// produces a hybrid static + Node app: pages stay static, the
// /api/contact endpoint runs on the server.
export default defineConfig({
  site: 'https://fisiored.cl',
  adapter: node({ mode: 'standalone' }),
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
