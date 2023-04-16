<template>
  <div class="item-wrapper">
    <div class="destination-wrapper">
      <div class="destination-title-wrapper">
        <div>
          <font-awesome-icon icon="fa-solid fa-location-pin" />
          <span class="destination-title">{{ props.title }}</span>
        </div>
        <font-awesome-icon icon="fa-solid fa-trash" @click="$emit('removeItem')" />
      </div>

      <p class="destination-description">{{ props.description }}</p>
    </div>

    <div class="destination-image-wrapper">
      <img src="../../assets/images/destination-item-image.jpg" :alt="props.imageAlt" />
    </div>
  </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationPin, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faLocationPin, faTrash)

const props = defineProps(['title', 'description', 'imageSource', 'imageAlt'])
</script>

<style scoped>
.item-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1em;
}

.destination-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1em;
}

.destination-image-wrapper img {
  width: 200px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
}
.destination-wrapper {
  width: 100%;
  height: 180px;
  background: var(--light-grey-primary);
  border-radius: 10px;
  padding: 1em;
}

.destination-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.destination-title {
  font-size: 22px;
  font-weight: 700;
  margin-left: 10px;
}

.destination-description {
  margin-top: 10px;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.fa-location-pin {
  width: 22px;
  height: 22px;
}

.fa-trash {
  cursor: pointer;
  width: 22px;
  height: 22px;
}

.fa-trash:hover {
  color: red;
}
</style>
