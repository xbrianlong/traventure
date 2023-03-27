<template>
    <div class="header-wrapper">
        <font-awesome-icon icon="fa-solid fa-map" class="expand-map-button"/>
        <div class="image-wrapper">
            <img src="../../assets/images/itinerary-header-image.jpg" alt="header-image">
        </div>
        
        <div class="header-details-wrapper">
            <ItineraryTitle />
            
            <button class="share-button">
                <span>Share Itinerary</span>
                <font-awesome-icon icon="fa-solid fa-link" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faLink, faMap } from '@fortawesome/free-solid-svg-icons'
import ItineraryTitle from './ItineraryTitle.vue';

library.add(faPen, faLink, faMap)

</script>

<style scoped>

.header-wrapper {
    width: calc(var(--expanded-map-width) + 1em);
    height: 250px;
    position: relative;
}
.image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.image-wrapper img {
    height: 250px;
    width: 100%;
    object-fit: cover;
}

.header-details-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    bottom: 4em
}

.share-button {
  background-color: var(--white-background-primary);
  color: var(--black-text-primary);
  width: 160px;
  height: 42px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-right: 1em;
}

.expand-map-button {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    color: var(--white-background-primary);
    cursor: pointer;
}

</style>