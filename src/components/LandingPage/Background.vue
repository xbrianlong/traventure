<template>
  <v-carousel
    class="background-carousel"
    hide-delimiters
    height="100vh"
    :show-arrows="false"
    :model-value="props.img"
  >
    <v-carousel-item @mousemove="mouseMove" :value="0">
      <div class="background-img first-img"></div>
    </v-carousel-item>
    <v-carousel-item @mousemove="mouseMove" :value="1">
      <div class="background-img second-img"></div>
    </v-carousel-item>
    <v-carousel-item @mousemove="mouseMove" :value="2">
      <div class="background-img third-img"></div>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
// Prop to define which image slide is shown
const props = defineProps(['img'])

// Background image move on mouse move
function mouseMove(e) {
  e.target.style.backgroundPositionX = -e.offsetX / 180 + 'px'
  e.target.style.backgroundPositionY = -e.offsetY / 180 + 'px'
}
</script>

<style scoped>
.background-carousel {
  height: 100vh;
}

.background-img {
  width: 100vw;
  height: 100vh;
  box-shadow: inset 200px 20px 150px 100px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: fixed;
}

.first-img {
  background: url(./Backgrounds/contBcg-1.jpg) no-repeat center;
  background-size: cover;
}

.second-img {
  background: url(./Backgrounds/contBcg-2.jpg) no-repeat center;
  background-size: cover;
}

.third-img {
  background: url(./Backgrounds/contBcg-3.jpg) no-repeat center;
  background-size: cover;
}

@keyframes slide {
  0% {
    opacity: 0;
    background: url(./Backgrounds/contBcg-1.jpg) no-repeat center;
  }

  28% {
    opacity: 1;
    background: url(./Backgrounds/contBcg-1.jpg) no-repeat center;
  }
  33% {
    opacity: 0;
    background: url(./Backgrounds/contBcg-1.jpg) no-repeat center;
  }
  33.1% {
    opacity: 0;
    background: url(./Backgrounds/contBcg-2.jpg) no-repeat center;
  }

  61% {
    opacity: 1;
    background: url(./Backgrounds/contBcg-2.jpg) no-repeat center;
  }

  66% {
    opacity: 0;
    background: url(./Backgrounds/contBcg-2.jpg) no-repeat center;
  }

  66.1% {
    opacity: 0;
    background: url(./Backgrounds/contBcg-3.jpg) no-repeat center;
  }

  94% {
    opacity: 1;
    background: url(./Backgrounds/contBcg-3.jpg) no-repeat center;
  }

  100% {
    opacity: 0;
    background: url(./Backgrounds/contBcg-3.jpg) no-repeat center;
  }
}
</style>