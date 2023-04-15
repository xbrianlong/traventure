<template>
  <div class="header-wrapper">
    <div class="logo-wrapper">
      <RouterLink to="/dashboard">
        <img src="../../assets/images/logo-black.png" />
      </RouterLink>
    </div>
    <RouterLink to="/profile">
      <v-avatar color="black" class="mr-8" size="45"></v-avatar>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  border-bottom-color: var(--light-grey-primary);
  border-bottom-style: solid;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 1000;
}
.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.logo-wrapper img {
  object-fit: cover;
  height: 200px;
  width: 200px;
}
</style>
