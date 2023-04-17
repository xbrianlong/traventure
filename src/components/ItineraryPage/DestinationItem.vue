<template>
  <div class="item-wrapper">
    <div class="destination-wrapper">
      <div class="destination-title-wrapper">
        <div>
          <font-awesome-icon icon="fa-solid fa-location-pin" />
          <span class="destination-title">{{ placeName }}</span>
        </div>
        <font-awesome-icon
          icon="fa-solid fa-trash"
          @click="$emit('removeItem', { docId: props.docId, order: props.order })"
        />
      </div>

      <br />

      <!-- location -->
      <v-row class="px-3 py-0 align-center">
        <v-col class="px-2 py-0 flex-grow-0 flex-shrink-0">
          <v-icon class="icon" icon="mdi-map-marker"></v-icon>
        </v-col>
        <v-col class="px-2 py-0 flex-grow-1 flex-shrink-0">
          <v-card-text class="pa-0">{{ placeAddress }}</v-card-text>
        </v-col>
      </v-row>

      <!-- phone number (havent impliment if no website how) -->
      <v-row class="px-3 py-0 align-center">
        <v-col class="px-2 py-0 flex-grow-0 flex-shrink-0">
          <v-icon class="icon" icon="mdi-phone"></v-icon>
        </v-col>
        <v-col class="px-2 py-0 flex-grow-1 flex-shrink-0">
          <a :href="`tel:${phoneNum}`">
            <v-card-text class="pa-0">{{ phoneNum ? phoneNum : '-' }}</v-card-text>
          </a>
        </v-col>
      </v-row>

      <!-- website -->
      <v-row class="px-3 py-0 align-center">
        <v-col class="px-2 py-0 flex-grow-0 flex-shrink-0">
          <v-icon class="icon" icon="mdi-web"></v-icon>
        </v-col>
        <v-col class="px-2 py-0 flex-grow-1 flex-shrink-0">
          <a :href="website">
            <v-card-text class="pa-0">{{ website }}</v-card-text>
          </a>
        </v-col>
      </v-row>
    </div>

    <div class="destination-image-wrapper">
      <img :src="photo" :alt="placeName" />
    </div>
  </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationPin, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'

const store = useStore()
const mapRef = computed(() => store.getters.getMapRef)

library.add(faLocationPin, faTrash)

const props = defineProps(['order', 'placeId', 'docId'])
const placeName = ref('')
const placeAddress = ref('')
const phoneNum = ref('')
const website = ref('')
const photo = ref('')

var request = {
  placeId: props.placeId,
  fields: ['name', 'formatted_phone_number', 'website', 'photos', 'formatted_address']
}

setTimeout(fetchPlaceDetails, 600)

async function fetchPlaceDetails() {
  var placesDetailsService = new mapRef.value.api.places.PlacesService(mapRef.value.map)
  placesDetailsService.getDetails(request, (place, status) => {
    if (status == 'OK') {
      console.log('hello')
      placeName.value = place.name ? place.name : ''
      phoneNum.value = place.formatted_phone_number ? place.formatted_phone_number : ''
      website.value = place.website ? place.website : ''
      photo.value = place.photos ? place.photos[0].getUrl() : ''
      placeAddress.value = place.formatted_address ? place.formatted_address : ''
    }
  })
}
</script>

<style scoped>
.item-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1em;
}

.destination-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1em;
}

.destination-image-wrapper img {
  width: 200px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
}
.destination-wrapper {
  width: 100%;
  height: 180px;
  background: var(--light-grey-primary);
  border-radius: 10px;
  padding: 1em;
}

.destination-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.destination-title {
  font-size: 22px;
  font-weight: 700;
  margin-left: 10px;
}

.fa-location-pin {
  width: 22px;
  height: 22px;
}

.fa-trash {
  cursor: pointer;
  width: 22px;
  height: 22px;
}

.fa-trash:hover {
  color: red;
}
</style>
