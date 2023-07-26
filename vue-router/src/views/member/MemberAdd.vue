<script setup lang="ts">
import { inject, reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import type { Member } from '@/interfaces/interfaces';

const router = useRouter();

const memberList = inject('memberList') as Map<number, Member>;
const member: Member = reactive({
  id: 0,
  name: '',
  email: '',
  point: 0,
  note: '',
});

const onAdd = () => {
  console.log(member);
  memberList.set(member.id, member);
  //   router.push({ name: 'MemberList' });
  router.push('/');
};
</script>
<template>
  <p>情報を入力してください</p>
  <form @submit.prevent="onAdd">
    <dl>
      <dt>
        <label for="addId">ID</label>
      </dt>
      <dd>
        <input type="number" id="addID" v-model.number="member.id" required />
      </dd>
      <dt>
        <label for="addName">名前</label>
      </dt>
      <dd>
        <input type="text" id="addName" v-model="member.name" required />
      </dd>
      <dt>
        <label for="addEmail">メールアドレス</label>
      </dt>
      <dd>
        <input type="email" id="addEmail" v-model="member.email" required />
      </dd>
      <dt>
        <label for="addPoint">保有ポイント</label>
      </dt>
      <dd>
        <input
          type="number"
          id="addPoint"
          v-model.number="member.point"
          required />
      </dd>
      <dt>
        <label for="addNote">備考</label>
      </dt>
      <dd>
        <input type="textarea" id="addNote" v-model="member.note" />
      </dd>
    </dl>
    <button type="submit">登録</button>
  </form>
</template>

<style scoped></style>
