<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
  <h1>Top</h1>
  <nav class="bread">
    <h2>top</h2>
  </nav>
  <section>
    <router-link :to="{ name: 'MemberList' }">会員管理はこちら</router-link>
  </section>
</template>
