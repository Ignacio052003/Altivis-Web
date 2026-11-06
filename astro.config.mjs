import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL y BASE_PATH permiten publicar una vista previa en GitHub Pages
// (https://usuario.github.io/altivis-web/) sin tocar nada.
// En producción (Cloudflare Pages, altivis.es) no hace falta definirlas.
const site = process.env.SITE_URL || 'https://altivis.es';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
