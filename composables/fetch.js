import { useAuthStore } from '../store/auth';

export default function fetchAPI(url, options = {}) {
  const store = useAuthStore();

  return useFetch(url, {
    ...options,
    baseURL: 'http://localhost:9000',
    mode: 'cors',
    credentials: 'include',
    initialCache: false,

    onRequest({ request, options }) {
      // Set the request headers
      options.headers = options.headers || {};
      options.headers.authorization = 'Bearer ' + store?.accessToken;
      options.body = JSON.stringify(options.body);
      console.log(request);
    },
    async onResponseError({ request, response, options }) {
      if (response.status === 401) {
        await store.refreshToken();
      }
    },
  });
}
