<template>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-card-title class="font-weight-bold">Marina Bay Sands</v-card-title>

      <!-- FIX STATIC IMAGE SOURCE -->
      <div class="image-wrapper">
        <img src="../../assets/images/location-card-img.jpg" alt="location-card-img" class="location-card-img">
      </div>
  
      <v-card-text>
        Marina Bay Sands is the leading business, leisure and entertainment 
        destination in Asia. 
      </v-card-text>
      <div class="chip-wrapper mt-n3">
        <v-chip label class="ma-1 ml-3 font-weight-bold labelname"> Hotel</v-chip>
        <v-chip label class="ma-1 font-weight-bold labelname"> Casino</v-chip>
        <v-chip label class="ma-1 font-weight-bold labelname"> Shopping</v-chip>
        <v-chip label class="ma-1 font-weight-bold labelname"> Theme Park</v-chip>
      </div>

      <div class="description-wrapper mt-n6">
        <div>
          <v-icon icon="mdi-home"/>
          <v-card-text class="mb-n12">4.6</v-card-text>
        </div>
        <div>
          <v-icon icon="mdi-home"/>
          <v-card-text class="mb-n12">10 Bayfront Ave, Singapore 018956</v-card-text>
        </div>
        <div>
          <v-icon icon="mdi-home"/>
          <a href="https://www.google.com">+65 6688 8868</a>
        </div>
        <div>
          <v-icon icon="mdi-home"/>
          <a href="https://www.google.com">https://www.marinabaysands.com</a>
        </div>
      </div>
      

      <v-card-text>
        Open in : 
      </v-card-text>
      <v-card-actions class="mt-n5">
        <v-btn variant="outlined" class="button">
          Apple Map
        </v-btn>
        <v-btn variant="outlined" class="button">
          Google Map
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>

<script setup>

</script>

<style scoped>
.labelname {
    background-color: #6A1B9A;
    color: var(--white-background-primary);
}

.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.location-card-img {
  object-fit: cover;
  height: 200px;
  width: 100%;
}

.button {
  border-color: var(--dark-grey-primary);
}

a {
  text-decoration: none;
  color: #1E88E5;
  
}


</style>