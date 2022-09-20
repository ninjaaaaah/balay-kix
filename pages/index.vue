<template>
  <div class="flex flex-row gap-4 w-full h-full">
    <div class="w-4/6 flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <span class="font-bold text-xl">Overview</span>
        <div class="form-control">
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
      <div class="bg-base-300 rounded-box p-4 flex flex-col gap-2">
        <div class="flex justify-between items-center px-2">
          <span class="font-medium">Recent Transactions</span>
          <button
            class="btn btn-ghost btn-sm bg-base-200 capitalize text-base-content"
          >
            <icon name="eva:file-text-outline" class="mr-2" size="1.5em" />
            View All
          </button>
        </div>
        <table class="table w-full text-sm table-compact">
          <tbody>
            <!-- row 1 -->
            <tr>
              <th>
                <div class="btn btn-primary btn-circle btn-sm">
                  <icon name="eva:paper-plane-outline" size="1.3em" />
                </div>
              </th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
            </tr>
            <!-- row 2 -->
            <tr>
              <th>
                <div class="btn btn-accent btn-circle btn-sm">
                  <icon name="eva:undo-outline" size="1.3em" />
                </div>
              </th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
            </tr>
            <!-- row 3 -->
            <tr>
              <th>
                <div class="btn btn-primary btn-circle btn-sm">
                  <Icon name="eva:paper-plane-outline" size="1.3em" />
                </div>
              </th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-base-300 rounded-box p-4 flex flex-col gap-2">
        <div class="flex justify-between items-center px-2">
          <span class="font-medium">Invoices</span>
          <button
            class="btn btn-ghost btn-sm bg-base-200 capitalize text-base-content"
          >
            <icon
              name="material-symbols:add-rounded"
              class="mr-2"
              size="1.5em"
            />
            New Invoice
          </button>
        </div>
        <table class="table w-full text-sm table-compact">
          <tbody>
            <!-- row 1 -->
            <tr>
              <th>
                <div class="btn btn-primary btn-circle btn-sm">
                  <Icon name="eva:paper-plane-outline" size="1.3em" />
                </div>
              </th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
            </tr>
            <!-- row 2 -->
            <tr>
              <th>
                <div class="btn btn-accent btn-circle btn-sm">
                  <Icon name="eva:undo-outline" size="1.3em" />
                </div>
              </th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
            </tr>
            <!-- row 3 -->
            <tr>
              <th>
                <div class="btn btn-primary btn-circle btn-sm">
                  <Icon name="eva:paper-plane-outline" size="1.3em" />
                </div>
              </th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="w-2/6 flex flex-col gap-4">
      <div class="flex justify-between">
        <div class="flex gap-2">
          <button
            class="btn btn-ghost btn-circle bg-base-300 text-base-content"
          >
            <icon name="eva:inbox-outline" size="1.5em" />
          </button>
          <button
            class="btn btn-ghost btn-circle bg-base-300 text-base-content"
          >
            <icon name="eva:bell-outline" size="1.5em" />
          </button>
        </div>
        <div class="dropdown dropdown-end">
          <label
            tabindex="0"
            class="btn btn-ghost rounded-full px-2 bg-base-300 text-base-content capitalize"
          >
            <div class="avatar pr-2">
              <div class="w-8 rounded-full">
                <img
                  src="https://placeimg.com/192/192/people"
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
            <div>{{ name }}</div>
            <icon
              name="eva:arrow-ios-downward-outline"
              size="1.5em"
              class="pl-1"
            />
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <nuxt-link to="/profile">Profile</nuxt-link>
            </li>
            <li><nuxt-link @click="logout">Logout</nuxt-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/store/profile';

definePageMeta({
  layout: 'default',
  title: 'Dashboard',
  middleware: 'auth',
});

const client = useSupabaseClient();
const store = useProfileStore();
const user = useSupabaseUser();

const name = ref(store.firstname);

console.log(name.value);

async function logout() {
  const { error } = await client.auth.signOut();
}

watchEffect(() => {
  if (!user.value) navigateTo('/login');
});
</script>
