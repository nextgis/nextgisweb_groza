import Vue from 'vue'
import axios from 'axios'
import {NGW_LOGIN, NGW_WEB_MAP, IMAGE_ADAPTER_URL} from '../actions/ngw'
import qs from "qs"

const state = {}

const baseUrl = window.grozaConfig.ngwUrl

const http = axios.create({
  baseURL: baseUrl
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
  },
  [IMAGE_ADAPTER_URL]: ({commit, dispatch}) => {
    return `${baseUrl}/api/component/render/image`
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
