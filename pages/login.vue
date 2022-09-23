<template>
  <div class="w-full h-full flex items-center justify-between">
    <div class="w-1/2 flex justify-center items-center">
      <form
        key="login"
        @submit.prevent="login"
        class="flex flex-col items-center justify-center gap-4 w-80"
      >
        <div class="h-8 w-8 mb-4">
          <logo />
        </div>
        <input
          v-model="email"
          type="text"
          placeholder="Email address"
          class="input input-bordered w-full"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input input-bordered w-full"
        />
        <span class="text-sm">
          Don't have an account?
          <nuxt-link to="/signup" class="text-accent">Sign up</nuxt-link>
        </span>
        <button class="btn btn-primary mt-4" type="submit">Login</button>
        <button
          class="btn btn-ghost bg-[#fff] mt-4 text-neutral"
          @click="signInWithGithub"
        >
          <div class="w-6 h-6 mr-4">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            />
          </div>
          Sign In with GitHub
        </button>
      </form>
    </div>
    <div class="h-screen w-1/2 bg-primary">
      <art />
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/store/profile';

definePageMeta({
  layout: 'base',
  title: 'Login',
  middleware: 'auth',
});

const { $toast } = useNuxtApp();
const client = useSupabaseClient();
const user = useSupabaseUser();
const store = useProfileStore();

const email = ref('');
const password = ref('');
const isLoggedIn = ref(user.value);

async function login() {
  const { error } = await client.auth.signIn({
    email: email.value,
    password: password.value,
    initialCache: false,
  });
  if (error) $toast(error.message, 'error');

  $toast('Successfully logged in!', 'success');
  const { data: profile } = await useFetch('/api/profile', {
    initialCache: false,
  });
  console.log(profile);
  store.setProfile(profile.value);
  isLoggedIn.value = true;
}

async function signInWithGithub() {
  const { error } = await client.auth.signIn({
    provider: 'github',
    initialCache: false,
  });
  if (error) $toast(error.message, 'error');

  $toast('Successfully logged in!', 'success');
  const { data: profile } = await useFetch('/api/profile', {
    initialCache: false,
  });
  store.setProfile(profile.value);
  isLoggedIn.value = true;
}

watchEffect(() => {
  if (isLoggedIn.value) {
    navigateTo('/');
  }
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
