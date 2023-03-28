import { createApp } from 'vue'
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

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'


const vuetify = createVuetify({
  components,
  directives,
  VueDatePicker
})


// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Create Vue App
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(vuetify)
app.mount('#app')






