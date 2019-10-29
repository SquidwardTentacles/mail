const db = require('./connectDataBase')
let backData = {
  errcode: 0,
  data: {}
}
exports.getBanner = (req, res) => {
  let sql = 'select * from goodscategory'
  let categoryData = {}
  db.base(sql, {}, callback => {
    // console.log(callback)
    if (callback && callback.length > 0) {
      categoryData = callback
      // console.log(categoryData)

      categoryData.map((curr, i) => {
        let sqlData = `select * from goodslist where ?`
        let data = { pid: curr.id }
        db.base(sqlData, data, resBack => {
          categoryData[i].subGoods = resBack
          if (i === categoryData.length - 1) {
            backData.data.categoryData = categoryData
            // res.end(JSON.stringify(backData))
            // 返回轮播图及商品列表数据
            let goodsSql = 'select * from indexcategory'
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
