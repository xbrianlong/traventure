<template>
  <RouterLink to="/explore">
    <div class="start-planning-btn">
      <v-btn @click="directToExplorePage" rounded="pill" variant="tonal"> Start Planning </v-btn>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
.start-planning-btn {
  text-align: center;
}
.v-btn {
  color: white;
  background-color: black;
}
</style>
