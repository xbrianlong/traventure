<script setup>
import TheHeader from './components/GlobalComponents/TheHeader.vue';
import NavigationBar from './components/GlobalComponents/NavigationBar.vue';
</script>

<template>
  <header>
    <TheHeader />
    <NavigationBar />
  </header>

  <RouterView />
</template>

<style scoped>
</style>
