import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    buyCar: [],
    currentPathArr: [],
    userSes: {
      userName: '',
      passWord: ''
    }
  },
  mutations: {
    buyCarFunc (state, data) {
      let carData = state.buyCar
      if (carData.length === 0) {
        state.buyCar.push(data)
      }
    },
    currentPathArrFunc (state, data) {
      state.currentPathArr = data
    },
    userSesFunc (state, data) {
      state.userSes = data
    }
  },
  actions: {},
  modules: {}
})
