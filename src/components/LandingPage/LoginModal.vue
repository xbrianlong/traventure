<template>
  <!-- Overlay wrapper-->
  <v-overlay scroll-strategy="block" class="align-center justify-center" activator="#login-btn">
    <!-- Login Modal Card-->
    <v-card class="login-modal rounded-xl">
      <!-- Close button -->
      <v-toolbar color="white">
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- Title -->
      <v-card-title class="text-h4">Log in to Traventure </v-card-title>

      <br /><br />

      <!-- Social Login -->
      <v-responsive class="mx-auto" max-width="90%">
        <v-btn
          class="social-login-btn"
          height="65px"
          variant="outlined"
          size="x-large"
          width="90%"
          rounded="pill"
          icon
        >
          <v-icon class="mr-md-8"><GoogleLogo /></v-icon>Log in with Google
        </v-btn>
        <v-btn
          class="social-login-btn"
          height="65px"
          variant="outlined"
          size="x-large"
          width="90%"
          rounded="pill"
        >
          <v-icon class="mr-md-8" size="x-large"><FacebookLogo /></v-icon>Log in with Facebook
        </v-btn>
      </v-responsive>

      <!-- Divider -->
      <v-container class="divider">
        <v-row align="center">
          <v-col class="pl-md-10"><v-divider></v-divider></v-col>
          <v-col cols="2"><v-card-text class="text-body-1">OR</v-card-text></v-col>
          <v-col class="pr-md-10"><v-divider></v-divider></v-col>
        </v-row>
      </v-container>

      <!-- Login Form -->
      <v-responsive class="mx-auto" max-width="90%">
        <v-form v-model="valid">
          <v-container>
            <v-text-field label="Email"></v-text-field>
            <v-text-field label="Password"></v-text-field>
          </v-container>
          <v-btn variant="flat" size="x-large" type="submit" class="mt-2 login-btn">Login</v-btn>
        </v-form>
      </v-responsive>

      <br /><br />

      <!-- Register Modal navigation-->

      <v-card-subtitle class="text-subtitle-1">
        Don't have an account?
        <div class="text-subtitle-1" id="register">Sign up</div>
      </v-card-subtitle>

      <br /><br />
    </v-card>
  </v-overlay>
</template>

<script setup>
import { ref } from 'vue'
import GoogleLogo from '../CustomIcons/GoogleLogo.vue'
import FacebookLogo from '../CustomIcons/FacebookLogo.vue'

const valid = ref(false)
</script>

<style>
.login-modal {
  text-align: center;
  width: 480px;
}

.login-modal .social-login-btn {
  margin: 5px;
  color: var(--button-color-primary);
  border-color: var(--light-grey-primary);
}

.login-modal .divider {
  color: var(--dark-grey-primary);
}

.login-modal .login-btn {
  color: var(--button-color-primary);
}

.login-modal #register {
  font-weight: 600;
}

.login-modal #register:hover {
  cursor: pointer;
}
</style>