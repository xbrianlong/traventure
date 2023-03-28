<template>
  <div>
    <nav>
      <ul>
        <RouterLink to="/dashboard">
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

        <v-btn @click="logOut" class="logout-btn">Log Out</v-btn>
      </ul>
    </nav>
  </div>  
</template>



<script setup>
import { RouterLink } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCompass, faBars, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import router from '@/router'
library.add(faCompass, faBars, faCalendarDays)

async function logOut() {
  signOut(auth)
    .then(() => {
      router.push({ name: 'LandingPage' })
    })
    .catch((error) => {
      console.log(error)
    })
}


</script>

<style scoped>

nav {
  background: var(--white-background-primary);
  border-right: 1px solid var(--light-grey-primary);
  width: var(--nav-bar-width);
  height: 100vh;
  position: fixed;
  top: var(--header-height);
  overflow: hidden;
  z-index: 100;
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
  padding-left: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.nav-icon {
  font-size: 23px;
}

.nav-item {
  font-size: 16px;
  font-weight: bold;
  margin-left: 12px;
}
a.active .nav-wrapper,
a.exact-active .nav-wrapper {
  background-color: var(--light-grey-primary);
}

.logout-btn {
  z-index: 100000;
}
</style>