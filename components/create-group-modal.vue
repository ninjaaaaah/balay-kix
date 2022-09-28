<template>
  <input type="checkbox" id="create-group-modal" class="modal-toggle" />
  <label for="create-group-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <div class="flex flex-col gap-4">
        <div class="pb-2">
          <h3 class="font-bold text-lg">Create a group</h3>
        </div>
        <div class="form-control">
          <div class="input-group">
            <input
              v-model="name"
              type="text"
              placeholder="Group Name"
              class="input input-bordered w-full focus:outline-none"
            />
            <button class="btn btn-primary" @click="createGroup">Create</button>
          </div>
        </div>
      </div>
    </label>
  </label>
</template>

<script setup>
const { $toast } = useNuxtApp();

const name = ref('');

async function createGroup() {
  const { error } = await useFetch('/api/group', {
    method: 'POST',
    body: { name: name.value },
    initialCache: false,
  });

  if (error.value) {
    $toast(error.value.message, 'error');
    return;
  }
  $toast('Group joined successfully!', 'success');
}
</script>
