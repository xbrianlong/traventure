<template>
  <div class="home">
    <h1>This is a Home page</h1>
    <v-btn id="login-btn" @click="showOverlay = !showOverlay"> Login </v-btn>
    <LoginModal
      :overlay="showOverlay"
      @close="showOverlay = !showOverlay"
      @click:outside="showOverlay = !showOverlay"
    />
  </div>
</template>

<script setup>
import LoginModal from '../components/LandingPage/LoginModal.vue'
import { ref } from 'vue'

const showOverlay = ref(true)
</script>

<style>
</style>