const db = require('./connectDataBase')
let backData = {
  errcode: 0,
  data: {}
}
// 声明一个先查找再存储数据库的方法
/*
selectData = {
sql:要查询的sql语句,
dataBase:要操作的表名
}
selectData = {
  selectData：要查询的数据，
  dataBase:要操作的表名
}
*/
let ifInsert = (selectData, insertData, res) => {
  let backobj = {}
  let selectSql = ''
  let selectDa = {}
  if (!selectData.sql) {
    selectSql = `select count(*) as total from ${selectData.dataBase} where id = ?`
    selectDa = selectData.selectData
  } else {
    selectSql = selectData.sql
    selectDa = {}
  }
  // 插入数据前先查看是否有数据
  db.base(selectSql, selectDa, callback => {
    if (callback[0].total === 0) {
      // 如果这个参数等于1便是注册 0为登录
      if (insertData.register === 1) {
        let obj = {
          userName: insertData.userName,
          passWord: insertData.passWord
        }
        let insertSql = `insert into ${selectData.dataBase} set ?`
        db.base(insertSql, obj, back => {
          console.log(back.affectedRows)

          if (back.affectedRows === 1) {
            backobj = {
              errCode: 0,
              message: '新增成功'
            }
            res.end(JSON.stringify(backobj))
          } else {
            backobj = {
              errCode: 1,
              message: '新增失败'
            }
            res.end(JSON.stringify(backobj))
          }
        })
      }
    } else {
      backobj = {
        errCode: insertData.register,
        message: insertData.register === 1 ? '数据已经存在' : '登录成功！'
      }
    }
    res.end(JSON.stringify(backobj))
  })
}
exports.getBanner = (req, res) => {
  console.log('getBanner')

  let sql = 'select * from navgoodscategory'
  let categoryData = {}
  db.base(sql, {}, callback => {
    // console.log(callback)
    if (callback && callback.length > 0) {
      categoryData = callback
      // console.log(categoryData)

      categoryData.map((curr, i) => {
        let sqlData = `select * from navgoodslist where ?`
        let data = { pid: curr.id }
        db.base(sqlData, data, resBack => {
          categoryData[i].subGoods = resBack
          if (i === categoryData.length - 1) {
            backData.data.categoryData = categoryData
            // res.end(JSON.stringify(backData))
            // 返回轮播图及商品列表数据
            let goodsSql = 'select * from navindexcategory'
            db.base(goodsSql, {}, callback => {
              backData.data.bannerData = []
              callback.map(curGoods => {
                if (curGoods.isbanner === 1) {
                  backData.data.bannerData.push(curGoods)
                }
              })
              backData.data.goodsList = callback
              res.end(JSON.stringify(backData))
            })
          }
        })
      })
    }
  })
}
// 获取商品列表
exports.getGoodsSesson = (req, res) => {
  let sql = 'select * from minGoodsCategory'
  db.base(sql, {}, callback => {
    if (callback) {
      callback.map((curr, index) => {
        curr.goodsList = []
        let sqlList = `select * from mineGoodsList where parent_id = ${curr.level1cateid}`
        db.base(sqlList, {}, backDataList => {
          curr.goodsList = backDataList
          // 如果当前索引等于数组长度减一（数组最后一位的索引）就返回前端数据
          if (index === callback.length - 1) {
            let obj = {
              errcode: 0,
              data: callback
            }
            res.end(JSON.stringify(obj))
          }
        })
      })
    }
  })
}
// 获取商品详细信息
exports.getGoodsDetailSes = (req, res) => {
  // res.end(req.query.artid)
  let sql = `select * from goodsinfo where id = ${req.query.artid}`
  db.base(sql, {}, callback => {
    if (callback) {
      let obj = {
        errcode: 0,
        data: {
          goodsInfo: callback[0]
        }
      }
      let sqlImg = `select * from imgList where article_id = ${req.query.artid}`
      db.base(sqlImg, {}, back => {
        obj.data.imgList = back
        let rightListSql = `select * from minegoodslist `
        // 详情右边的商品列表
        db.base(rightListSql, {}, resList => {
          obj.data.rightList = resList
          res.end(JSON.stringify(obj))
        })
      })
    }
  })
}
// 用户注册
exports.register = (req, res) => {
  console.log(req.body)
  let selectArr = {
    sql: `select count(*) as total from userInfo where userName = ${req.body.userName} and passWord = ${req.body.passWord}`,
    dataBase: 'userInfo'
  }
  ifInsert(selectArr, req.body, res)
}
