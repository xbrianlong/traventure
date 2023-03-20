<template>
  <!-- Overlay wrapper-->
  <v-overlay
    scroll-strategy="block"
    class="align-center justify-center"
    :model-value="showModal"
    @click:outside="loginDefault"
  >
    <!-- Login Modal Card-->
    <v-card class="modal rounded-xl">
      <!-- Close button -->
      <v-toolbar color="white">
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close'), loginDefault()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- Login Form -->
      <LoginForm v-if="showLogin" />

      <!-- Register Form -->
      <RegisterForm v-else />

      <!-- Login/Register Modal navigation-->
      <v-card-subtitle v-if="showLogin" class="text-subtitle-1">
        Don't have an account?
        <div class="text-subtitle-1" id="toggle-nav" @click="showLogin = !showLogin">Sign up</div>
      </v-card-subtitle>

      <v-card-subtitle v-else class="text-subtitle-1">
        Already have an account?
        <div class="text-subtitle-1" id="toggle-nav" @click="showLogin = !showLogin">Log in</div>
      </v-card-subtitle>

      <br /><br />
    </v-card>
  </v-overlay>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from './Authentication/LoginForm.vue'
import RegisterForm from './Authentication/RegisterForm.vue'

//Define props
defineProps(['showModal'])

//Toggle show login
const showLogin = ref(true)

//Make sure login form is shown after form is closed
function loginDefault() {
  setTimeout(() => (showLogin.value = true), 500)
}
</script>

<style scoped>
.modal {
  text-align: center;
  width: 480px;
}

.modal #toggle-nav {
  font-weight: 600;
}

.modal #toggle-nav:hover {
  cursor: pointer;
}
</style>