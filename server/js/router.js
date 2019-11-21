const express = require('express');
const router = express.Router();
const service = require('./serve');

// 获取轮播图数据
router.get('/getBanner', service.getBanner);
// 获取商品列表信息
router.get('/getGoodsSesson', service.getGoodsSesson);
// 获取商品详细信息
router.get('/getGoodsDetailSes', service.getGoodsDetailSes);
// 用户注册
/*
  {
    userName:'用户名',
    passWord:'密码',
    register:0/1    //0 登录 1注册
  }
*/
router.post('/register', service.register);
/**
 * 保存用户购买的商品信息
 * {
 *  userName：‘用户名’，
 *  buyNum:'购买数量',
 *  artId:'商品id'
 * }
 */
router.post('/addUserGoods', service.addUserGoods);
/**
 * 获取当把用户下的购物车信息
 * {
 *  userName:userName
 * }
 */
router.get('/getUserCar', service.getUserCar);
module.exports = router;
