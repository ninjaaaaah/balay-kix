import Toast, { POSITION, useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.BOTTOM_LEFT,
  });
  nuxtApp.provide('toast', (msg, type, time = 5000) =>
    toast[type](msg, { timeout: time, hideProgressBar: true })
  );
});
