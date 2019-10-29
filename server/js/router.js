const express = require('express')
const router = express.Router()
const service = require('./serve')

// 获取轮播图数据
router.get('/getBanner', service.getBanner)

module.exports = router
