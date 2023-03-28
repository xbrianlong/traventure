<template>
  <!-- Title -->
  <v-card-title class="text-h4">Sign up for Traventure </v-card-title>

  <br /><br />

  <!-- Register Form -->
  <v-responsive class="mx-auto" max-width="90%">
    <form @submit.prevent="onSubmit">
      <v-container>
        <v-text-field
          class="my-md-2"
          label="Username"
          v-model="username.value.value"
          :error-messages="username.errorMessage.value"
        ></v-text-field>
        <v-text-field
          class="my-md-2"
          label="Email"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
        ></v-text-field>
        <v-text-field
          class="my-md-2"
          label="Password"
          v-model="password.value.value"
          type="password"
          :error-messages="password.errorMessage.value"
        ></v-text-field>
        <v-text-field
          class="my-md-2"
          label="Confirm password"
          v-model="confirmPassword.value.value"
          type="password"
          :error-messages="confirmPassword.errorMessage.value"
        ></v-text-field>
      </v-container>
      <v-btn variant="flat" size="x-large" type="submit" class="mt-2 register-btn">Sign Up</v-btn>
    </form>
  </v-responsive>

  <br /><br />
</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import { auth } from '../../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import router from '@/router'

const { handleSubmit } = useForm({
  validationSchema: {
    username(value) {
      if (value?.length >= 2) return true

      return 'Name needs to be at least two characters'
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    },
    password(value) {
      let passwordRef = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
      if (passwordRef.test(value)) return true

      return 'Password needs to have 7-15 characters and contain at least one numeric digit and a special character'
    },
    confirmPassword(value) {
      if (password.value.value == value && value?.length > 0) return true

      return 'Passwords do not match'
    }
  }
})

const username = useField('username')
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('confirmPassword')

const onSubmit = handleSubmit((values) => {
  //alert(values.email)
  createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(() => {
      // Signed in
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
.register-btn {
  color: var(--button-color-primary);
}
</style>