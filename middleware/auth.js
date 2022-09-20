export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();
  console.log(to.path, ['/login', '/register'].includes(to.path));

  if (to.path === '/login' || to.path === '/signup') {
    if (!user.value) {
      console.log('hi!');
      return;
    }
    return '/';
  }
  if (!user.value) {
    console.log('ho!');
    return '/login';
  }
});
