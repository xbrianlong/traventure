<template>
  <div class="container">
    <h1 class="text-h1 my-4 font-weight-bold text-white" id="type-place-title" v-if="addPlace">
      {{ placeNames[placeIndex] }}
    </h1>
    <h1 class="text-h1 my-4 font-weight-bold text-white" id="remove-place-title" v-if="deletePlace">
      {{ placeNames[placeIndex] }}
    </h1>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props for place number state
var props = defineProps(['placeNum'])

// Helper functions to toggle typing/deleting animations
const addPlace = ref(true)
const deletePlace = ref(false)

const placeNames = ['New Zealand', 'South Korea', 'San Francisco']
const placeIndex = ref(0)

// Change place name if state of placeNum prop changes
watch(
  () => props.placeNum,
  () => {
    // Set animation to deleting
    addPlace.value = false
    deletePlace.value = true

    // Change place name and set animation back to typing
    setTimeout(() => {
      placeIndex.value = props.placeNum
      addPlace.value = true
      deletePlace.value = false
    }, 1000)
  }
)
</script>

<style scoped>
.container {
  display: inline-block;
}

#type-place-title {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  border-right: 0.08em solid orange;
  animation: typing 1s steps(12, end) forwards, blink 0.8s infinite;
}

#remove-place-title {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  border-right: 0.08em solid orange;
  animation: deleting 1s steps(12, end) forwards, blink 0.8s infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  from {
    border-color: transparent;
  }
  to {
    border-color: orange;
  }
}

@keyframes deleting {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>