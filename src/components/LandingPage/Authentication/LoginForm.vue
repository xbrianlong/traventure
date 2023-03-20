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
    <v-form @submit.prevent="onSubmit">
      <v-container>
        <v-text-field
          class="my-md-2"
          label="Email"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
        ></v-text-field>
      </v-container>
      <v-btn variant="flat" size="x-large" type="submit" class="mt-2 login-btn">Login</v-btn>
    </v-form>
  </v-responsive>

  <br /><br />
</template>

<script setup>
import GoogleLogo from '../../CustomIcons/GoogleLogo.vue'
import FacebookLogo from '../../CustomIcons/FacebookLogo.vue'
import { useField, useForm } from 'vee-validate'
import { auth } from '../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import router from '../../../router'

const { handleSubmit } = useForm({
  validationSchema: {
    email(value) {
      if (value?.length > 0) return true

      return 'Required'
    },
    password(value) {
      if (value?.length > 0) return true

      return 'Required'
    }
  }
})

const email = useField('email')
const password = useField('password')

const onSubmit = handleSubmit((values) => {
  signInWithEmailAndPassword(auth, values.email, values.password)
    .then(() => {
      //Signed in
      router.push('/dashboard')
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(errorCode, errorMessage)
    })
})
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