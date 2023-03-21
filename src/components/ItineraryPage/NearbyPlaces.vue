<template>
  <v-sheet class="mx-1" elevation="8" max-width="800">
    <v-slide-group v-model="model" show-arrows>
      <v-slide-group-item v-for="(item, index) in model" :key="index">
        <PlaceBox
          :name="item.name"
          :image="item.image"
          :class="['ma-2']"
          @addedNearby="updateNearbyPlaces"
        >
        </PlaceBox>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'
import PlaceBox from './PlaceBox.vue'

const model = ref([
  {
    name: 'Gardens By The Bay',
    image:
      'https://www.visitsingapore.com/content/dam/desktop/global/see-do-singapore/nature-wildlife/gbtb/carousel1-940x940.jpg'
  },
  {
    name: 'Art Science Museum',
    image:
      'https://www.visitsingapore.com/content/dam/desktop/global/see-do-singapore/arts/art-science-musuem-carousel01-square.jpeg'
  },
  {
    name: 'Singapore Flyer',
    image:
      'https://www.singaporeflyer.com/storage/custom-menus/October2020/Iih8lEFiZH5ADlxwkGTW.jpg'
  },
  {
    name: 'Esplanade',
    image: 'https://cdn.archilovers.com/projects/4337c966-2915-4ac4-bcd3-2bc8c68eadfd.jpg'
  },
  {
    name: 'Marina Bay Sands',
    image:
      'https://www.marinabaysands.com/content/dam/singapore/marinabaysands/master/main/home/sg-visitors-guide/whats-on-mbs-may/mbs-exterior-3-600x660.jpg'
  },
  {
    name: 'Universal Studios Singapore',
    image:
      'https://www.rwsentosa.com/-/jssmedia/project/non-gaming/rwsentosa/home/attractions/universal-studios-singapore-996x560.jpg?h=560&iar=0&w=996&rev=48cd69d81cb64c70a3a98c9826a9f1f1&hash=BDFDA84B7316FCAF67FC4A63A315C56B'
  },
  {
    name: 'SEA Aquarium',
    image:
      'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_854/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/jiycnyuvvimmn90nwdws/SEAAquariumTicketSentosa,Singapore.jpg'
  },
  {
    name: 'Singapore Zoo',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/5/50/Singapore_Zoo_entrance-15Feb2010.jpg'
  },
  {
    name: 'CHIJMES',
    image: 'https://www.perennialholdings.com/images/singapore-chijmes-2020-2.jpg'
  },
  {
    name: 'Bugis Street',
    image: 'https://thesmartlocal.com/wp-content/uploads/2021/01/Bugis-Street-Singapore-8.jpg'
  }
])

function updateNearbyPlaces(placeName) {
  model.value = model.value.filter((item) => {
    return item.name !== placeName
  })
}
</script>

<style scoped></style>
