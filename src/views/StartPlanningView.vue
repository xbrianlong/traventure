<template>
  <TheHeader />
  <div>
    <div class="image-wrapper">
      <img src="../assets/images/startplanning-img.jpg" />
    </div>
  </div>
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue'
</script>

<style scoped>
.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.image-wrapper img {
  height: 100vh;
  width: 100%;
  object-fit: cover;
}
</style>
