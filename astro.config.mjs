// @ts-check
import vercel from '@astrojs/vercel';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  adapter: vercel(),
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
  },
});