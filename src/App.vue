<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from './components/GlobalComponents/NavigationBar.vue';
</script>

<template>
  <header>
    <NavigationBar />
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
