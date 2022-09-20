<template>
  <div class="bg-base-100 min-h-screen min-w-screen">
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col gap-4 p-8 bg-base-200">
        <!-- Page content here -->
        <div class="w-full lg:hidden">
          <label
            for="my-drawer-2"
            class="drawer-button btn rounded-btn btn-ghost"
          >
            <icon name="eva:menu-outline" size="1.5em" />
          </label>
        </div>
        <slot />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul
          class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content font-semibold"
        >
          <!-- Sidebar content here -->
          <li class="menu-title mb-8 mt-4">
            <a>
              <div
                class="flex gap-4 font-bold text-lg text-neutral items-center"
              >
                <div class="h-8 w-8">
                  <logo />
                </div>
                <span class="text-primary-focus text-2xl">Thryft</span>
              </div>
            </a>
          </li>
          <li class="font-semibold text-base-content">
            <nuxt-link to="/">
              <Icon name="majesticons:dashboard-line" size="1.5em" />
              Dashboard
            </nuxt-link>
          </li>
          <li class="font-semibold text-base-content">
            <nuxt-link to="/transactions">
              <Icon name="icon-park-outline:transaction-order" size="1.5em" />
              Transactions
            </nuxt-link>
          </li>
          <li class="font-semibold text-base-content">
            <nuxt-link to="/reports">
              <Icon name="majesticons:file-report-line" size="1.5em" />
              Reports
            </nuxt-link>
          </li>
          <li class="font-semibold text-base-content">
            <nuxt-link to="/calendar">
              <Icon name="majesticons:calendar-line" size="1.5em" />
              Calendar
            </nuxt-link>
          </li>
          <div class="mt-auto">
            <div class="divider" />
            <li class="font-semibold text-base-content">
              <nuxt-link to="/settings" class="flex justify-between">
                <div class="flex gap-2">
                  <Icon name="majesticons:settings-cog-line" size="1.5em" />
                  Settings
                </div>
                <button
                  class="btn btn-sm btn-circle btn-ghost flex items-center justify-center"
                >
                  <label class="swap swap-rotate" @click.prevent="toggle">
                    <!-- this hidden checkbox controls the state -->
                    <input type="checkbox" :checked="isDarkMode" />

                    <!-- sun icon -->
                    <icon
                      name="eva:sun-outline"
                      size="1.5em"
                      class="swap-on fill-current"
                    />

                    <!-- moon icon -->
                    <icon
                      name="eva:moon-outline"
                      size="1.5em"
                      class="swap-off fill-current"
                    />
                  </label>
                </button>
              </nuxt-link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const mode = useColorMode();
const isDarkMode = ref(mode.preference === 'dark');

function toggle() {
  console.log('dark', isDarkMode.value);
  setTimeout(() => {
    isDarkMode.value = !isDarkMode.value;
    mode.preference = isDarkMode.value ? 'dark' : 'light';
  }, 100);
}
</script>
