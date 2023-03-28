import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ItineraryView from '../views/ItineraryView.vue'
import ExploreView from '../views/ExploreView.vue'
import WishlistView from '../views/WishlistView.vue'
import LandingPageView from '../views/LandingPageView.vue'
import { auth } from '../firebase'

// Auth guard
const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'LandingPage' })
  } else {
    next()
  }
}

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
      beforeEnter: requireAuth //route guard
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
    {
      path: '/wishlist',
      name: 'WishlistPage',
      component: WishlistView,
    },

  ],
  linkActiveClass: 'active',
  linkExactActiveClass: "exact-active"
})

export default router
