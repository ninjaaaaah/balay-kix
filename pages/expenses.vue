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
      <table class="table w-full text-sm table-compact">
        <tbody v-auto-animate>
          <!-- row 1 -->
          <tr v-for="expense in group.expense">
            <th>
              <div class="flex gap-4 items-center">
                <div class="btn btn-primary btn-circle btn-sm">
                  <icon name="eva:paper-plane-outline" size="1.3em" />
                </div>
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
                  // new internationalization of date
                  new Date(expense.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                }}
              </div>
            </td>
            <td>
              <span
                v-for="category in expense.categories"
                class="badge badge-ghost badge-sm"
              >
                {{ category.name }}
              </span>
            </td>
            <td>
              {{ expense.invoices[0].payee.firstname }}
            </td>
            <td>
              <span
                v-for="invoice in expense.invoices"
                class="badge badge-ghost badge-sm"
              >
                {{ invoice.payor.firstname }}
              </span>
            </td>
            <td class="text-right">
              {{
                new Intl.NumberFormat('ph-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(expense.cost)
              }}
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

const handleUpdates = (payload) => {
  console.log('Change received!', payload);
  refresh();
};

const handleDelete = () => {
  console.log('Delete received!');
  refresh();
};

supabase
  .from('expense')
  .on('*', (e) => console.log(e))
  .subscribe();

const members = group.value.members.map((member) => {
  const { id, firstname, lastname } = member.user;
  return { id, firstname, lastname };
});
</script>
