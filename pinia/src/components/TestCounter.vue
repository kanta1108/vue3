<template>
  <div class="section">component</div>
  {{ count }},{{ doubleCount }},{{ tripleCount }}
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const counterStore = useCounterStore();
const { count, doubleCount, tripleCount } = storeToRefs(counterStore);
</script>

<style scoped>
.section {
  border: #fff solid 2px;
  color: #fff;
}
</style>
