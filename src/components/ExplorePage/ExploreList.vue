<template>
  <v-container class="pb-3 px-7 mx-0 explore-list">
    <v-row>
      <v-col class="px-0 my-0">
        <v-card-title class="font-weight-bold text-h6 text-md-h5 mx-0">{{
          props.placeCategory
        }}</v-card-title>
      </v-col>
      <v-col class="flex-grow-0" align-self="center">
        <v-btn class="view-all" @click="$emit('viewAll', props.placeCategory)">
          <!-- to insert functionality, swap to view all page -->
          View All
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <!-- maybe do the carousel thing that chloe did -->
      <v-col
        v-for="(place, index) in props.places.slice(0, 4)"
        :key="index"
        class="col-card"
        :cols="numCols"
        align="center"
      >
        <ExploreCard :placeDetails="place" />
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup>
import ExploreCard from './ExploreCard.vue'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { defineProps } from 'vue'

const props = defineProps(['placeCategory', 'places'])
const { width } = useDisplay()

const numCols = computed(() => {
  if (width.value < 910) {
    return 12
  } else if (width.value < 1465) {
    return 6
  }
  return 3
})
</script>
  
<style scoped>
.explore-list {
  align-items: center;
  justify-content: space-between;
  width: var(--expanded-map-width);
}

.view-all {
  color: white;
  background-color: black;
}
</style>