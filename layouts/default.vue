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
        <drawer-content />
      </div>
    </div>
  </div>
</template>
