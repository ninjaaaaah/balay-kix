<template>
  <div>
    <div class="bg-base-300 rounded-box p-4 flex flex-col gap-4">
      <div class="flex justify-between items-center px-2">
        <span class="font-medium">Transactions</span>
      </div>
      <transactions-table />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  title: 'Invoices',
});

const { data: group } = await useFetch('/api/group');
</script>
