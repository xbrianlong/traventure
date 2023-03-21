<template>
  <div class="item-wrapper">
    <div class="detail-wrapper">
      <div class="image-wrapper">
        <img :src="image" alt="nearby-image" />
      </div>
      <span class="detail-title">{{ name }}</span>
    </div>
    <v-btn icon="mdi-plus" class="icon-button" @click="$emit('addedNearby', name)"></v-btn>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  image: String
})
</script>

<style scoped>
.item-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid var(--dark-grey-primary) 1px;
  width: 215px;
  border-radius: 10px;
  padding: 5px;
}

.icon-button {
  background-color: #6a1b9a;
  margin-right: 5px;
  color: white;
}

.detail-wrapper {
  display: flex;
  align-items: center;
  width: 100px;
}

.detail-title {
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
}

.image-wrapper img {
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
