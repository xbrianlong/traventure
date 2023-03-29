import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '../views/LandingPageView.vue'
import AboutView from '../views/AboutView.vue'
import DashboardView from '../views/DashboardView.vue'
import { getCurrentUser } from '../firebase'
import ItineraryView from '../views/ItineraryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPageView
      //beforeEnter: redirectToDashboard
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
      //beforeEnter: requireAuth
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView
      //beforeEnter: requireAuth //route guard
    },
    {
      path: '/itinerary',
      name: 'itinerary',
      component: ItineraryView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser()
  if (!user && to.name !== 'LandingPage') {
    next({ name: 'LandingPage' })
    return
  } else if (user && to.name == 'LandingPage') {
    next({ name: 'Dashboard' })
    return
  } else {
    next()
    return
  }
})

export default router
