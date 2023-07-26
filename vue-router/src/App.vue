<script setup lang="ts">
import { reactive, provide } from 'vue';
import { RouterView } from 'vue-router';
import type { Member } from '@/interfaces/interfaces';
import useRouter from '@/views/useRouter.vue';

const memberList = new Map<number, Member>();
memberList.set(334, {
  id: 334,
  name: '鈴木',
  email: '334@334.com',
  point: 334,
  note: '初回入会特典あり',
});
memberList.set(114514, {
  id: 114514,
  name: '佐藤',
  email: '114514@114514.com',
  point: 114514,
});
provide('memberList', memberList);
</script>
<template>
  <header>
    <h1>Vue Router サンプル</h1>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <!-- <use-router></use-router> -->
  </footer>
</template>
<style lang="scss" scoped>
$color: blue;
main {
  border: $color 1px solid;
  padding: 10px;
}
</style>
