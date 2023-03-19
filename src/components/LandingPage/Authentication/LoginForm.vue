<template>
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
    <v-form>
      <v-container>
        <v-text-field label="Email"></v-text-field>
        <v-text-field label="Password"></v-text-field>
      </v-container>
      <v-btn variant="flat" size="x-large" type="submit" class="mt-2 login-btn">Login</v-btn>
    </v-form>
  </v-responsive>

  <br /><br />
</template>

<script setup>
import GoogleLogo from '../../CustomIcons/GoogleLogo.vue'
import FacebookLogo from '../../CustomIcons/FacebookLogo.vue'
</script>

<style scoped>
.social-login-btn {
  margin: 5px;
  color: var(--button-color-primary);
  border-color: var(--light-grey-primary);
}

.divider {
  color: var(--dark-grey-primary);
}

.login-btn {
  color: var(--button-color-primary);
}

#register {
  font-weight: 600;
}

#register:hover {
  cursor: pointer;
}
</style>