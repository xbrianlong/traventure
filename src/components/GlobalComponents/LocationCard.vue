<template>
  <div class="location-card-wrapper">
    <v-container>
      <v-row>
        <v-spacer />
        <v-btn icon size="x-small" variant="flat" @click="closeLocationCard">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>

      <div class="location-title-wrapper">
        <font-awesome-icon icon="fa-solid fa-location-pin" color="#E94335" />
        <span class="location-title">{{ locationCardData.name }}</span>
      </div>

      <div class="location-image-wrapper">
        <img
          :src="locationCardData.photos ? locationCardData.photos[0].getUrl() : ''"
          alt="location-item-image"
        />
      </div>

      <div v-for="(type, index) in locationCardData.types" class="label-group" :key="index">
        <span class="label">{{
          type
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        }}</span>
      </div>

      <div class="location-content">
        <div class="text-wrapper rating">
          <font-awesome-icon icon="fa-solid fa-star" class="text-icon" />
          <span class="text">4.6</span>
        </div>
        <div class="text-wrapper address">
          <font-awesome-icon icon="fa-solid fa-location-dot" class="text-icon" />
          <a :href="`http://maps.google.com/?q=${locationCardData.formatted_address}`">
            <span class="text link">{{
              locationCardData.formatted_address ? locationCardData.formatted_address : '-'
            }}</span>
          </a>
        </div>
        <div class="text-wrapper">
          <font-awesome-icon icon="fa-solid fa-phone" class="text-icon" />
          <a :href="`tel:${locationCardData.formatted_phone_number}`">
            <span class="text link">{{
              locationCardData.formatted_phone_number
                ? locationCardData.formatted_phone_number
                : '-'
            }}</span>
          </a>
        </div>
        <div class="text-wrapper">
          <font-awesome-icon icon="fa-solid fa-earth-americas" class="text-icon" />
          <a :href="locationCardData.website">
            <span class="text link">{{
              locationCardData.website ? locationCardData.website : '-'
            }}</span>
          </a>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faLocationPin,
  faStar,
  faLocationDot,
  faPhone,
  faEarthAmericas
} from '@fortawesome/free-solid-svg-icons'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const locationCardData = computed(() => store.getters.getLocationCardData)

library.add(faLocationPin, faStar, faLocationDot, faPhone, faEarthAmericas)

function closeLocationCard() {
  store.commit('closeLocationCard')
  if (store.getters.getTempMarker) {
    store.getters.getTempMarker.setMap(null)
  }
}
</script>

<style scoped>
.location-card-wrapper {
  width: 26%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 5px 10px;
  margin: 1em;
  background-color: white;

  /*position fixed for formatting*/
  position: fixed;
  right: 0;
  bottom: 0;

  z-index: 10000;
}

.location-card-wrapper::webkit-scrollbar {
  width: 10px;
}
.location-card-wrapper::webkit-scrollbar-track {
  background: transparent;
}

.location-title {
  font-size: 22px;
  font-weight: 700;
  margin-left: 10px;
}

.fa-location-pin {
  width: 22px;
  height: 22px;
}

.location-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.3em;
}

.location-image-wrapper img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.label-group {
  display: inline-block;
  column-gap: 5px;
  margin-right: 5px;
  margin-top: 5px;
}

.label {
  font-size: 13px;
  font-weight: 500;
  padding: 5px 8px;
  background-color: var(--black-text-primary);
  border-radius: 5px;
  color: white;
}

.text-wrapper {
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text {
  margin-left: 8px;
  font-size: 14px;
  color: var(--dark-grey-primary);
}

.text-icon {
  width: 15px;
  height: 15px;
  color: var(--dark-grey-primary);
}

.rating .text,
.rating .text-icon {
  color: #f9a825;
}

.text.link {
  color: var(--blue-link-primary);
}
</style>