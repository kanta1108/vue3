<script setup lang="ts">
import { inject, computed } from 'vue';
import type { Member } from '@/interfaces/interfaces';
import { useMemberStore } from '@/stores/members';
import { useRouter } from 'vue-router';
const router = useRouter();
const memberStore = useMemberStore();
memberStore.prepareMemberList();
const memberList = computed(() => memberStore.memberList);
const isEmpty = computed((): boolean => memberStore.isMemberListEmpty);
const isLoading = computed((): boolean => {
  return memberStore.isLoading;
});
const deleteConfirm = (id: number) => {
  if (confirm('削除しますか')) {
    const promise = memberStore.deleteMember(id);
    promise.then((result: boolean) => {
      memberStore.prepareMemberList();
      router.push({ name: 'MemberIndex' });
    });
    promise.catch((error: Error) => {
      console.log(error);
    });
  }
};
</script>
<template>
  <div v-if="!isEmpty">
    <div v-if="isLoading">読み込み中</div>
    <div v-else>
      <h3>メンバー一覧</h3>
      <ul v-for="[key, val] in memberList" :key="key">
        <li>ID:{{ val.id }}</li>
        <li>名前:{{ val.name }}</li>
        <li>メールアドレス:{{ val.email }}</li>
        <li>ポイント{{ val.point }}</li>
        <li>備考{{ val.note ?? '--' }}</li>
        <button @click="deleteConfirm(val.id)">削除する</button>
      </ul>
    </div>
  </div>
  <div v-else>メンバーがいません</div>
</template>

<style scoped></style>
