<template>
  <TheHeader />
  <NavigationBar />
  <div class="view">
    <GoogleMap v-show="toggle" placeId="ChIJdZOLiiMR2jERxPWrUs9peIg" />
    <div :class="toggle === true ? 'openMap' : 'closeMap'">
      <ItineraryHeader @toggleMap="toggleMap" :changeIcon="toggle" />
      <div class="input-container">
        <v-icon icon="mdi-magnify" id="icon" size="large" />
        <input type="text" id="search-input" placeholder="Search" />
      </div>
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
import { ref, watch, computed } from 'vue'
import ItineraryHeader from '../components/ItineraryPage/ItineraryHeader.vue'
import GoogleMap from '../components/GlobalComponents/GoogleMap.vue'
import DestinationContainer from '../components/ItineraryPage/DestinationContainer.vue'
import { useStore } from 'vuex'

import { getAuth } from '@firebase/auth'
import { db } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'

const auth = getAuth()
const user = auth.currentUser.email

const city = ref('')

// need to pass in dynamic city
const docSnap = await getDoc(doc(db, user, 'userDetails', 'itineraries', 'italy'))

city.value = docSnap.data().tripCity

const store = useStore()

//const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const input = ref('')
const toggle = ref(true)
function toggleMap() {
  toggle.value = !toggle.value
}

const mapRef = computed(() => store.getters.getMapRef)
const acObj = ref(null)

watch(
  () => mapRef.value,
  (newVal) => {
    if (newVal) {
      var input = document.getElementById('search-input')
      acObj.value = new mapRef.value.api.places.Autocomplete(input, {
        bounds: mapRef.value.map.getBounds(),
        strictBounds: true,
        fields: ['place_id']
      })

      acObj.value.addListener('place_changed', getPlaceResult)
    }
  }
)

function getPlaceResult() {
  var place = acObj.value.getPlace()
  console.log(place.place_id)
}
</script>

<style scoped>
.openMap {
  width: var(--expanded-map-width);
}

.closeMap {
  width: 100%;
}

.input-container {
  position: relative;
  background-color: var(--light-grey-primary);
  padding: 0px 10px 0px 25px;
  border-radius: 10px;
  line-height: 52px;
}

.input-container #icon {
  position: absolute;
  color: var(--dark-grey-primary);
  align-items: center;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  padding-left: 35px;
}

.input-container #search-input {
  line-height: normal;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: var(--dark-grey-primary);
  width: 100%;
  padding-left: 40px;
}

.input-container input:focus {
  outline: none;
}
</style>
