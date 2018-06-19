import axios from 'axios'
import {IMAGE_ADAPTER_URL, NGW_GET_EVENTS, NGW_LOGIN, NGW_WEB_MAP, GET_NGW_TILE_ADAPTER_URL} from '../actions/ngw'
import qs from 'qs'

const state = {}

const baseUrl = window.grozaConfig.ngwUrl

const http = axios.create({
  baseURL: baseUrl
})

const getters = {}

const actions = {
  [NGW_LOGIN]: ({commit, dispatch}, user) => {
    return http.post('/api/groza/login', qs.stringify(user))
  },
  [NGW_WEB_MAP]: ({commit, dispatch}) => {
    const webmapId = window.grozaConfig.settings.web_map
    return http.get(`/api/groza/webmap/${webmapId}/`)
  },
  [IMAGE_ADAPTER_URL]: ({commit, dispatch}) => {
    const baseUrl = http.defaults.baseURL
    return `${baseUrl}/api/component/render/image`
  },
  [GET_NGW_TILE_ADAPTER_URL]: ({commit, dispatch}) => {
    const baseUrl = http.defaults.baseURL
    return `${baseUrl}/api/component/render/tile?z={z}&x={x}&y={y}&resource={stylesId}`
  },
  [NGW_GET_EVENTS]: ({commit, dispatch}, params) => {
    return http.get(`/api/groza/events/`, {
      params: params
    })
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations,
}
