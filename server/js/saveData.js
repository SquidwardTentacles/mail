const http = require('http')
const db = require('./connectDataBase')

let saveData
let dataBaseFunc
let goodsListData
let https
let httpArr = [
  {
    // 获取轮播图数据
    url: 'http://47.106.148.205:8899/site/goods/gettopdata/goods',
    type: 'navbar'
  },
  {
    // 获取商品列表数据
    url: 'http://47.106.148.205:8899/site/goods/getgoodsgroup',
    type: 'goodsList'
  }
]
exports.saveData = () => {
  // return
  https = url => {
    http.get(url, data => {
      let backData = ''
      data.on('data', chunk => {
        backData += chunk
      })
      data.on('end', () => {
        saveData(backData)
      })
    })
  }
  for (let i = 0; i < httpArr.length; i++) {
    https(httpArr[i.url])
  }
  saveData = data => {
    data = JSON.parse(data)
    if (data.status === 0) {
      let catelistData = data.message.catelist
      // 商品分类数据
      let goodsCateSetData = {}
      // 商品列表数据
      let goodsList = {}
      catelistData.map(current => {
        // 商品分类数据存储
        goodsCateSetData = {
          id: current.id,
          pid: current.pid,
          class_layer: current.class_layer,
          title: current.title
        }
        dataBaseFunc('goodsCategory', goodsCateSetData)
        // 商品列表

        if (current.subcates && current.subcates.length !== 0) {
          current.subcates.map(curData => {
            goodsList = {
              id: curData.id,
              pid: curData.pid,
              class_layer: curData.class_layer,
              title: curData.title,
              subcates: JSON.stringify(curData.subcates)
            }
            dataBaseFunc('goodsList', goodsList)
          })
        }
      })
      goodsListData(data.message.toplist, 0)
      goodsListData(data.message.sliderlist, 1)
    }
  }
  goodsListData = (data, id) => {
    // 通过id判断是否为轮播图数据
    // let indexGoodsList = data.message.toplist
    let indexGoodsData = []
    data.map((curList, i) => {
      indexGoodsData = {
        id: curList.id,
        isbanner: id,
        category_id: curList.category_id,
        title: curList.title,
        add_time: curList.add_time,
        img_url: curList.img_url,
        is_slide: curList.is_slide,
        is_top: curList.is_top,
        is_hot: curList.is_hot
      }
      dataBaseFunc('indexcategory', indexGoodsData)
    })
  }
  dataBaseFunc = (dataBaseName, data) => {
    let selectSql = `select count(*) as total from ${dataBaseName} where id=?`
    db.base(selectSql, data.id, callback => {
      if (callback[0].total === 0) {
        console.log(data[0])

        let goodsCateSetSql = `insert into ${dataBaseName} set ?`
        db.base(goodsCateSetSql, data, callback => {
          if (callback.affectedRows === 1) console.log('成功')
        })
      } else {
        console.log('已有数据' + data.id)
      }
    })
  }
}
