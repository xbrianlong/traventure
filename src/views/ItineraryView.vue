<template>
  <TheHeader />
  <NavigationBar />
  <div class="view">
    <GoogleMap v-show="toggle" placeId="ChIJdZOLiiMR2jERxPWrUs9peIg" />
    <div :class="toggle === true ? 'openMap' : 'closeMap'">
      <ItineraryHeader @toggleMap="toggleMap" :changeIcon="toggle" />
      <SearchBar v-model="input" @submit.prevent="fetchPlace" />
      <div>{{ input }}</div>
      <DestinationContainer />
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue'
import NavigationBar from '../components/GlobalComponents/NavigationBar.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import ItineraryHeader from '../components/ItineraryPage/ItineraryHeader.vue'
import GoogleMap from '../components/GlobalComponents/GoogleMap.vue'
import DestinationContainer from '../components/ItineraryPage/DestinationContainer.vue'
import SearchBar from '../components/GlobalComponents/SearchBar.vue'

import { getAuth } from '@firebase/auth'
import { db } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'

const auth = getAuth()
const user = auth.currentUser.email

const city = ref('')

// need to pass in dynamic city
const docSnap = await getDoc(doc(db, user, 'userDetails', 'itineraries', 'italy'))

city.value = docSnap.data().tripCity

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const input = ref('')
const toggle = ref(true)
function toggleMap() {
  toggle.value = !toggle.value
}

function fetchPlace() {
  fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json
  ?fields=
  &input=${decodeURI(input.value)}
  &inputtype=textquery
  &key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
}
</script>

<style scoped>
.openMap {
  width: var(--expanded-map-width);
}

.closeMap {
  width: 100%;
}
</style>
