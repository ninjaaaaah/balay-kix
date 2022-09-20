<template>
  <div class="m-8 flex flex-col gap-8 items-center">
    <select class="select w-full max-w-xs" v-model="colorMode.preference">
      <option disabled selected>Theme</option>
      <option v-for="theme of themes" :key="theme">
        {{ theme }}
      </option>
    </select>
    <div class="grid grid-flow-col grid-cols-4 grid-rows-2 gap-8">
      <button
        class="h-24 w-24 btn rounded-btn btn-primary text-primary-content shadow-sm"
      >
        Primary
      </button>
      <button
        class="h-24 w-24 btn rounded-btn btn-success text-success-content shadow-sm"
      >
        Success
      </button>
      <button
        class="h-24 w-24 btn rounded-btn btn-secondary text-secondary-content shadow-sm"
      >
        Secondary
      </button>
      <button
        class="h-24 w-24 btn rounded-btn btn-info text-info-content shadow-sm"
      >
        Info
      </button>
      <button
        class="h-24 w-24 btn rounded-btn btn-accent text-accent-content shadow-sm"
      >
        Accent
      </button>
      <button
        class="h-24 w-24 btn rounded-btn btn-warning text-warning-content shadow-sm"
      >
        Warning
      </button>
      <button
        class="h-24 w-24 btn rounded-btn btn-error text-error-content shadow-sm"
      >
        Error
      </button>
      <button class="h-24 w-24 btn rounded-btn text-primary-content shadow-sm">
        Neutral
      </button>
    </div>
  </div>
</template>

<script setup>
const colorMode = useColorMode();
const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
];
</script>
