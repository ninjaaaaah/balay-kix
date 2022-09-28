<template>
  <div>
    <div class="bg-base-300 rounded-box p-4 flex flex-col gap-4">
      <div class="flex justify-between items-center px-2">
        <span class="font-medium">Expenses</span>
        <label
          for="add-expense-modal"
          class="btn btn-ghost btn-sm bg-base-200 capitalize text-base-content-lighter"
        >
          <icon name="eva:file-add-outline" class="mr-2" size="1.5em" />
          Add Expense
        </label>
      </div>
      <transactions-table />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  title: 'Transactions',
});

const { data: group } = await useFetch('/api/group');
</script>
