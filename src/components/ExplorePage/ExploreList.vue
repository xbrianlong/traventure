<template>
    <v-card flat class="py-1 mx-0 card">
        <v-container>
            <v-row class="d-flex">
                <v-col class="px-1 flex-grow-1 flex-shrink-0">
                    <v-card-title class="font-weight-bold text-h6 text-md-h5">Places of Interest</v-card-title>
                </v-col>
                <v-col class="px-1 flex-grow-0 flex-shrink-1">
                    <v-btn class="view-all">
                        <!-- to insert functionality, swap to view all page -->
                        View All
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <!-- maybe do the carousel thing that chloe did -->
                <v-col class="col-card"><ExploreCard /></v-col>
                <v-col class="col-card"><ExploreCard /></v-col>
                <v-col class="col-card"><ExploreCard /></v-col>
                <v-col class="col-card"><ExploreCard /></v-col>
                <v-col class="col-card"><ExploreCard /></v-col>
            </v-row>
        </v-container>
    </v-card>
  </template>
  
  <script setup>
  import ExploreCard from './ExploreCard.vue';
  
  </script>
  
  <style scoped>
    .card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: var(--expanded-map-width);
        height: 300px;
    }

    .view-all {
        color: white;
        background-color: black;
    }
  </style>