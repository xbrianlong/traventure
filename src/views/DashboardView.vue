<template>
    <div class="view dashboard-view">
        <DashboardFeatured />
        <DashboardTitle />
        <TripSection />
        <ContextMenu />
    </div>
    <v-btn @click="logOut">Log Out</v-btn>
</template>

<script setup>
import DashboardFeatured from '../components/DashboardPage/DashboardFeatured.vue';
import DashboardTitle from '../components/DashboardPage/DashboardTitle.vue';
import TripSection from '../components/DashboardPage/TripSection.vue';

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
.dashboard-view {
  padding: 30px 60px;
}

</style>