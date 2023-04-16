<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      :elevation="isHovering ? 12 : 2"
      :class="{ 'on-hover': isHovering }"
      v-bind="props"
      @click="showLocationDetails"
    >
      <!-- add function to add to drawer on v-card -->
      <v-img :src="photoUrl" height="300px" cover>
        <v-overlay
          :model-value="isHovering"
          class="align-center pa-auto"
          style="text-align: left"
          contained
        >
          <v-card-text>
            <p class="text-h5 font-weight-bold place-name">{{ name }}</p>
            <p class="text-h6 place-name rating">
              {{ rating }}<v-icon icon="mdi-star" size="x-small" />
            </p>
          </v-card-text>
        </v-overlay>
      </v-img>
    </v-card>
  </v-hover>
</template>
  
<script setup>
import { ref, defineProps, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps(['placeDetails'])
const photoUrl = ref(props.placeDetails.photos ? props.placeDetails.photos[0].getUrl() : '')
const name = ref(props.placeDetails.name)
const rating = ref(props.placeDetails.rating)

const mapRef = computed(() => store.getters.getMapRef)

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
.v-card {
  height: 100%;
  width: 200px;
  cursor: pointer;
}

#icon {
  position: absolute;
  right: -200px;
  top: 0;
}

.icon {
  color: rgba(255, 255, 255, 0);
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.place-name {
  color: white;
}

.rating {
  color: #ffc300;
}
</style>