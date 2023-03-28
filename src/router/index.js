import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ItineraryView from '../views/ItineraryView.vue'
import ExploreView from '../views/ExploreView.vue'
import LandingPageView from '../views/LandingPageView.vue'
import { getCurrentUser } from '../firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPageView
    },
    {
      path: '/dashboard',
      name: 'DashboardPage',
      component: DashboardView,
    },
    {
      path: '/itinerary',
      name: 'ItineraryPage',
      component: ItineraryView
    },
    {
      path: '/explore',
      name: 'ExplorePage',
      component: ExploreView
    },

  ],
  linkActiveClass: 'active',
  linkExactActiveClass: "exact-active"
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
