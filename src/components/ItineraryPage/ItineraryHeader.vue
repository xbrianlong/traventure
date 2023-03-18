<template>
    <div class="header-wrapper">
        <div class="image-wrapper">
            <img src="../../assets/images/itinerary-header-image.jpg" alt="header-image">
        </div>
        
        <div class="header-details-wrapper">
            <div class="header-title-wrapper">
                <span class="header-title-text">Trip to Singapore</span>
                <a href="#"><font-awesome-icon icon="fa-solid fa-pen" /></a>
            </div>

            <button class="share-button">
                <span>Share Itinerary</span>
                <font-awesome-icon icon="fa-solid fa-link" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faLink } from '@fortawesome/free-solid-svg-icons'

library.add(faPen, faLink)

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

.header-title-wrapper {
    color: var(--white-background-primary);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 420px;
    height: 60px;
}

.fa-pen {
    height: 25px;
    width: 25px;
    color: white;
    position: relative;
    top: 1.5px
}

.header-title-text {
    font-size: 40px;
    font-weight: 600;
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

</style>