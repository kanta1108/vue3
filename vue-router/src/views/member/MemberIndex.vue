<script setup lang="ts">
import { inject } from 'vue';
import type { Member } from '@/interfaces/interfaces';
const memberList = inject('memberList') as Map<number, Member>;
</script>
<template>
  <h3>メンバー一覧</h3>
  <ul v-for="[key, val] in memberList" :key="key">
    <li>{{ val.id }}</li>
    <li>{{ val.name }}</li>
    <li>{{ val.email }}</li>
    <li>{{ val.point }}</li>
    <li>{{ val.note ?? '--' }}</li>
  </ul>
</template>

<style scoped></style>
