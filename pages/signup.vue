<template>
  <form
    key="signup"
    @submit.prevent="signup"
    class="flex flex-col items-center justify-center gap-4 w-96"
  >
    <div class="h-8 w-8 mb-4">
      <logo />
    </div>
    <div class="flex gap-4">
      <input
        v-model="firstname"
        type="text"
        placeholder="First Name"
        class="input input-bordered w-full"
      />
      <input
        v-model="lastname"
        type="text"
        placeholder="Last Name"
        class="input input-bordered w-full"
      />
    </div>
    <input
      v-model="username"
      type="text"
      placeholder="Username"
      class="input input-bordered w-full"
    />
    <input
      v-model="email"
      type="email"
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

const signupCompleted = ref(false);

const firstname = ref('');
const lastname = ref('');
const username = ref('');
const email = ref('');
const password = ref('');

async function signup() {
  const { error: signUpError, user: newUser } = await client.auth.signUp(
    {
      email: email.value,
      password: password.value,
    },
    {
      data: {
        firstname: firstname.value,
        lastname: lastname.value,
        username: username.value,
      },
    }
  );

  if (signUpError) {
    $toast(signUpError.value.message, 'error');
    return;
  }

  $toast('Check your email for the confirmation link.', 'info');

  const { error: profileError } = await useFetch('/api/profile', {
    method: 'POST',
    body: {
      id: newUser.id,
      firstname: firstname.value,
      lastname: lastname.value,
      username: username.value,
      email: email.value,
    },
    initialCache: false,
  });

  if (profileError) {
    $toast(profileError.value.message, 'error');
    return;
  }

  signupCompleted.value = true;
}

watchEffect(() => {
  if (signupCompleted.value) navigateTo('/login');
});
</script>
