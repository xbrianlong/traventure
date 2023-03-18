<template>
  <div class="item-wrapper">
    <div class="detail-wrapper">
      <div class="image-wrapper">
        <img src="../../assets/images/gardensbythebay.jpeg" alt="nearby-image" />
      </div>
      <span class="detail-title">Gardens By The Bay</span>
    </div>
    <v-btn icon="mdi-plus" class="icon-button"></v-btn>
  </div>
</template>

<script setup></script>

<style scoped>
.item-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid var(--dark-grey-primary) 1px;
  min-width: 18%;
  width: 18%;
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
}

.detail-title {
  font-weight: bold;
  margin-left: 10px;
  font-size: 16px;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper img {
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
