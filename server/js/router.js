const express = require('express')
const router = express.Router()
const service = require('./serve')

// 获取轮播图数据
router.get('/getBanner', service.getBanner)
// 获取商品列表信息
router.get('/getGoodsSesson', service.getGoodsSesson)
// 获取商品详细信息
router.get('/getGoodsDetailSes', service.getGoodsDetailSes)
// 用户注册
/*
  {
    userName:'用户名',
    passWord:'密码',
    register:0/1    //0 登录 1注册
  }
*/

router.post('/register', service.register)

module.exports = router
