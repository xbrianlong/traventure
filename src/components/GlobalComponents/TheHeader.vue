<template>
  <div class="header-wrapper">
    <div class="logo-wrapper">
      <RouterLink to="/dashboard">
        <img src="../../assets/images/logo-black.png" />
      </RouterLink>
    </div>
    <v-menu rounded>
      <template v-slot:activator="{ props }">
        <v-btn class="mx-5" icon v-bind="props">
          <v-avatar color="black" size="45"> </v-avatar>
        </v-btn>
      </template>
      <v-card min-width="175px">
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar class="my-2" color="black"></v-avatar>
            <h3>{{ username }}</h3>
            <p class="text-caption mt-1">{{ currentUser.email }}</p>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text" :to="{ name: 'profile' }">My Profile</v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text" @click="logOut">Log Out</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import router from '@/router'

const auth = getAuth()
const currentUser = ref(null)

async function logOut() {
  signOut(auth)
    .then(() => {
      router.push({ name: 'LandingPage' })
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user
      console.log(user)
    }
  })
})

const username = computed(() => {
  return currentUser.value.displayName ? currentUser.value.displayName : currentUser.value.username
})
</script>

<style scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  border-bottom-color: var(--light-grey-primary);
  border-bottom-style: solid;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 1000;
}
.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.logo-wrapper img {
  object-fit: cover;
  height: 200px;
  width: 200px;
}
</style>
