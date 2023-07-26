import { createRouter, createWebHistory } from 'vue-router';
import CityList from '@/components/CityList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CityList',
      component: CityList,
    },
    {
      path: '/weatherInfo/:id',
      name: 'WeatherInfo',
      component: () => {
        return import('@/components/WeatherInfo.vue');
      },
      props: true,
    },
  ],
});

export default router;
