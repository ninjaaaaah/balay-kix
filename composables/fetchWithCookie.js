import { useCookie } from '#app';

export const fetchWithCookie = async (url) => {
  const res = await $fetch.raw(url);
  const cookies = (res.headers.get('set-cookie') || '').split(',');
  for (const cookie of cookies) {
    let [name, value] = cookie.split('=');
    let cookieVar = useCookie(name);
    cookieVar.value = value;
  }
  console.log(res);
  return res;
};
