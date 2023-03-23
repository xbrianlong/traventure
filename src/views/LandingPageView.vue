<template>
  <div class="landing-page">
    <img id="logo" src="../assets/logo-white.png" />
    <SwiperProgressBar :progress="img" />
    <Background :img="img" />
    <div class="title">
      <v-container>
        <Typewriter :placeNum="img" />
        <h4 class="text-h4 mb-6 font-weight-light text-white">Plan your trip today.</h4>
        <v-btn
          class="rounded-lg ml-md-2"
          id="login-btn"
          variant="outlined"
          color="white"
          size="x-large"
          @click="showOverlay = !showOverlay"
        >
          Login
        </v-btn>
      </v-container>
    </div>
    <Modal
      :showModal="showOverlay"
      @close="showOverlay = !showOverlay"
      @click:outside="showOverlay = !showOverlay"
    />
  </div>
</template>

<script setup>
import Modal from '../components/LandingPage/Modal.vue'
import Background from '../components/LandingPage/Background.vue'
import Typewriter from '../components/LandingPage/Typewriter.vue'
import SwiperProgressBar from '../components/LandingPage/SwiperProgressBar.vue'

import { ref } from 'vue'

const showOverlay = ref(false)

// Every 10s, change typing animation and switch background

const img = ref(0) // img number state shown

setInterval(function () {
  img.value = (img.value + 1) % 3
}, 5000)
</script>

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
  } else {
    // User is signed out
  }
})
<style scoped>
#logo {
  position: absolute;
  z-index: 99;
  top: -5%;
  left: -5%;
  min-height: 200px;
  height: 25%;
  margin: 0;
  padding: 0;
}

.title {
  position: absolute;
  top: 36%;
  left: 10%;
}

#login-btn:hover {
  transform: scale(1.25);
}
</style>