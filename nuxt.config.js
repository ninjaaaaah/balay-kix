import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: false,
  target: 'static',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    'nuxt-icon',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
  ],
  colorMode: {
    preference: 'light',
    dataValue: 'theme',
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  css: ['~/assets/css/multiselect.css'],
  supabase: {
    client: {
      cookieOptions: {
        setCookie: true,
      },
    },
  },
});
