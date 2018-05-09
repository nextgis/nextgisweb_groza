import Vue from 'vue'
import Router from 'vue-router'
import Monitoring from '@/components/views/Monitoring'
import History from '@/components/views/History'
import Login from '@/components/views/Login'
import store from '../store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  if (!isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  if (isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Monitoring',
      component: Monitoring,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/history',
      name: 'History',
      component: History,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    }
  ]
})
