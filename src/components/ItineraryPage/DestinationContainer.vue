<template>
  <div class="container-wrapper">
    <h1 class="headerTitle">Itinerary</h1>
    {{ dates.length }}
    <div v-for="(date, index) in dates" :key="index">
      <h2 class="dateTitle">{{ date }}</h2>
    </div>
    <!-- Need to iterate through the dates and iterate within each date -->
    <div v-for="(destItem, index) in destItems" :key="index" class="destItems">
      <DestinationItem
        :title="destItem.placeName"
        :description="destItem.placeDescription"
        :imageSource="destItem.imageSource"
        :imageAlt="destItem.imageAlt"
        @removeItem="removeItem(index)"
      />
    </div>
  </div>
</template>

<script setup>
import DestinationItem from './DestinationItem.vue'
import { onBeforeMount, ref } from 'vue'

import { getAuth } from '@firebase/auth'
import { db } from '../../firebase'
import { getDoc, doc, setDoc, getDocs, collection } from 'firebase/firestore'

const auth = getAuth()
const user = auth.currentUser.email

const destItems = ref([])
const dates = ref([])
const startDate = ref(null)
const endDate = ref(null)

const docSnap = await getDoc(doc(db, user, 'userDetails', 'itineraries', 'china'))
startDate.value = new Date(docSnap.data().tripStartDateFull.seconds * 1000)
endDate.value = new Date(docSnap.data().tripEndDateFull.seconds * 1000)

async function getDatesBetween(startDate, endDate) {
  let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
  const firstPlaceData = {
    placeName: 'First Place',
    placeDescription: 'This is first place description'
  }

  while (currentDate <= endDate) {
    var options = { weekday: 'long', day: 'numeric', month: 'long' }
    var formattedDate = currentDate.toLocaleDateString('en-US', options)

    // need to pass in dynamic city
    await setDoc(
      doc(db, `/${user}/userDetails/itineraries/china/${formattedDate}`, 'firstPlace'),
      firstPlaceData
    )

    dates.value.push(formattedDate)

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    )
  }
}

onBeforeMount(() => {
  getDatesBetween(startDate.value, endDate.value)
})

console.log(dates.value.length)

const querySnapshot = await getDocs(
  // change variable to 'Friday, April 14' to render
  collection(db, user, 'userDetails', 'itineraries', 'china', `${dates.value[0]}`)
)

querySnapshot.forEach((doc) => {
  destItems.value.push(doc.data())
})

function removeItem(index) {
  destItems.value.splice(index, 1)
}
</script>

<style scoped>
.headerTitle {
  font-size: 45px;
  margin-left: 0.4em;
}
.dateTitle {
  font-size: 24px;
  font-weight: bold;
  margin-left: 0.8em;
}
</style>
