<template>
  <TheHeader />
  <NavigationBar :placeId="itineraryId" />
  <div class="view">
    <GoogleMap v-show="toggle" :placeId="countryId" />
    <div :class="toggle === true ? 'openMap' : 'closeMap'">
      <ItineraryHeader
        @toggleMap="toggleMap"
        :changeIcon="toggle"
        :title="countryName"
        :cover="coverImage"
      />
      <div class="input-container">
        <v-icon icon="mdi-magnify" id="icon" size="large" />
        <input type="text" id="search-input" placeholder="Search and add trip to day" />
      </div>
      <div>{{ input }}</div>
      <DestinationContainer
        :renderComponent="renderTrips"
        :itineraryId="itineraryId"
        @update="onUpdateEvent($event)"
      />
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue'
import NavigationBar from '../components/GlobalComponents/NavigationBar.vue'
import { RouterView } from 'vue-router'
import { ref, watch, computed, nextTick } from 'vue'
import ItineraryHeader from '../components/ItineraryPage/ItineraryHeader.vue'
import GoogleMap from '../components/GlobalComponents/GoogleMap.vue'
import DestinationContainer from '../components/ItineraryPage/DestinationContainer.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { getDoc, doc, addDoc, collection, updateDoc } from 'firebase/firestore'
import { getAuth } from '@firebase/auth'
import { db } from '../firebase'

const auth = getAuth()
const user = auth.currentUser.email

const store = useStore()
const route = useRoute()

const itineraryId = computed(() => route.params.id)
const countryId = ref('')
const countryName = ref('')
const coverImage = ref('')

const docSnap = await getDoc(doc(db, user, 'userDetails', 'itineraries', itineraryId.value))

if (docSnap.exists()) {
  countryId.value = docSnap.data().tripCityId
  countryName.value = docSnap.data().tripCityName
  coverImage.value = docSnap.data().imageSource
}

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

// Add doc upon search complete
const date = ref(new Date())

function onUpdateEvent(newDate) {
  date.value = newDate
}

// Force-render upon updates
const renderTrips = ref(true)

const forceRender = async () => {
  renderTrips.value = false
  await nextTick()
  renderTrips.value = true
}

async function getPlaceResult() {
  var place = acObj.value.getPlace()
  const docSnap = await getDoc(doc(db, user, 'userDetails', 'itineraries', itineraryId.value))
  if (docSnap.exists()) {
    var currentNumPlaces = docSnap.data().numPlaces

    var placeObject = { placeId: place.place_id, order: currentNumPlaces + 1, dummy: false }

    await addDoc(
      collection(db, user, 'userDetails', 'itineraries', `${itineraryId.value}`, `${date.value}`),
      placeObject
    )
    await updateDoc(doc(db, user, 'userDetails', 'itineraries', itineraryId.value), {
      numPlaces: currentNumPlaces + 1
    })

    await forceRender()
  }
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
