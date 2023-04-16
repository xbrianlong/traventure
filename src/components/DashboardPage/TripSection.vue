<template>
  <div class="section-wrapper">
    <div class="trips">
      <div><h2 class="trip">Trips</h2></div>
      <v-divider />
      <div><button class="button" @click="routeToStartPlanning">Add Trip</button></div>
    </div>
    <div class="card-group">
      <template v-for="(trip, index) in trips" :key="index">
        <TripCard
          class="trip-card"
          :title="`Trip to ${trip.tripCityName}`"
          :startDate="formatDates(trip.tripStartDate)"
          :endDate="formatDates(trip.tripEndDate)"
          :numPlaces="trip.numPlaces"
          :imageAlt="trip.tripCityName"
          :imageSource="trip.imageSource"
          @removeItem="removeItem(index)"
          @click="routeToItinerary(trip.id)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import TripCard from './TripCard.vue'
import { useConfirm, useSnackbar } from 'vuetify-use-dialog'
import { ref } from 'vue'
import { getAuth } from '@firebase/auth'
import { db } from '../../firebase'
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore'
import router from '@/router'

const auth = getAuth()
const user = auth.currentUser.email

const trips = ref([])

const querySnapshot = await getDocs(collection(db, user, 'userDetails', 'itineraries'))

querySnapshot.forEach((doc) => {
  trips.value.push({ id: doc.id, ...doc.data() })
})

const createConfirm = useConfirm()
const createSnackbar = useSnackbar()

//Format dates into string
function formatDates(datetimeObj) {
  var date = datetimeObj.toDate()
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

async function removeItem(index) {
  try {
    await createConfirm({
      title: 'Confirm Deletion',
      content: `Are you sure you want to delete Trip to ${trips.value[index].tripCityName}?`,
      confirmationText: 'Delete',
      cardProps: {
        width: 500
      },
      confirmationButtonProps: {
        color: 'red'
      },
      dialogProps: {
        width: 500
      }
    })

    createSnackbar({
      text: `Trip to ${trips.value[index].tripCity} is deleted`,
      snackbarProps: {
        timeout: 1000
      }
    })
    await deleteDoc(
      doc(db, user, 'userDetails', 'itineraries', trips.value[index].tripCity.toLowerCase())
    )
    trips.value.splice(index, 1)
  } catch {
    // Actions after clicking Cancel
    ;(err) => console.log(err)
  }
}

async function routeToStartPlanning() {
  await router.push({ path: '/startplanning' })
}

async function routeToItinerary(itineraryId) {
  await router.push({ path: `/itinerary/${itineraryId}` })
}
</script>

<style scoped>
.section-wrapper {
  margin-top: 20px;
}

.card-group {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 50px;
  margin-top: 20px;
}

.trip {
  font-size: 30px;
  margin-right: 50px;
}

.trip-card {
  place-self: center;
}

.button {
  background-color: black;
  outline: none;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 30px;
  padding: 15px 25px;
  width: 160px;
  margin-left: 50px;
}

.trips {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
