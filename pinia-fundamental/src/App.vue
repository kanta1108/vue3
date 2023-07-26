<script setup lang="ts"></script>
<template>
  <header>
    <h1>Pinia サンプル</h1>
  </header>
  <main>
    <router-view />
  </main>
  <footer></footer>
</template>
<style lang="scss" scoped>
$color: blue;
main {
  border: $color 1px solid;
  padding: 10px;
}
</style>
