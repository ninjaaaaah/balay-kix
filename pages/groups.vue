<template>
  <div class="flex flex-row gap-4 w-full h-full">
    <div class="w-4/6 flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <span class="font-bold text-xl">Groups</span>
        <div class="flex gap-2">
          <label
            for="create-group-modal"
            class="btn btn-ghost btn-sm bg-base-200 capitalize text-base-content-lighter"
          >
            <icon name="eva:person-add-outline" class="mr-2" size="1.5em" />
            Create group
          </label>
          <label
            for="join-group-modal"
            class="btn btn-ghost btn-sm bg-base-200 capitalize text-base-content-lighter"
          >
            <icon name="eva:search-outline" class="mr-2" size="1.5em" />
            Join group
          </label>
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
</script>
