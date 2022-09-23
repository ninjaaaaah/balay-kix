<template>
  <div>{{ data }}</div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  title: 'Reports',
});

const { data } = await useFetch('/api/group', {
  initialCache: false,
});
</script>
