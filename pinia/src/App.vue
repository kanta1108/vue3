<script setup lang="ts">
import { watch } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import TestCounter from '@/components/TestCounter.vue';

const counterStore = useCounterStore();
const { count, doubleCount, tripleCount } = storeToRefs(counterStore);
const { increment } = counterStore;
watch(count, () => {
  console.log('count', count.value);
  if (count.value > 10) {
    count.value = 0;
  }
});
const reset = () => {
  counterStore.$reset();
};
</script>

<template>
  {{ count }},{{ doubleCount }},{{ tripleCount }}
  <button @click="increment">click</button>
</template>
