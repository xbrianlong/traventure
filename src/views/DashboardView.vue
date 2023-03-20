<template>
  <h1>This is the Dashboard page</h1>
  <v-btn @click="logOut">Log Out</v-btn>
</template>

<script setup>
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import router from '@/router'

async function logOut() {
  try {
    const user = auth.currentUser
    const loggedOut = await signOut(auth, user)
    console.log(loggedOut)
    router.push({ name: 'LandingPage' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style>
</style>