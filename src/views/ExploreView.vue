<template>
  <TheHeader />
  <NavigationBar :placeId="countryId" />
  <div class="view">
    <!-- Map Component -->
    <GoogleMap :placeId="countryId" :pageString="pageString" />

    <!-- Explore Subheader -->
    <div class="subheader pt-3 pb-0 mx-0 px-0">
      <v-row class="pa-0 ma-0">
        <v-col>
          <p class="px-5 text-h3 font-weight-bold">{{ countryName }}</p>
        </v-col>
        <v-col>
          <div class="input-container">
            <v-icon icon="mdi-magnify" id="icon" size="large" />
            <input type="text" id="search-input" placeholder="Search" />
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- Explore Cards -->
    <div v-if="!toggleViewAll" class="explore-main">
      <div v-for="(value, key, index) in exploreData" :key="index">
        <ExploreList :placeCategory="key" :places="value" @view-all="viewAll($event)" />
      </div>
      <br />
    </div>

    <div v-else class="explore-view-all">
      <div class="toggle-btn ma-5" justify="center" @click="toggle">
        <v-icon icon="mdi-chevron-left" size="x-large" class="mr-2" />
        <a class="text-h6">Featured</a>
      </div>
      <v-divider />
      <div v-for="(place, index) in exploreData[category]" :key="index">
        <ExploreItem :placeDetails="place" />
      </div>
    </div>
  </div>
  <LocationCard v-if="showLocationCard" />
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue'
import NavigationBar from '../components/GlobalComponents/NavigationBar.vue'
import GoogleMap from '../components/GlobalComponents/GoogleMap.vue'
import LocationCard from '../components/GlobalComponents/LocationCard.vue'
import ExploreList from '../components/ExplorePage/ExploreList.vue'
import ExploreItem from '../components/ExplorePage/ExploreItem.vue'
import { ref, computed, watch, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const countryId = computed(() => route.params.id)
const mapRef = computed(() => store.getters.getMapRef)
const showLocationCard = computed(() => store.getters.getLocationCardStatus)

// Initialize mapRef
const pageString = ref('Explore')

// Initialize viewAllView and category states
const toggleViewAll = ref(false)
const category = ref('')

// Fetched data
const exploreData = ref({})

const acObj = ref(null)
const locObj = ref(null)
const countryName = ref('')

function viewAll(placeCategory) {
  toggleViewAll.value = !toggleViewAll.value
  category.value = placeCategory
  scrollToTop()
}

function scrollToTop() {
  window.scrollTo(0, 0)
}

function toggle() {
  toggleViewAll.value = !toggleViewAll.value
}

watch(
  () => mapRef.value,
  async (newVal) => {
    if (newVal) {
      //Autocomplete widget
      var input = document.getElementById('search-input')
      acObj.value = new mapRef.value.api.places.Autocomplete(input, {
        bounds: mapRef.value.map.getBounds(),
        strictBounds: true,
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
      })
      acObj.value.addListener('place_changed', getPlaceResult)

      //Find country name
      var request = {
        placeId: countryId.value,
        fields: ['name', 'geometry']
      }
      const placesDetailsService = new mapRef.value.api.places.PlacesService(mapRef.value.map)
      await placesDetailsService.getDetails(request, (place, status) => {
        if (status == 'OK') {
          countryName.value = place.name
          locObj.value = place.geometry.location
        }
      })
    }
  }
)

watch(locObj, async (value) => {
  if (value) {
    //Fetch data
    var textSearchService = await new mapRef.value.api.places.PlacesService(mapRef.value.map)

    // Things to do query
    var toDoRequest = {
      location: locObj.value,
      query: 'things to do'
    }

    textSearchService.textSearch(toDoRequest, function (results, status) {
      if (status == mapRef.value.api.places.PlacesServiceStatus.OK) {
        exploreData.value['Things to Do'] = results
      }
    })

    //Food query
    var foodRequest = {
      location: locObj.value,
      query: 'best food places'
    }

    await textSearchService.textSearch(foodRequest, function (results, status) {
      if (status == mapRef.value.api.places.PlacesServiceStatus.OK) {
        exploreData.value['Food'] = results
      }
    })

    //Hotel query
    var hotelRequest = {
      location: locObj.value,
      query: 'best hotels'
    }

    await textSearchService.textSearch(hotelRequest, function (results, status) {
      if (status == mapRef.value.api.places.PlacesServiceStatus.OK) {
        exploreData.value['Hotels'] = results
      }
    })

    //Shopping query
    var shoppingRequest = {
      location: locObj.value,
      query: 'best shopping places'
    }

    await textSearchService.textSearch(shoppingRequest, function (results, status) {
      if (status == mapRef.value.api.places.PlacesServiceStatus.OK) {
        exploreData.value['Shopping'] = results
      }
    })
  }
})

function getPlaceResult() {
  var place = acObj.value.getPlace()
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

onUnmounted(() => store.commit('closeLocationCard'))
</script>

<style scoped>
.view .subheader {
  width: var(--expanded-map-width);
}

.view .subheader #search-bar {
  margin-right: 18px;
}

.explore-view-all .toggle-btn {
  cursor: pointer;
}

.input-container {
  position: relative;
  background-color: var(--light-grey-primary);
  padding: 0px 10px 0px 25px;
  border-radius: 10px;
  line-height: 52px;
}

.input-container #icon {
  position: absolute;
  color: var(--dark-grey-primary);
  align-items: center;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  padding-left: 35px;
}

.input-container #search-input {
  line-height: normal;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: var(--dark-grey-primary);
  width: 100%;
  padding-left: 40px;
}

.input-container input:focus {
  outline: none;
}
</style>
