<template>
  <h1>This is the Dashboard page</h1>
  <v-btn @click="logOut">Log Out</v-btn>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth'
import router from '@/router'

const auth = getAuth()

async function logOut() {
  signOut(auth)
    .then(() => {
      router.push({ name: 'LandingPage' })
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<style>
</style>