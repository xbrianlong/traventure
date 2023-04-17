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
          <v-avatar size="45" color="surface-variant">
            <span class="text-h5">{{
              socialUserInitials ? socialUserInitials : regUserInitials
            }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card min-width="175px">
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar class="my-2" color="surface-variant">
              <span class="text-h5">{{
                socialUserInitials ? socialUserInitials : regUserInitials
              }}</span>
            </v-avatar>
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
import { ref, onMounted, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import router from '@/router'
import { db } from '../../firebase'

const auth = getAuth()
const currentUser = ref(null)
const socialUserInitials = computed(() => {
  if (currentUser.value) {
    //if logged in
    if (currentUser.value.displayName) {
      //for auth login users
      var dn = currentUser.value.displayName
      return dn
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
    }
  }
  return ''
})

const regUserInitials = ref('')

// const docSnap = await getDoc(doc(db, currentUser.value.email, 'userDetails'))
// if (docSnap.exists()) {
//   var regUsername = docSnap.data().username
//   regUserInitials.value = regUsername
//     .split(' ')
//     .map((word) => word.charAt(0).toUpperCase())
//     .join('')
//   console.log(regUserInitials.value)
// }

async function logOut() {
  signOut(auth)
    .then(() => {
      router.go({ name: 'LandingPage' })
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser.value = user

      const docSnap = await getDoc(doc(db, user.email, 'userDetails'))
      if (docSnap.exists()) {
        var regUsername = docSnap.data().username
        regUserInitials.value = regUsername
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase())
          .join('')
      }
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
  height: auto;
  width: 200px;
}
</style>
