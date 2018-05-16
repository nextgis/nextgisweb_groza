// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill'
import 'vuetify/dist/vuetify.min.css'
import 'leaflet/dist/leaflet.css'
import VueSplitPane from 'vue-splitpane'
import moment from 'moment'
import formatcoords from 'formatcoords'

Vue.prototype.moment = moment
Vue.prototype.formatcoords = formatcoords

Vue.config.productionTip = false

Vue.component('split-pane', VueSplitPane);

Vue.use(Vuetify, {
  theme: {
    primary: '#016fc5'
  }
})

Vue.use(VueCookie)

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App />'
})
