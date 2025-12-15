// @ts-check
import vercel from '@astrojs/vercel';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  adapter: vercel(),
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
  },
});
