<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
<template>
  <ul>
    <li v-for="(value, key) in route" :key="key">{{ key }} : {{ value }}</li>
  </ul>
</template>

<style scoped></style>
