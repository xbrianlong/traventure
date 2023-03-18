import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ItineraryView from '../views/ItineraryView.vue'
import ExploreView from '../views/ExploreView.vue'
import WishlistView from '../views/WishlistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/itinerary',
      name: 'itinerary',
      component: ItineraryView
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistView
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: "exact-active"
})

export default router
