<template>
  <TheHeader />
  <div>
    <div class="image-wrapper">
      <img src="../assets/images/startplanning-img.jpg" alt="startplanningimage" />
    </div>
    <div class="box-wrapper centered">
      <h2 class="box-title">Plan a new trip</h2>
      <div class="selections">
        <SearchStartPlanning v-model="inputRef" />
        <DateStartPlanning v-model="dateRef" @update-date="getDate" />
      </div>
      <button class="button" @click="createItinerary">Start Planning</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TheHeader from '../components/GlobalComponents/TheHeader.vue'
import SearchStartPlanning from '../components/StartPlanningPage/SearchStartPlanning.vue'
import DateStartPlanning from '../components/StartPlanningPage/DateStartPlanning.vue'

import { getAuth } from '@firebase/auth'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

const auth = getAuth()
const user = auth.currentUser.email

function getDate(data) {
  dateRef.value = data
}
const inputRef = ref('')
const dateRef = ref([])

async function createItinerary() {
  const docID = inputRef.value.toLowerCase()
  const startDay = dateRef.value[0]
  const endDay = dateRef.value[1]

  const itineraryData = {
    tripCity: inputRef.value,
    tripStartDate: `${startDay.getDate()}/${startDay.getMonth()}/${startDay.getFullYear()}`,
    tripEndDate: `${endDay.getDate()}/${endDay.getMonth()}/${endDay.getFullYear()}`
  }
  await setDoc(doc(db, user, 'userDetails', 'itineraries', docID), itineraryData)
}
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
</style>
