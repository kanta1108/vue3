<template>
  <section>
    <h2>都市リスト</h2>
    <ul>
      <li v-for="[id, city] in cityList" :key="id">
        <router-link :to="{ name: 'WeatherInfo', params: { id: id } }">
          {{ city.name }}の天気
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useWeatherStore } from '@/stores/weather';
import type { City } from '@/stores/weather';

const weatherStore = useWeatherStore();
weatherStore.prepareCityList();

const cityList = computed((): Map<string, City> => {
  return weatherStore.cityList;
});
</script>

<style scoped></style>
