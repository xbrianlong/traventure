import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '../views/LandingPageView.vue'
import AboutView from '../views/AboutView.vue'
import DashboardView from '../views/DashboardView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getCurrentUser } from '../firebase'

const auth = getAuth()

// Auth guard
/* const requireAuth = (to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      next({ name: 'LandingPage' })
      return
    } else {
      next()
      return
    }
  })
} */

// Landing page access to users
/* const redirectToDashboard = (to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      next({ name: 'Dashboard' })
      return
    } else {
      next()
      return
    }
  })
} */

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
