<template>
  <TheHeader />
  <div>
    <GoogleMap
      :api-key="apiKey"
      style="position: fixed; width: 29vw; height: 100vh; display: none"
      ref="mapRef"
    ></GoogleMap>
    <div class="image-wrapper">
      <img src="../assets/images/startplanning-img.jpg" alt="startplanningimage" />
    </div>
    <div class="box-wrapper centered">
      <h2 class="box-title">Plan a new trip</h2>
      <div class="selections">
        <div class="input-container">
          <span class="whereto">Where to?</span>
          <input type="text" id="country-input" placeholder="e.g. Paris, China, Italy" />
        </div>
        <DateStartPlanning v-model="dateRef" @update-date="getDate" />
      </div>
      <button class="button" @click="createItinerary">Start Planning</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import TheHeader from '../components/GlobalComponents/TheHeader.vue'
import DateStartPlanning from '../components/StartPlanningPage/DateStartPlanning.vue'
import { GoogleMap } from 'vue3-google-map'

import { getAuth } from '@firebase/auth'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

import router from '@/router'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const auth = getAuth()
const user = auth.currentUser.email

// function test() {
//   console.log(mapRef.value)
// }

function getDate(data) {
  dateRef.value = data
}
const placeId = ref('')
const placeName = ref('')
const dateRef = ref([])

const mapRef = ref(null)
const acObj = ref(null)

async function createItinerary() {
  const startDay = dateRef.value[0]
  const endDay = dateRef.value[1]

  const itineraryData = {
    tripCity: placeName.value,
    tripStartDate: `${startDay.getDate()}/${startDay.getMonth()}/${startDay.getFullYear()}`,
    tripEndDate: `${endDay.getDate()}/${endDay.getMonth()}/${endDay.getFullYear()}`
  }
  await setDoc(doc(db, user, 'userDetails', 'itineraries', placeId.value), itineraryData)
  router.push({ path: `itinerary/${placeId.value}` })
}

watch(
  () => mapRef.value?.ready,
  async (ready) => {
    if (ready) {
      var input = document.getElementById('country-input')
      acObj.value = await new mapRef.value.api.places.Autocomplete(input, {
        types: ['country', 'locality'],
        fields: ['place_id', 'name']
      })
      acObj.value.addListener('place_changed', () => {
        var place = acObj.value.getPlace()
        placeId.value = place.place_id
        placeName.value = place.name
      })
    }
  }
)
</script>

<style scoped>
.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  z-index: -1;
}

.image-wrapper img {
  height: 100vh;
  width: 100%;
  object-fit: cover;
}

.box-wrapper {
  width: 800px;
  height: 500px;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.box-title {
  font-size: 40px;
  margin-top: 50px;
}

.selections {
  margin-top: 30px;
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.button {
  background-color: black;
  outline: none;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 30px;
  margin-top: 50px;
  padding: 15px 25px;
}

.input-container {
  position: relative;
  border: solid 2px var(--light-grey-primary);
  padding: 0px 10px 0px 25px;
  border-radius: 20px;
  line-height: 52px;
  width: 80%;
}

.input-container #country-input {
  font-weight: 300;
  font-size: 18px;
  color: black;
  width: 80%;
  display: inline-flex;
  margin-left: 15px;
}

.input-container input:focus {
  outline: none;
}

.input-container ::placeholder {
  color: #999696;
}

.whereto {
  font-size: 20px;
  font-weight: bold;
}
</style>
