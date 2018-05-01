// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill'
import 'vuetify/dist/vuetify.min.css'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#016fc5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App />'
})
