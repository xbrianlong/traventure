<template>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-card-title>Marina Bay Sands</v-card-title>
      <v-img
        class="align-end text-white"
        height="200"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
      >
      </v-img>
  
      <v-card-text>
        Marina Bay Sands is the leading business, leisure and entertainment 
        destination in Asia. 
      </v-card-text>

        <v-chip label class="ma-1 labelname font-weight-bold"> Hotel</v-chip>
        <v-chip label class="ma-1 labelname"> Casino</v-chip>
        <v-chip label class="ma-1 labelname"> Shopping</v-chip>
        <v-chip label class="ma-1 labelname"> Theme Park</v-chip>

      <v-card-text>
        Open in : 
      </v-card-text>
      <v-card-actions>
        <v-btn>
          Apple Map
        </v-btn>
        <v-btn>
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
    color: white;
}


</style>