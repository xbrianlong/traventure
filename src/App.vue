<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/GlobalComponents/TheHeader.vue';
</script>

<template>
  <header>
    <TheHeader />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink> | 
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
