import Vue from 'vue'
import Router from 'vue-router'
import Monitoring from '@/components/views/Monitoring'
import History from '@/components/views/History'
import Login from '@/components/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Monitoring',
      component: Monitoring
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
