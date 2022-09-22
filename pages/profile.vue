<template>
  <div class="flex flex-row gap-4 w-full h-full">
    <div class="w-4/6 flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <span class="font-bold text-xl">Profile</span>
        <div class="">
          <label class="input-group">
            <span class="bg-base-300 pr-0">
              <icon
                name="eva:search-outline"
                class="mr-2 text-base-content"
                size="1.5em"
              />
            </span>
            <input
              type="text"
              placeholder="Search"
              class="input input-ghost pl-0 bg-base-300 placeholder:text-base-content focus:outline-none"
            />
          </label>
        </div>
      </div>
      <form
        class="flex flex-col gap-4 form-control"
        @submit.prevent="updateProfile"
      >
        <div class="flex gap-4">
          <div class="w-full">
            <label class="label">
              <span class="label-text font-semibold">First Name</span>
            </label>
            <input
              v-model="firstname"
              type="text"
              placeholder="First Name"
              class="input input-bordered w-full"
            />
          </div>
          <div class="w-full">
            <label class="label">
              <span class="label-text font-semibold">Last Name</span>
            </label>
            <input
              v-model="lastname"
              type="text"
              placeholder="Last Name"
              class="input input-bordered w-full"
            />
          </div>
        </div>
        <div class="w-full">
          <label class="label">
            <span class="label-text font-semibold">Username</span>
          </label>
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="input input-bordered w-full"
          />
        </div>
        <div class="w-full">
          <label class="label">
            <span class="label-text font-semibold">Email</span>
          </label>
          <input
            v-model="email"
            disabled
            type="text"
            placeholder="Email"
            class="input input-bordered w-full disabled:bg-base-100 disabled:text-[#9ca3af]"
          />
        </div>
        <div class="w-full flex justify-end gap-4 mt-4">
          <button class="btn btn-ghost" type="button">
            <nuxt-link> Cancel </nuxt-link>
          </button>
          <button class="btn btn-primary" type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/store/profile';

definePageMeta({
  layout: 'default',
  title: 'Profile',
  middleware: 'auth',
});

const { $toast } = useNuxtApp();
const supabase = useSupabaseClient();
const store = useProfileStore();
const user = supabase.auth.user();
console.log(user.id);

const { data: profile } = await useFetch('/api/profile');

// create refs from profile fields
const firstname = ref(profile.value.firstname);
const lastname = ref(profile.value.lastname);
const username = ref(profile.value.username);
const email = ref(profile.value.email);

async function updateProfile() {
  const body = {
    uid: user.id,
    firstname: firstname.value,
    lastname: lastname.value,
    username: username.value,
  };
  const { error } = await useFetch('/api/profile', {
    method: 'PUT',
    body: body,
    initialCache: false,
  });

  if (error.value) {
    $toast(error.value.message, 'error');
    return;
  }
  $toast('Profile updated successfully', 'success');
  store.setProfile(body);
}
</script>
