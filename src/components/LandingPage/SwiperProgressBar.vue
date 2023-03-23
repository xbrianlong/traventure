<template>
  <div class="swiper-progress-bar">
    <div class="progress-bar" ref="progressBar"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['progress'])

const progressBar = ref(null)

// Restart loading animation every 10s
watch(
  () => props.progress,
  () => {
    progressBar.value.style.animation = 'none'
    progressBar.value.style.animation = ''
  }
)
</script>

<style>
.swiper-progress-bar {
  position: absolute;
  width: 100vw;
  top: 0;
  height: 4px;
  background: #eeeeee;
  z-index: 3;
}

.progress-bar {
  height: inherit;
  width: 0;
  left: 0;
  top: 0;
  position: absolute;
  background: orange;
  z-index: 4;
  animation: slide-progress 15s infinite;
}

@keyframes slide-progress {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}
</style>