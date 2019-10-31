import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/js/axios'
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.filter('dateFilter', function (num, icon, backStyle) {
  if (!num) return ''
  var now = new Date(num)
  var y = now.getFullYear()
  var m = now.getMonth() + 1
  var d = now.getDate()
  var h = now.getHours()
  var min = now.getMinutes()
  var s = now.getSeconds()
  // console.log(Hors, Min, Sec);

  var conngect = icon || '-'
  var backStyleV = backStyle || 'y-m-d'

  var returnDate = ''
  returnDate = `${y}${conngect}${m}${conngect}${d}`
  if (backStyleV === 'y-m-d-h-m') {
    returnDate += ` ${h}:${min}`
  } else if (backStyleV === 'y-m-d-h-m-s') {
    returnDate += ` ${h}:${min}:${s}`
  }
  return returnDate
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
