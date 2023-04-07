<template>
  <div class="avatar">
    <v-avatar :size="size" @click="handleClick">
      <img :src="image" alt="User Avatar" />
    </v-avatar>
    <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const size = ref(300)
const image = ref('https://via.placeholder.com/300')

const handleClick = () => {
  fileInput.value.click()
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    image.value = reader.result
  }
}

const fileInput = ref(null)
</script>

<style scoped></style>
