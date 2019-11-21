const db = require('./connectDataBase');
let backData = {
  errcode: 0,
  data: {}
};
/**
 * 封装返回数据
 * errCode 错误编码 message 错误信息 res res
 */
let reqsBack = (errCode, message, res) => {
  res.end(
    JSON.stringify({
      errCode,
      message
    })
  );
};
exports.getBanner = (req, res) => {
  console.log('getBanner');

  let sql = 'select * from navgoodscategory';
  let categoryData = {};
  db.base(sql, {}, callback => {
    // console.log(callback)
    if (callback && callback.length > 0) {
      categoryData = callback;
      // console.log(categoryData)

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
  console.log(req.body);

  let objStr = JSON.stringify(req.body);
  if (objStr === '{}') {
    res.end(
      JSON.stringify({
        errCode: 1,
        message: '参数错误'
      })
    );
    return;
  }
  let sql = `select count(*) as total from userGoodsList where userName = '${req.body.userName} 'and artId = '${req.body.artId}'`;
  db.base(sql, {}, callback => {
    // 当前用户没有此商品就新增
    if (callback[0].total === 0) {
      let insertSql = `insert into userGoodsList set ?`;
      db.base(insertSql, req.body, insertBack => {
        if (insertBack) {
          res.end(
            JSON.stringify({
              errCode: 0,
              message: '已加入购物车'
            })
          );
        } else {
          res.end(
            JSON.stringify({
              errCode: 1,
              message: '插入失败'
            })
          );
        }
      });
    } else {
      // 如果有就更新数据
      let updateSql = `update userGoodsList set buyNum='${req.body.buyNum}' where artId = '${req.body.artId}' and userName = '${req.body.userName}'`;
      db.base(updateSql, {}, updateBack => {
        console.log(updateBack.affectedRows);

        if (updateBack.affectedRows !== 0) {
          res.end(
            JSON.stringify({
              errCode: 0,
              message: '更新成功'
            })
          );
        } else {
          res.end(
            JSON.stringify({
              errCode: 1,
              message: '更新失败'
            })
          );
        }
      });
    }
  });
};
// 获取购物车商品信息
exports.getUserCar = (req, res) => {
  let selectSql = `select * from usergoodslist where username = '${req.query.userName}'`;
  db.base(selectSql, {}, callback => {
    let goodsSes = [];
    if (callback && callback.length !== 0) {
      for (let i = 0; i < callback.length; i++) {
        let selectSql = `select * from goodsinfo where id = ${callback[i].artId}`;
        db.base(selectSql, {}, seleBack => {
          let obj = {
            title: seleBack[0].title,
            price: seleBack[0].sell_price,
            buyNum: callback[i].buyNum,
            totalPrice: callback[i].buyNum * seleBack[0].sell_price,
            artId: callback[i].artId,
            stock_quantity: seleBack[0].stock_quantity,
            choose: true
          };
          goodsSes.push(obj);
          if (i === callback.length - 1) {
            let backObj = {
              data: goodsSes,
              message: '信息获取成功'
            };
            reqsBack(0, backObj, res);
          }
        });
      }
    } else {
      reqsBack(0, '当前购物车为空', res);
    }
  });
};
