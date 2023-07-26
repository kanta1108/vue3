<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { inject, ref, computed } from 'vue';
import type { Member } from '@/interfaces/interfaces';
import { useMemberStore } from '@/stores/members';

const localId = ref(0);
</script>
<template>
  <section>
    <h2>会員リスト</h2>
  </section>
  <ul>
    <li>
      <router-link :to="{ name: 'MemberAdd' }">新規会員ついか</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'Test' }">テストコンポーネント</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'MemberIndex' }">メンバー一覧</router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
