<template>
  <div class="flex flex-col min-w-full min-h-full gap-4">
    <div class="flex items-center justify-between">
      <span class="text-xl font-bold">Expenses</span>
      <label
        for="add-expense-modal"
        class="capitalize btn btn-ghost btn-sm bg-base-200 text-base-content-lighter"
      >
        <icon name="eva:file-add-outline" class="mr-2" size="1.5em" />
        Add Expense
      </label>
    </div>
    <div
      class="flex flex-col gap-4 p-4 overflow-x-auto bg-base-300 rounded-box"
    >
      <table class="table w-full text-sm table-compact">
        <thead class="bg-transparent">
          <tr>
            <th class="text-left" rowspan="2">Item</th>
            <th class="text-left" rowspan="2">Date</th>
            <th class="text-left" rowspan="2">Category</th>
            <th class="text-left" rowspan="2">Cost</th>
            <th class="text-left" rowspan="2">Payee</th>
            <th class="font-medium text-center w-28" v-for="member in members">
              <div
                class="flex flex-row justify-center gap-2 tooltip tooltip-bottom"
                :data-tip="member.firstname"
              >
                <img
                  :src="`https://avatars.dicebear.com/api/adventurer/${member.id}.svg?scale=100`"
                  class="w-6 h-6 rounded-box bg-base-100"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-auto-animate>
          <!-- row 1 -->
          <tr v-for="expense in group.expense">
            <th>
              <div class="flex items-center gap-4">
                {{ expense.name }}
              </div>
            </th>
            <td>
              <div
                class="flex gap-x-2.5 items-center text-base-content-lighter"
              >
                <div class="btn btn-ghost btn-circle btn-sm bg-base-200">
                  <icon name="eva:calendar-outline" size="1.3em" />
                </div>
                {{
                  new Date(expense.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                }}
              </div>
            </td>
            <td>
              <div class="flex gap-2 overflow-x-scroll w-52 scrollbar-hide">
                <span
                  v-for="category in expense.categories"
                  :class="`badge badge-sm badge-${category.color} text-${category.color}-content`"
                >
                  {{ category.name }}
                </span>
              </div>
            </td>
            <td class="text-left">
              {{
                new Intl.NumberFormat('ph-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(expense.cost)
              }}
            </td>
            <td>
              <div class="flex gap-1 px-2 badge badge-ghost badge-md">
                <img
                  :src="`https://avatars.dicebear.com/api/adventurer/${expense.invoices[0].payee.id}.svg?scale=100`"
                  class="w-4 h-4 rounded-box bg-base-100"
                />
                <span>
                  {{ expense.invoices[0].payee.firstname }}
                </span>
              </div>
            </td>
            <td v-for="member in members" class="text-center">
              <input
                type="checkbox"
                :checked="getPayors(expense).includes(member.firstname)"
                class="checkbox checkbox-xs"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <teleport to="body">
      <add-expense-modal :members="members" :categories="categories" />
    </teleport>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  title: 'Transactions',
});

const supabase = useSupabaseClient();

const { data: categories } = await useFetch('/api/categories');
const { data: group, refresh } = await useFetch('/api/group/1');
const { data: expenses } = await useFetch('/api/expense');

const handleUpdates = (payload) => {
  console.log('Change received!', payload);
  refresh();
};

const handleDelete = () => {
  console.log('Delete received!');
  refresh();
};

supabase.from('expense').on('*', handleUpdates).subscribe();

const members = group.value.members.map((member) => {
  const { id, firstname, lastname } = member.user;
  return { id, firstname, lastname };
});

function getPayors(expense) {
  const payors = expense.invoices.map((invoice) => invoice.payor.firstname);
  return payors;
}
</script>
