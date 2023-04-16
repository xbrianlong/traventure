<template>
  <div class="card-wrapper">
    <div class="image-wrapper">
      <img :src="imageSource" :alt="props.imageAlt" />
    </div>

    <div class="card-details">
      <div class="card-top">
        <h3 class="title">{{ props.title }}</h3>
        <font-awesome-icon icon="fa-solid fa-trash" @click.stop="$emit('removeItem')" />
      </div>
      <div class="card-date-location-wrapper">
        <span class="date">{{ props.startDate }}</span>
        <span class="divider">-</span>
        <span class="date">{{ props.endDate }}</span>
        <span class="divider">|</span>
        <span>{{ props.numPlaces }}</span>
        <span class="place">places</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

const props = defineProps(['title', 'startDate', 'endDate', 'numPlaces', 'imageAlt', 'imageSource'])
</script>

<style scoped>
.card-wrapper {
  width: 400px;
  height: 300px;
  border: solid 1.5px var(--light-grey-primary);
  border-radius: 10px;
  cursor: pointer;
}

.card-wrapper:hover {
  transform: scale(1.01);
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.image-wrapper img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fa-trash {
  width: 20px;
  height: 20px;
}

.fa-trash:hover {
  color: red;
}

.card-details {
  padding: 10px;
}

.title {
  font-size: 22px;
}

.card-date-location-wrapper span {
  font-size: 16px;
}
.date {
  color: var(--dark-grey-primary);
}

.divider {
  margin-left: 8px;
  margin-right: 8px;
}

.place {
  margin-left: 5px;
}
</style>
