<template>
  <div>
    <div class="bg-base-300 rounded-box p-4 flex flex-col gap-4">
      <!-- <div class="flex justify-between items-center px-2">
        <span class="font-medium">Users</span>
      </div> -->
      <table class="table w-full text-sm table-compact">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="user in users" :key="user.id">
            <th>
              <div class="btn btn-primary btn-circle btn-sm">
                <Icon name="eva:paper-plane-outline" size="1.3em" />
              </div>
            </th>
            <td>{{ `${user.firstname} ${user.lastname}` }}</td>
            <td>{{ user.username }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  title: 'Transactions',
});

const { data: users } = await useFetch('/api/users');
</script>
