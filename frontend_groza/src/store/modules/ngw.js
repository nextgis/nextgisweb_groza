import Vue from 'vue'
import axios from 'axios'
import {NGW_LOGIN, NGW_WEB_MAP} from '../actions/ngw'
import qs from "qs"

const state = {}

const http = axios.create({
  baseURL: window.grozaConfig.ngwUrl
})

const getters = {

}

const actions = {
  [NGW_LOGIN]: ({commit, dispatch}, user) => {
    return http.post('/api/groza/login', qs.stringify(user))
  },
  [NGW_WEB_MAP]: ({commit, dispatch}) => {
    const webmapId = window.grozaConfig.settings.web_map
    return http.get(`/api/groza/webmap/${webmapId}/`)
  }
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations,
}
