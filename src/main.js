import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VuetifyUseDialog from 'vuetify-use-dialog'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  VueDatePicker
})

// Create a new store instance
const store = createStore({
  state() {
    return {
      mapRef: null,
      locationCardData: {},
      showLocationCard: false,
      tempMarker: null
    }
  },
  mutations: {
    uploadExploreData(state, payload) {
      state.exploreData[payload.category] = payload.data
    },
    updateMapRef(state, newMapRef) {
      state.mapRef = newMapRef
    },
    showLocationCard(state) {
      state.showLocationCard = true
    },
    closeLocationCard(state) {
      state.showLocationCard = false
    },
    addTempMarker(state, marker) {
      state.tempMarker = marker
    }
  },
  getters: {
    getMapRef(state) {
      return state.mapRef
    },
    getLocationCardStatus(state) {
      return state.showLocationCard
    },
    getLocationCardData(state) {
      return state.locationCardData
    },
    getTempMarker(state) {
      return state.tempMarker
    }
  }
})

// Create Vue App
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VueDatePicker', VueDatePicker)
app.use(router)
app.use(vuetify)
app.use(VuetifyUseDialog)
app.use(store)
app.mount('#app')
