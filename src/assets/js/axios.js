import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'element-ui'
// 引入网站访问基地址
import baseAddress from '../../../server/js/baseAddress'
// axios.defaults.baseURL = 'http://192.168.1.14:3000'
// axios.defaults.baseURL = 'http://127.0.0.1:3000'
// loading加载
let loadingInstance = ''
axios.defaults.baseURL = baseAddress.option.domainName + baseAddress.option.port
Vue.prototype.axios = axios
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 显示loading框
    loadingInstance = Loading.service()
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    loadingInstance.close()
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    loadingInstance.close()
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
