const db = require('./connectDataBase')
let backData = {
  errcode: 0,
  data: {}
}
exports.getBanner = (req, res) => {
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
        let sqlList = `select * from mineGoodsList where parent_id = ${
          curr.level1cateid
        }`
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
