import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    buyCar: [],
    currentPathArr: [],
    // 保存用户的登录信息
    userSes: {
      userName: '',
      passWord: ''
    },
    // 保存进入登录页面之前的页面路由
    fromPath: {
      path: '/',
      query: {}
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
      sessionStorage.setItem('userSesson', JSON.stringify(data))
    },
    fromPathFunc (state, data) {
      state.fromPath = data
    },
    carPathFunc (state, data) {
      state.carPath = data
    }
  },
  actions: {},
  modules: {},
  getters: {
    userSessonG: state => {
      let fPath = sessionStorage.getItem('userSesson')
      if (fPath) {
        state.userSes = JSON.parse(fPath)
      }
    }
  }
})
