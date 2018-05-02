import Vue from 'vue'
import axios from 'axios'
import {NGW_LOGIN} from '../actions/ngw'
import qs from "qs"

const state = {}

const http = axios.create({
  baseURL: window.grozaConfig.ngwUrl
})

const getters = {

}

const actions = {
  [NGW_LOGIN]: ({commit, dispatch}, user) => {
    return http.post('/groza/login', qs.stringify(user))
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
