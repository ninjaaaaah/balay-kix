<template>
  <div>Hello!</div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  title: 'Reports',
});

const { data } = await useFetch('/api/group', {
  method: 'POST',
  initialCache: false,
});

console.log(data);
</script>
