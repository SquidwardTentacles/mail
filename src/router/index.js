import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue'),
    children: [
      {
        path: '/',
        name: 'goodslist',
        component: () => import('../views/goodsList.vue')
      },
      {
        path: '/goodsInfo',
        name: 'goodsInfo',
        component: () => import('../views/goodsInfo.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
