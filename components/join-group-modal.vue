<template>
  <input type="checkbox" id="join-group-modal" class="modal-toggle" />
  <label for="join-group-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <div class="flex flex-col gap-4">
        <div class="pb-2">
          <h3 class="font-bold text-lg">Group Code</h3>
          <p>Ask your friends for a group code and enter it here.</p>
        </div>
        <div class="form-control">
          <div class="input-group">
            <input
              v-model="code"
              type="text"
              placeholder="Group Code"
              class="input input-bordered w-full"
            />
            <button class="btn" @click="joinGroup">Join</button>
          </div>
        </div>
      </div>
    </label>
  </label>
</template>

<script setup>
const { $toast } = useNuxtApp();

const code = ref('');

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
  $toast('Group joined successfully!', 'success');
}
</script>
