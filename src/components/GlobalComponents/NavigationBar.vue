<template>
  <div>
    <nav>
      <ul>
        <RouterLink to="/">
          <div class="nav-wrapper">
            <li>
              <font-awesome-icon icon="fa-solid fa-bars" class="nav-icon"/>
              <span class="nav-item">Dashboard</span>
            </li>
          </div>
        </RouterLink>

        <RouterLink to="/itinerary">
          <div class="nav-wrapper">
            <li>
              <font-awesome-icon icon="fa-solid fa-calendar-days" class="nav-icon"/>
              <span class="nav-item">Itinerary</span>
            </li>
          </div>
        </RouterLink>

        <RouterLink to="/explore">
          <div class="nav-wrapper">
            <li>
              <font-awesome-icon icon="fa-solid fa-compass" class="nav-icon"/>
              <span class="nav-item">Explore</span>
            </li>          
          </div>
        </RouterLink>

        <RouterLink to="/wishlist">
          <div class="nav-wrapper">
            <li>
              <font-awesome-icon icon="fa-solid fa-heart" class="nav-icon"/>
              <span class="nav-item">Wishlist</span>
            </li>
          </div>
        </RouterLink>

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
a.active .nav-wrapper,
a.exact-active .nav-wrapper {
  background-color: var(--light-grey-primary);
}

</style>