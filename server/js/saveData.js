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
  // {
  //   url:'http://47.106.148.205:8899/site/goods/getgoodsinfo/',
  //   type:'goodsListDetail'
  // }
]
// 获取商品详细信息 结尾直接加上商品id(不用键值)
let getGoodsDetailUrl = 'http://47.106.148.205:8899/site/goods/getgoodsinfo/'
exports.saveData = () => {
  // return
  https = (url, type) => {
    http.get(url, data => {
      let backData = ''
      data.on('data', chunk => {
        backData += chunk
      })
      data.on('end', () => {
        saveData(backData, type)
      })
    })
  }
  for (let i = 0; i < httpArr.length; i++) {
    https(httpArr[i].url, httpArr[i].type)
  }
  saveData = (data, type) => {
    data = JSON.parse(data)
    if (data.status === 0) {
      if (type === 'navbar') {
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
          dataBaseFunc('navgoodsCategory', goodsCateSetData)
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
              dataBaseFunc('navgoodsList', goodsList)
            })
          }
        })
        goodsListData(data.message.toplist, 0)
        goodsListData(data.message.sliderlist, 1)
      } else if (type === 'goodsList') {
        // 主要的商品列表信息
        let minGoodsListData = data.message
        let minGoodsCate = {}
        let minGoodsList = {}
        minGoodsListData.map(curData => {
          minGoodsCate = {
            level1cateid: curData.level1cateid,
            catetitle: curData.catetitle
          }
          dataBaseFunc(
            'minGoodsCategory',
            minGoodsCate,
            curData.level1cateid,
            'level1cateid'
          )
          if (curData.datas && curData.datas.length > 0) {
            curData.datas.map(minGoodsData => {
              minGoodsList = {
                add_time: minGoodsData.add_time,
                artID: minGoodsData.artID,
                artTitle: minGoodsData.artTitle,
                cateID: minGoodsData.cateID,
                cateTitle: minGoodsData.cateTitle,
                class_layer: minGoodsData.class_layer,
                img_url: minGoodsData.img_url,
                market_price: minGoodsData.market_price,
                parentTitle: minGoodsData.parentTitle,
                parent_id: minGoodsData.parent_id,
                sell_price: minGoodsData.sell_price,
                stock_quantity: minGoodsData.stock_quantity
              }
              dataBaseFunc(
                'mineGoodsList',
                minGoodsList,
                minGoodsData.artID,
                'artID'
              )
              // 根据id获取商品详细信息
              let goodsInfoUrl = getGoodsDetailUrl
              goodsInfoUrl += minGoodsData.artID
              https(goodsInfoUrl, 'goodsDetail')
            })
          }
        })
      } else if (type === 'goodsDetail') {
        // console.log(data)
        let infoArr = data.message.goodsinfo
        console.log(typeof infoArr)

        let obj = {
          // add_time: infoArr.add_time ? infoArr.add_time : new Date(),
          category_id: infoArr.category_id,
          channel_id: infoArr.channel_id,
          click: infoArr.click,
          content: infoArr.content,
          goods_no: infoArr.goods_no,
          id: infoArr.id,
          img_url: infoArr.img_url,
          is_hot: infoArr.is_hot,
          is_msg: infoArr.is_msg,
          is_red: infoArr.is_red,
          is_slide: infoArr.is_slide,
          is_sys: infoArr.is_sys,
          is_top: infoArr.is_top,
          link_url: infoArr.link_url,
          market_price: infoArr.market_price,
          point: infoArr.point,
          sell_price: infoArr.sell_price,
          sort_id: infoArr.sort_id,
          status: infoArr.status,
          stock_quantity: infoArr.stock_quantity,
          sub_title: infoArr.sub_title,
          title: infoArr.title,
          update_time: infoArr.update_time,
          user_name: infoArr.user_name,
          zhaiyao: infoArr.zhaiyao
        }
        dataBaseFunc('goodsinfo', obj)
      }
    } else {
      console.log('请求错误')
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
      dataBaseFunc('navindexcategory', indexGoodsData)
    })
  }
  // 向数据库添加数据方法封装 参数1 表名 参数2 数据内容 3 id的值 4 id的字段名称
  dataBaseFunc = (dataBaseName, data, id = data.id, idName = 'id') => {
    let selectSql = `select count(*) as total from ${dataBaseName} where ${idName}=?`
    db.base(selectSql, id, callback => {
      if (callback[0].total === 0) {
        let goodsCateSetSql = `insert into ${dataBaseName} set ?`
        db.base(goodsCateSetSql, data, callback => {
          if (callback.affectedRows === 1) console.log('成功')
        })
      } else {
        console.log('已有数据' + id + '表名：' + dataBaseName)
      }
    })
  }
}
