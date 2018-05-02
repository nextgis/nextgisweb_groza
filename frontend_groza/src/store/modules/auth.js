import VueCookies from 'vue-cookie'
import {AUTH_ERROR, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS} from '../actions/auth'
import {USER_REQUEST} from '../actions/user'
import {NGW_LOGIN} from '../actions/ngw'

const state = {
  tktCookie: VueCookies.get('tkt') || '',
  status: '',
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      dispatch(NGW_LOGIN, user)
        .then(resp => {
          if (resp.data.login === true) {
            commit(AUTH_SUCCESS)
            dispatch(USER_REQUEST)
            resolve(true)
          } else {
            VueCookie.remove('tkt')
            resolve(false)
          }
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          VueCookie.remove('tkt')
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      VueCookie.remove('tkt')
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state) => {
    state.status = 'success'
    state.tktCookie = VueCookies.get('tkt')
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.tktCookie = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
