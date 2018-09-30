import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate';

import authentication from './authentication';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  modules: {
    authentication,
  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    createPersistedState(),
  ]
})
