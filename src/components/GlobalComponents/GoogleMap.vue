<template>
  <div class="map-wrapper">
    <!-- Manually set width and height via inline attributes -->
    <GoogleMap
      :api-key="apiKey"
      style="position: fixed; width: 29vw; height: 100vh"
      ref="mapRef"
    ></GoogleMap>
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
import { useStore } from 'vuex'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const mapRef = ref(null)
const locObj = ref(null)
const props = defineProps(['placeId', 'pageString'])
const store = useStore()
//const emit = defineEmits(['fetchService'])

watch(
  () => mapRef.value?.ready,
  async (ready) => {
    if (ready) {
      var geocoder = new mapRef.value.api.Geocoder()
      await geocoder.geocode({ placeId: props.placeId }, function (results, status) {
        if (status == 'OK') {
          mapRef.value.map.setCenter(results[0].geometry.location)
          locObj.value = results[0].geometry.location
          mapRef.value.map.setZoom(12)
        }
      })

      store.commit('updateMapRef', mapRef)

      if (props.pageString == 'Explore') {
        var service = await new mapRef.value.api.places.PlacesService(mapRef.value.map)

        // Things to do query
        var toDoRequest = {
          location: locObj.value,
          query: 'things to do'
        }

        service.textSearch(toDoRequest, function (results, status) {
          if (status == mapRef.value.api.places.PlacesServiceStatus.OK) {
            store.commit('uploadExploreData', {
              category: 'Things to Do',
              data: results
            })
          }
        })

        //Food query
        var foodRequest = {
          location: locObj.value,
          query: 'best food places'
        }

        await service.textSearch(foodRequest, function (results, status) {
          if (status == mapRef.value.api.places.PlacesServiceStatus.OK) {
            store.commit('uploadExploreData', {
              category: 'Food',
              data: results
            })
          }
        })

        //Hotel query
        var hotelRequest = {
          location: locObj.value,
          query: 'best hotels'
        }

        await service.textSearch(hotelRequest, function (results, status) {
          if (status == mapRef.value.api.places.PlacesServiceStatus.OK) {
            store.commit('uploadExploreData', {
              category: 'Hotels',
              data: results
            })
          }
        })

        //Shopping query
        var shoppingRequest = {
          location: locObj.value,
          query: 'best shopping places'
        }

        await service.textSearch(shoppingRequest, function (results, status) {
          if (status == mapRef.value.api.places.PlacesServiceStatus.OK) {
            store.commit('uploadExploreData', {
              category: 'Shopping',
              data: results
            })
          }
        })
      }
    }
  }
)
</script>

<style scoped>
.map-wrapper {
  position: fixed;
  right: 0;
  width: 29%;
  height: 100vh;
  box-shadow: inset 7px 0 8px -7px var(--dark-grey-primary);
  z-index: 100;
}
</style>