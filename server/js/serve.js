const db = require('./connectDataBase');
let backData = {
  errcode: 0,
  data: {}
};
/**
 * 封装返回数据的公共方法
 * errCode 错误编码 message 错误信息 res res backMes 自定义返回信息 不传使用默认值
 */
let reqsBack = (errCode, message, res, backMes) => {
  if (message === 'err') {
    res.end(
      JSON.stringify({
        errCode: 1,
        message: backMes || '请求失败！请稍后重试'
      })
    );
  } else if (message === 'success') {
    res.end(
      JSON.stringify({
        errCode: 0,
        message: backMes || '操作成功'
      })
    );
  } else {
    res.end(
      JSON.stringify({
        errCode,
        message
      })
    );
  }
};
exports.getBanner = (req, res) => {
  let sql = 'select * from navgoodscategory';
  let categoryData = {};
  db.base(sql, {}, callback => {
    if (callback && callback.length > 0) {
      categoryData = callback;
      categoryData.map((curr, i) => {
        let sqlData = `select * from navgoodslist where ?`;
        let data = { pid: curr.id };
        db.base(sqlData, data, resBack => {
          categoryData[i].subGoods = resBack;
          if (i === categoryData.length - 1) {
            backData.data.categoryData = categoryData;
            // res.end(JSON.stringify(backData))
            // 返回轮播图及商品列表数据
            let goodsSql = 'select * from navindexcategory';
            db.base(goodsSql, {}, callback => {
              backData.data.bannerData = [];
              callback.map(curGoods => {
                if (curGoods.isbanner === 1) {
                  backData.data.bannerData.push(curGoods);
                }
              });
              backData.data.goodsList = callback;
              res.end(JSON.stringify(backData));
            });
          }
        });
      });
    }
  });
};
// 获取商品列表
exports.getGoodsSesson = (req, res) => {
  let sql = 'select * from minGoodsCategory';
  db.base(sql, {}, callback => {
    if (callback) {
      callback.map((curr, index) => {
        curr.goodsList = [];
        let sqlList = `select * from mineGoodsList where parent_id = ${curr.level1cateid}`;
        db.base(sqlList, {}, backDataList => {
          curr.goodsList = backDataList;
          // 如果当前索引等于数组长度减一（数组最后一位的索引）就返回前端数据
          if (index === callback.length - 1) {
            let obj = {
              errcode: 0,
              data: callback
            };
            res.end(JSON.stringify(obj));
          }
        });
      });
    }
  });
};
// 获取商品详细信息
exports.getGoodsDetailSes = (req, res) => {
  // res.end(req.query.artid)
  console.log(!req.query.artid, 'dd');

  if (!req.query.artid || req.query.artid === 'undefined') {
    res.end(
      JSON.stringify({
        errCode: 1,
        message: '参数错误'
      })
    );
    return;
  }
  let sql = `select * from goodsinfo where id = ${req.query.artid}`;
  db.base(sql, {}, callback => {
    if (callback) {
      let obj = {
        errcode: 0,
        data: {
          goodsInfo: callback[0]
        }
      };
      let sqlImg = `select * from imgList where article_id = ${req.query.artid}`;
      db.base(sqlImg, {}, back => {
        obj.data.imgList = back;
        let rightListSql = `select * from minegoodslist `;
        // 详情右边的商品列表
        db.base(rightListSql, {}, resList => {
          obj.data.rightList = resList;
          res.end(JSON.stringify(obj));
        });
      });
    }
  });
};
// 用户注册
exports.register = (req, res) => {
  console.log(req.body);
  let selSql = `select count(*) as total from userinfo where userName = '${req.body.userName}'`;
  // 先查询数据库
  db.base(selSql, {}, callback => {
    // 如果未查询到信息
    if (callback[0].total === 0) {
      // 如果是注册未查询到信息就插入数据
      if (req.body.register === 1) {
        let sqlInsert = `insert into userinfo set userName = '${req.body.userName}',passWord = '${req.body.passWord}'`;
        db.base(sqlInsert, {}, insertBack => {
          if (insertBack.affectedRows === 1) {
            reqsBack(0, '注册成功', res);
          } else {
            reqsBack(1, '账号注册失败！', res);
          }
        });
      } else {
        // 如果是登录就返回错误信息
        reqsBack(1, '账号或密码输入错误', res);
      }
    } else {
      if (req.body.register === 0) {
        reqsBack(0, '登录成功！', res);
      } else {
        reqsBack(1, '当前账号已经注册！', res);
      }
    }
  });
};
// 保存用户购买商品
exports.addUserGoods = (req, res) => {
  let objStr = JSON.stringify(req.body);
  if (objStr === '{}') {
    reqsBack(1, 'err', res);
  }
  console.log(req.body);

  updateUserCar(req.body, res);
};
/**
 *  更新用户购物车方法封装
 * obj = {
 *  artTd,
 *  userName,
 *  buyNum
 * },
 * res:res
 * type:商品更新状态 没有传type则默认为更新 否则为删除
 * type:update/del
 */
let updateUserCar = (obj, res, type) => {
  // 先查找是否有商品信息
  let sql = `select * from userinfo where userName='${obj.userName}'`;
  db.base(sql, {}, callback => {
    if (!callback[0].goods_sesson) {
      let arr = [
        {
          art_id: obj.artId,
          buy_num: obj.buyNum
        }
      ];
      // 如果没有商品信息 就直接更新
      goodsInfoUpdate(arr, obj.userName, res);
    } else {
      // 如果查询到了商品信息
      let goodsSesson = JSON.parse(callback[0].goods_sesson);
      let hasGoods = false;
      goodsSesson.map((cur, index) => {
        // 如果没有type为更新 否则为删除
        if (cur.art_id === obj.artId) {
          if (!type) {
            // 如果有一样的商品 就更新购买数量
            cur.buy_num = obj.buyNum;
            hasGoods = true;
          } else {
            // 如果是删除就删除指定项
            goodsSesson.splice(index, 1);
          }
        }
      });
      // 如果没有找到商品就将当前商品push到数组
      if (!hasGoods && !type) {
        goodsSesson.push({
          art_id: obj.artId,
          buy_num: obj.buyNum
        });
      }

      goodsInfoUpdate(goodsSesson, obj.userName, res);
    }
  });
};
// 封装更新商品信息的公共方法
let goodsInfoUpdate = (arr, userName, res) => {
  arr = JSON.stringify(arr);
  let insertSql = `update userinfo set goods_sesson = '${arr}' where username='${userName}'`;
  db.base(insertSql, {}, insertBack => {
    if (insertBack.affectedRows === 1) {
      reqsBack(0, 'success', res);
    } else {
      reqsBack(1, 'err', res, '添加失败！请稍后重试');
    }
  });
};
// 获取购物车商品信息
exports.getUserCar = (req, res) => {
  // 首先查询到当前用户的商品信息
  let selectUser = `select goods_sesson from userinfo where username = '${req.query.userName}'`;
  db.base(selectUser, {}, selBack => {
    if (!selBack) {
      reqsBack(0, 'err', res);
      return;
    }
    if (selBack[0].goods_sesson) {
      let arr = JSON.parse(selBack[0].goods_sesson);
      if (arr.length) {
        let backarr = [];
        arr.map((cur, index) => {
          // 根据商品id获取商品信息
          let sql = `select * from goodsinfo where id = ${cur.art_id}`;
          db.base(sql, {}, callback => {
            // console.log(callback);
            if (callback) {
              let obj = {
                title: callback[0].title,
                price: callback[0].sell_price,
                buyNum: cur.buy_num,
                totalPrice: cur.buy_num * callback[0].sell_price,
                artId: cur.art_id,
                stock_quantity: callback[0].stock_quantity,
                choose: true
              };
              backarr.push(obj);
              // 如果当前id等于数组的最后一位的索引就返回信息
              if (index === arr.length - 1) {
                let backObj = {
                  data: backarr,
                  message: '信息获取成功'
                };
                reqsBack(0, backObj, res);
              }
            }
          });
        });
      } else {
        reqsBack(0, 'success', res, '购物车为空');
      }
    } else {
      reqsBack(1, 'err', res, '数据获取失败');
    }
  });
};
// 删除购物车商品
exports.delectCarGoods = (req, res) => {
  if (!req.query.artId || !req.query.userName) {
    reqsBack(1, 'err', res);
    return;
  }
  req.query.artId = parseFloat(req.query.artId);
  updateUserCar(req.query, res, 'del');
};
