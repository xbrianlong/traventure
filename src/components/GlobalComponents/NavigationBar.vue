<template>
  <div>
    <nav>
      <ul>
        <RouterLink :to="`/itinerary/${props.placeId}`">
          <div class="nav-wrapper">
            <li>
              <font-awesome-icon icon="fa-solid fa-calendar-days" class="nav-icon" />
              <span class="nav-item">Itinerary</span>
            </li>
          </div>
        </RouterLink>

        <RouterLink :to="`/explore/${props.placeId}`">
          <div class="nav-wrapper">
            <li>
              <font-awesome-icon icon="fa-solid fa-compass" class="nav-icon" />
              <span class="nav-item">Explore</span>
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
import { faCompass, faBars, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

library.add(faCompass, faBars, faCalendarDays)

const props = defineProps(['placeId'])
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
</style>
