const express = require('express')
const router = express.Router()
const service = require('./serve')

// 获取轮播图数据
router.get('/getBanner', service.getBanner)
// 获取商品列表信息
router.get('/getGoodsSesson', service.getGoodsSesson)

module.exports = router
