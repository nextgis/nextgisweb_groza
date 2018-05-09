import VueCookies from 'vue-cookie'
import {AUTH_ERROR, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS} from '../actions/auth'
import {USER_REQUEST} from '../actions/user'
import {NGW_LOGIN} from '../actions/ngw'

const AUTH_RESULT_COOKIE = 'groza'

const state = {
  authCookie: VueCookies.get(AUTH_RESULT_COOKIE) === 'true' || false,
  status: '',
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: () => {
    return state.authCookie
  },
  authStatus: () => {
    return state.status
  }
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
            VueCookies.delete(AUTH_RESULT_COOKIE)
            resolve(false)
          }
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          VueCookies.delete(AUTH_RESULT_COOKIE)
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      VueCookies.delete(AUTH_RESULT_COOKIE)
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
    VueCookies.set(AUTH_RESULT_COOKIE, true);
    state.authCookie = true;
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    VueCookies.delete(AUTH_RESULT_COOKIE)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
