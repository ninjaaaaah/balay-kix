export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();

  if (to.path === '/login' || to.path === '/signup') {
    if (!user.value) {
      return;
    }
    return '/';
  }
  if (!user.value) {
    return '/login';
  }
});
