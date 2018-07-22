import axios from 'axios'
import {
  GET_NGW_TILE_ADAPTER_URL,
  IMAGE_ADAPTER_URL,
  NGW_GET_EVENTS,
  NGW_GET_ZONES,
  NGW_LOGIN,
  NGW_WEB_MAP
} from '../actions/ngw'
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
  },
  [NGW_GET_ZONES]: ({commit, dispatch}, params) => {
    const zoneFirst = window.grozaConfig.settings.zone_1_class
    const zoneSecond = window.grozaConfig.settings.zone_2_class
    const zoneThird = window.grozaConfig.settings.zone_3_class

    if (!zoneFirst || !zoneSecond || !zoneThird) return null

    return axios.all([
      axios.get(`${baseUrl}/api/resource/${zoneFirst}/feature/`),
      axios.get(`${baseUrl}/api/resource/${zoneSecond}/feature/`),
      axios.get(`${baseUrl}/api/resource/${zoneThird}/feature/`),
    ])
  },
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations,
}
