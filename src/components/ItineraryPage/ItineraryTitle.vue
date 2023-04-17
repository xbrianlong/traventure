<template>
  <div class="header-title-wrapper">
    <!-- change this to taking in placeID to display city name -->
    <span class="header-title-text">Trip to {{ props.title }}</span>
    <!-- <input class="header-title-text" v-model="titleInput" placeholder="Add Itinerary Title"/> -->
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const titleInput = ref('')

const props = defineProps(['title'])

// write newTitleInput into firebase to update
watch(titleInput, (newTitleInput) => {
  console.log(newTitleInput)
})
</script>

<style scoped>
.header-title-wrapper {
  color: var(--white-background-primary);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 60px;
  position: relative;
  margin-left: 10px;
}

.header-title-text {
  font-size: 40px;
  font-weight: 600;
  height: 60px;
  width: 100%;
  position: absolute;
  color: white;
}

input:focus {
  outline: none;
  border: none;
}

::placeholder {
  color: white;
  opacity: 0.8;
}
</style>
