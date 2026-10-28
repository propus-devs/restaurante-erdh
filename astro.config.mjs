// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

const SITE_URL = 'https://elrincondehector.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // /halloween es temporal y va con noindex: fuera del sitemap (ver src/data/halloween.ts).
  // Las páginas legales también van con noindex y fuera del sitemap.
  integrations: [
    icon(),
    sitemap({
      filter: (page) =>
        !page.includes('/halloween') &&
        !/\/(aviso-legal|politica-de-privacidad|politica-de-cookies)\/?$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
      }
    }
  },
});