<template>
  <div class="flex flex-row gap-4 w-full h-full">
    <div class="w-4/6 flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <span class="font-bold text-xl">Profile</span>
          <div class="flex justify-end gap-4 mt-4">
            <button class="btn btn-ghost btn-sm" type="button">
              <nuxt-link> Cancel </nuxt-link>
            </button>
            <button
              class="btn btn-primary btn-sm"
              type="submit"
              @click="updateProfile"
            >
              Update Profile
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-4 form-control">
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
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <span class="font-bold text-xl">Groups</span>
        </div>
        <div class="flex flex-col gap-4 form-control">
          <table class="table w-full text-sm table-compact">
            <tbody>
              <!-- row 1 -->
              <tr v-for="group in profile.groups">
                <th>
                  <div class="flex gap-4 items-center">
                    <div class="btn btn-primary btn-circle btn-sm">
                      <icon name="eva:paper-plane-outline" size="1.3em" />
                    </div>
                    {{ group.details.name }}
                  </div>
                </th>
                <td>
                  <div
                    class="flex gap-x-2.5 items-center text-base-content-lighter"
                  >
                    <div class="btn btn-ghost btn-circle btn-sm bg-base-200">
                      <icon name="eva:link-2-outline" size="1.3em" />
                    </div>
                    {{ group.details.code }}
                  </div>
                </td>
                <td class="text-right">
                  <span class="badge badge-accent badge-sm">
                    {{ group.role }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
const code = ref('');

async function updateProfile() {
  const body = {
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

async function joinGroup() {
  const { error } = await useFetch('/api/group', {
    method: 'PUT',
    body: { code: code.value },
    initialCache: false,
  });

  if (error.value) {
    $toast(error.value.message, 'error');
    return;
  }
  $toast('Group joined successfully', 'success');
}
</script>
