<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { inject, computed } from 'vue';
import type { Member } from '@/interfaces/interfaces';

interface Props {
  id: number;
}

const props = defineProps<Props>();

const memberList = inject('memberList') as Map<number, Member>;

const member = computed((): Member => {
  return memberList.get(props.id) as Member;
});
</script>
<template>
  <h1>会員管理</h1>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'AppTop' }">Topへ戻る</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'MemberList' }">会員一覧へ</router-link>
      </li>
    </ul>
  </nav>
  <section>
    <h2>会員詳細情報</h2>
    <dl>
      <dt>ID</dt>
      <dd>{{ member.id }}</dd>
      <dt>名前</dt>
      <dd>{{ member.name }}</dd>
      <dt>メール</dt>
      <dd>{{ member.email }}</dd>
      <dt>ポイント</dt>
      <dd>{{ member.point }}</dd>
      <dt>備考</dt>
      <dd>{{ member.note ?? '--' }}</dd>
    </dl>
  </section>
</template>

<style scoped></style>
