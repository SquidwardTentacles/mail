import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

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
        component: () => import('../views/buyCar.vue'),
        meta: { userLogin: true }
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

router.beforeEach((to, from, next) => {
  // 存储路由数据
  let obj = {
    path: from.path ? (from.path === '/login' ? '/' : from.path) : '/',
    query: from.query
  }
  store.commit('fromPathFunc', obj)
  if (to.meta.userLogin) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.userSes.userName) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
