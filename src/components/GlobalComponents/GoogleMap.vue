<template>
  <div class="map">
    <!-- Manually set width and height via inline attributes -->
    <GoogleMap :api-key="apiKey" style="width: 800px; height: 100vh" ref="mapRef"></GoogleMap>
  </div>
</template>

<script setup>
/**
 *  Input: Takes in a placeId as a prop, which describes
 *  the geographical location of destination country/state/island.
 *
 *  Output: Dynamic map that centers and zooms onto the the country.
 */
import { ref, watch, defineProps } from 'vue'
import { GoogleMap } from 'vue3-google-map'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const mapRef = ref(null)
const props = defineProps(['placeId'])

watch(
  () => mapRef.value?.ready,
  (ready) => {
    if (ready) {
      var geocoder = new mapRef.value.api.Geocoder()
      geocoder.geocode({ placeId: props.placeId }, function (results, status) {
        if (status == 'OK') {
          mapRef.value.map.setCenter(results[0].geometry.location)
          mapRef.value.map.setZoom(12)
        }
      })
    }
  }
)
</script>