<template>
  <div class="landing-page">
    <v-btn id="login-btn" @click="showOverlay = !showOverlay"> Login </v-btn>
    <Modal
      :showModal="showOverlay"
      @close="showOverlay = !showOverlay"
      @click:outside="showOverlay = !showOverlay"
    />
  </div>
</template>

<script setup>
import Modal from '../components/LandingPage/Modal.vue'
import { ref } from 'vue'

const showOverlay = ref(false)
</script>

<style>
</style>