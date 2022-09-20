import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    'nuxt-icon',
    [
      '@pinia/nuxt',
      { autoImports: ['defineStore', ['defineStore', 'definePiniaStore']] },
    ],
  ],
  colorMode: {
    preference: 'light',
    dataValue: 'theme',
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  router: {
    linkActiveClass: 'active-link',
  },
});
