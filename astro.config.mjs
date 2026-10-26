// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

const SITE_URL = 'https://elrincondehector.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // /halloween es temporal y va con noindex: fuera del sitemap (ver src/data/halloween.ts)
  integrations: [icon(), sitemap({ filter: (page) => !page.includes('/halloween') })],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
      }
    }
  },
});