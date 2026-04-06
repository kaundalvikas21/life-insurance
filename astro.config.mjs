import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['gsap', 'gsap/ScrollTrigger'],
    },
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger'],
    },
  }
});