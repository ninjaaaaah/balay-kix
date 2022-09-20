<template>
  <form
    key="signup"
    @submit.prevent="signup"
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
      Have an account?
      <nuxt-link to="/login" class="text-accent">Log in</nuxt-link>
    </span>
    <button class="btn btn-primary mt-4" type="submit">Signup</button>
  </form>
</template>

<script setup>
definePageMeta({
  layout: 'base',
  title: 'Signup',
  middleware: 'auth',
});

const { $toast } = useNuxtApp();
const client = useSupabaseClient();
const user = useSupabaseUser();

const email = ref('');
const password = ref('');

async function signup() {
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) $toast(error.message, 'error');
  else $toast('Check your email for the confirmation link.', 'info');
}

watchEffect(() => {
  if (user.value) navigateTo('/login');
});
</script>
