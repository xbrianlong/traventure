<!-- <template>
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
</template> -->

<template>
  <div>
    <nav>
      <ul>
        <div class="nav-wrapper">
          <li>
            <RouterLink to="/">
              <font-awesome-icon icon="fa-solid fa-bars" class="nav-icon"/>
              <span class="nav-item">Dashboard</span>
            </RouterLink>
          </li>
        </div>

        <div class="nav-wrapper">
          <li>
            <RouterLink to="/itinerary">
              <font-awesome-icon icon="fa-solid fa-calendar-days" class="nav-icon"/>
              <span class="nav-item">Itinerary</span>
            </RouterLink>
          </li>
        </div>

        <div class="nav-wrapper">
          <li>
            <RouterLink to="/explore">
              <font-awesome-icon icon="fa-solid fa-compass" class="nav-icon"/>
              <span class="nav-item">Explore</span>
            </RouterLink>
          </li>          
        </div>

        <div class="nav-wrapper">
          <li>
            <RouterLink to="/wishlist">
              <font-awesome-icon icon="fa-solid fa-heart" class="nav-icon"/>
              <span class="nav-item">Wishlist</span>
            </RouterLink>
          </li>
        </div>

      </ul>
    </nav>
  </div>  
</template>



<script setup>
import { RouterLink } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCompass, faBars, faCalendarDays, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faCompass, faBars, faCalendarDays, faHeart)
</script>

<style scoped>
/* nav {
  position: absolute;
  height: 100vh;
  background: var(--white-background-primary);
  width: 65px;
  overflow: hidden;
  transition: width 0.2s linear;
  border-right: 1px solid var(--dark-grey-primary);
}


a {
  text-decoration: none;
  font-size: 22px;
  color: black;
  font-weight: bold;
  padding: 10px;
  margin-left: 10px;
}

li {
  margin-top: 15px;
}

.icon {
  font-size: 28px;
}

.nav-item {
  position: relative;
  bottom: 35px;
  margin-left: 65px;
}

li:hover {
  background: red;
}

nav:hover {
  width: 210px;
  transition: all 0.5s ease;
} */

nav {
  background: var(--white-background-primary);
  border-right: 1px solid var(--dark-grey-primary);
  width: 200px;
  height: 100vh;
  position: absolute;
  overflow: hidden;
}

a {
  text-decoration: none;
  color: var(--black-text-primary);
}

li {
  display: flex;
  align-items: center;
}

.nav-wrapper {
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  margin-top: 15px;
}

.nav-icon {
  font-size: 23px;
}

.nav-item {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
}

.nav-wrapper:hover {
  background-color: var(--light-grey-primary);
}

</style>