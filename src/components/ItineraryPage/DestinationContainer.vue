<template>
  <div class="container-wrapper">
    <v-row class="headerRow" align="center" justify="center">
      <v-col cols="6">
        <h1 class="headerTitle">Itinerary</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-select
          :model-value="selectedDate"
          @update:modelValue="updateSelectedDate($event)"
          :items="dates"
          item-title="dateString"
          item-value="dateObject"
          single-line
          hide-details="auto"
          max-width="100px"
        ></v-select>
      </v-col>
    </v-row>
    <!-- Need to iterate through the dates and iterate within each date -->
    <div v-if="renderComponent">
      <div v-for="(destItem, index) in orderedDestItems" :key="index" class="destItems">
        <DestinationItem
          :docId="destItem.id"
          :order="destItem.order"
          :placeId="destItem.placeId"
          @removeItem="removeItem($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import DestinationItem from './DestinationItem.vue'
import { ref, watch, computed, nextTick } from 'vue'

import { getAuth } from '@firebase/auth'
import { db } from '../../firebase'
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'

const props = defineProps(['itineraryId', 'renderComponent'])
const emit = defineEmits(['update'])

const auth = getAuth()
const user = auth.currentUser.email

const destItems = ref([])
const orderedDestItems = computed(() =>
  [...destItems.value].sort((a, b) => (a.order > b.order ? 1 : -1))
)

const dates = ref([])
const startDate = ref(null)
const endDate = ref(null)

// Update selected date in parent upon updateEvent
const selectedDate = ref(new Date())

function updateSelectedDate(newValue) {
  selectedDate.value = newValue
  emit('update', selectedDate.value)
}

// Fetch itinerary information from Firebase
async function fetchItineraryInfo() {
  destItems.value = []

  const docSnap = await getDoc(doc(db, user, `userDetails/itineraries/${props.itineraryId}`))
  startDate.value = docSnap.data().tripStartDate.toDate()
  endDate.value = docSnap.data().tripEndDate.toDate()

  async function getDatesBetween(startDate, endDate) {
    let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    // const firstPlaceData = {
    //   placeName: 'First Place',
    //   placeDescription: 'This is first place description'
    // }

    while (currentDate <= endDate) {
      var options = { weekday: 'long', day: 'numeric', month: 'long' }
      var formattedDate = currentDate.toLocaleDateString('en-US', options)

      // need to pass in dynamic city
      // await setDoc(
      //   doc(db, `/${user}/userDetails/itineraries/china/${formattedDate}`, 'firstPlace'),
      //   firstPlaceData
      // )

      dates.value.push({ dateString: formattedDate, dateObject: currentDate })

      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      )
    }

    selectedDate.value = dates.value[0].dateObject
    emit('update', selectedDate.value)
  }

  await getDatesBetween(startDate.value, endDate.value)

  const q = query(
    collection(
      db,
      user,
      'userDetails',
      'itineraries',
      `${props.itineraryId}`,
      `${selectedDate.value}`
    ),
    where('dummy', '==', false)
  )

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    destItems.value.push({ id: doc.id, ...doc.data() })
  })
}

//Force re-render component
const renderComponent = ref(true)

const forceRender = async () => {
  renderComponent.value = false
  await nextTick()
  renderComponent.value = true
}

//Fetch data on INITIAL RENDER
await fetchItineraryInfo()

//Fetch data WATCHING SELECTED DATE CHANGE
watch(
  () => selectedDate.value,
  async (val) => {
    if (val) {
      const q = query(
        collection(
          db,
          user,
          'userDetails',
          'itineraries',
          `${props.itineraryId}`,
          `${selectedDate.value}`
        ),
        where('dummy', '==', false)
      )

      const querySnapshot = await getDocs(q)

      destItems.value = []
      querySnapshot.forEach((doc) => {
        destItems.value.push({ id: doc.id, ...doc.data() })
      })

      await forceRender()
    }
  }
)

watch(
  () => props.renderComponent,
  async (val) => {
    if (!val) {
      const q = query(
        collection(
          db,
          user,
          'userDetails',
          'itineraries',
          `${props.itineraryId}`,
          `${selectedDate.value}`
        ),
        where('dummy', '==', false)
      )

      const querySnapshot = await getDocs(q)

      destItems.value = []
      querySnapshot.forEach((doc) => {
        destItems.value.push({ id: doc.id, ...doc.data() })
      })

      await forceRender()
    }
  }
)

async function removeItem({ docId, order }) {
  const docSnap = await getDoc(doc(db, user, 'userDetails', 'itineraries', props.itineraryId))
  if (docSnap.exists()) {
    var currentNumPlaces = docSnap.data().numPlaces

    //Delete doc
    await deleteDoc(
      doc(db, user, `userDetails/itineraries/${props.itineraryId}/${selectedDate.value}/${docId}`)
    )

    //Update numPlaces
    await updateDoc(doc(db, user, `userDetails/itineraries/${props.itineraryId}`), {
      numPlaces: currentNumPlaces - 1
    })

    //Re-order trips
    const q = query(
      collection(db, user, `userDetails/itineraries/${props.itineraryId}/${selectedDate.value}`),
      where('order', '>', order)
    )

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (d) => {
      var originalOrder = d.data().order
      await updateDoc(
        doc(db, user, `userDetails/itineraries/${props.itineraryId}/${selectedDate.value}/${d.id}`),
        {
          order: originalOrder - 1
        }
      )
    })
  }

  const q = query(
    collection(
      db,
      user,
      'userDetails',
      'itineraries',
      `${props.itineraryId}`,
      `${selectedDate.value}`
    ),
    where('dummy', '==', false)
  )

  const querySnapshot = await getDocs(q)

  destItems.value = []
  querySnapshot.forEach((doc) => {
    destItems.value.push({ id: doc.id, ...doc.data() })
  })

  // Force render to show updated itinerary
  await forceRender()
}
</script>

<style scoped>
.headerRow {
  padding: 20px;
}

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
