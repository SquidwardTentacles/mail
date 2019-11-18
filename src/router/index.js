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
        name: '购物商城',
        component: () => import('../views/goodsList.vue')
      },
      {
        path: '/goodsInfo',
        name: '商品详情',
        component: () => import('../views/goodsInfo.vue')
      },
      {
        path: '/buyCar',
        name: '购物车',
        component: () => import('../views/buyCar.vue')
      },
      {
        path: '/login',
        name: '登录/注册',
        component: () => import('../views/login.vue')
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
