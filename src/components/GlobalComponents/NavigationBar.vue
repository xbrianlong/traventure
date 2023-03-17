<template>
    
    <v-card>
      <v-layout>
        <v-navigation-drawer 
          expand-on-hover
          rail
          class="mt-16"
        >
  
          <v-list nav>
            <RouterLink to="/" class="link"><v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"></v-list-item></RouterLink>
            <RouterLink to="/itinerary" class="link"><v-list-item prepend-icon="mdi-view-day" title="Itinerary" value="itinerary"></v-list-item></RouterLink>
            <RouterLink to="/explore" class="link"><v-list-item prepend-icon="mdi-compass" title="Explore" value="explore"></v-list-item></RouterLink>
            <RouterLink to="/wishlist" class="link"><v-list-item prepend-icon="mdi-heart" title="Wishlist" value="wishlist"></v-list-item></RouterLink>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
    
  </template>

<script setup>
import { RouterLink} from 'vue-router'
</script>

<style scoped>
.nav-bar {
    margin-top: 100px;
}

.link {
    text-decoration: none;
    font-size: 23px;
    color: black;
}

</style>