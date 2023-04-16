<template>
  <div class="section-wrapper">
    <h2 class="trip">Trips</h2>
    <div class="card-group">
      <template v-for="(trip, index) in trips" :key="index">
        <TripCard
          class="trip-card"
          :title="`Trip to ${trip.tripCity}`"
          :startDate="trip.tripStartDate"
          :endDate="trip.tripEndDate"
          :numPlaces="trip.numPlaces"
          :imageAlt="trip.imageAlt"
          :imageSource="trip.imageSource"
          @removeItem="removeItem(index)"
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

const auth = getAuth()
const user = auth.currentUser.email

const trips = ref([])

const querySnapshot = await getDocs(collection(db, user, 'userDetails', 'itineraries'))

querySnapshot.forEach((doc) => {
  trips.value.push(doc.data())
})

const createConfirm = useConfirm()
const createSnackbar = useSnackbar()

async function removeItem(index) {
  try {
    await createConfirm({
      title: 'Confirm Deletion',
      content: `Are you sure you want to delete Trip to ${trips.value[index].tripCity} ?`,
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
}

.trip-card {
  place-self: center;
}
</style>
