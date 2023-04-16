<template>
  <v-card flat class="pa-2 mx-0 card" rounded="0" @click="showLocationDetails">
    <v-container>
      <v-row class="d-flex py-0 my-0" align="center">
        <v-col md="8" lg="8" class="pa-2 pr-5 flex-grow-1 flex-shrink-0">
          <v-row class="align-center">
            <v-col class="px-1 flex-grow-1 flex-shrink-0" cols="10">
              <v-card-title class="font-weight-bold text-h6 text-md-h5 mt-0">{{
                props.placeDetails.name
              }}</v-card-title>
            </v-col>
            <!--
            <v-col class="px-1 flex-grow-0 flex-shrink-0">
              <a flat @click="toggleLike">
                <v-icon v-if="like" icon="mdi-heart" color="red"></v-icon>
                <v-icon v-else class="icon" icon="mdi-heart-outline"></v-icon>
              </a>
            </v-col>
            <v-col class="px-1 flex-grow-0 flex-shrink-0">
              <a flat @click="toggleFavourite">
                <v-icon v-if="favourite" icon="mdi-check" color="success"></v-icon>
                <v-icon v-else class="icon" icon="mdi-plus-circle-outline"></v-icon>
              </a>
            </v-col>
            -->
          </v-row>

          <div
            v-for="(type, index) in props.placeDetails.types"
            :key="index"
            style="display: inline-block"
            class="ml-1"
          >
            <v-chip label size="x-small" class="ma-1 font-weight-bold labelname">
              {{
                type
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
              }}</v-chip
            >
          </div>

          <br /><br />

          <!-- rating -->
          <v-row class="px-3 py-0 align-center">
            <v-col class="px-2 py-0 flex-grow-0 flex-shrink-0">
              <v-icon class="icon" icon="mdi-star"></v-icon>
            </v-col>
            <v-col class="px-2 py-0 flex-grow-1 flex-shrink-0">
              <v-card-text class="pa-0">{{ props.placeDetails.rating }}</v-card-text>
            </v-col>
          </v-row>

          <!-- location -->
          <v-row class="px-3 py-0 align-center">
            <v-col class="px-2 py-0 flex-grow-0 flex-shrink-0">
              <v-icon class="icon" icon="mdi-map-marker"></v-icon>
            </v-col>
            <v-col class="px-2 py-0 flex-grow-1 flex-shrink-0">
              <v-card-text class="pa-0">{{ props.placeDetails.formatted_address }}</v-card-text>
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

          <!-- website (havent implement if no website how) -->
          <v-row class="px-3 py-0 align-center">
            <v-col class="px-2 py-0 flex-grow-0 flex-shrink-0">
              <v-icon class="icon" icon="mdi-web"></v-icon>
            </v-col>
            <v-col class="px-2 py-0 flex-grow-1 flex-shrink-0">
              <a :href="website">
                <v-card-text class="pa-0">{{ website ? website : '-' }}</v-card-text>
              </a>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="4" lg="4" class="hidden-xs img-wrapper">
          <img class="image" :src="photo" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps(['placeDetails'])
const phoneNum = ref('')
const website = ref('')
const photo = ref('')

const mapRef = computed(() => store.getters.getMapRef)

//const toggleLike = () => (like.value = !like.value)
//const toggleFavourite = () => (favourite.value = !favourite.value)

var request = {
  placeId: props.placeDetails.place_id,
  fields: ['formatted_phone_number', 'website', 'photos']
}

var placesDetailsService = new mapRef.value.api.places.PlacesService(mapRef.value.map)
placesDetailsService.getDetails(request, (place, status) => {
  if (status == 'OK') {
    phoneNum.value = place.formatted_phone_number
    website.value = place.website
    photo.value = place.photos ? place.photos[0].getUrl() : ''
  }
})

async function showLocationDetails() {
  var request = {
    placeId: props.placeDetails.place_id,
    fields: [
      'name',
      'photos',
      'rating',
      'formatted_address',
      'formatted_phone_number',
      'website',
      'types',
      'geometry'
    ]
  }

  function callback(place, status) {
    if (status == 'OK') {
      //console.log(place)
      //add logic for mutating location modal state
      store.commit('showLocationCard')
      store.commit('uploadLocationCardData', place)

      if (store.getters.getTempMarker) {
        store.getters.getTempMarker.setMap(null)
      }

      var marker = new mapRef.value.api.Marker({
        position: place.geometry.location,
        map: mapRef.value.map
      })

      //Add temp marker
      store.commit('addTempMarker', marker)

      store.getters.getTempMarker.setMap(mapRef.value.map)

      mapRef.value.map.panTo(place.geometry.location)
    }
  }

  var placesDetailsService = await new mapRef.value.api.places.PlacesService(mapRef.value.map)
  placesDetailsService.getDetails(request, callback)
}
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--expanded-map-width);
  align-self: center;
}

.card:hover {
  background-color: var(--light-grey-primary);
  cursor: pointer;
}

.v-btn--size-default {
  --v-btn-height: 10px;
}

.img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  width: 100%;
  height: 210px;
  object-fit: cover;
}
.labelname {
  background-color: #6a1b9a;
  color: white;
}

.icon {
  color: #000000;
  opacity: 0.54;
}
</style>