<template>
  <div class="goods-info">
    <!-- <p class="path-detail width">当前位置：<router-link to="/">首页 > </router-link>
      <router-link to="/">购物商城</router-link> > 商品详情
    </p> -->
    <div class="flexbox between outer-box width">
      <div class="left-box"
           ref="leftBox">
        <div class="detail-box">
          <div class="buy-goods">
            <div class="img-box"
                 v-if="show">
              <sefMagnifier :goodsBoxWidth="goodsBoxWidth"
                            :magnifierImgArr="imgList"
                            :reload="reload"></sefMagnifier>
            </div>
            <div class="right-detail-message flexbox">
              <div>
                <div class="title">
                  <p>{{goodsInfo.sub_title}}</p>
                  <span class="label">{{goodsInfo.zhaiyao}}</span>
                </div>
                <div>
                  <span class="label">货号：</span>
                  <span class="content">SD7159810321</span>
                </div>
                <div>
                  <span class="label">市场价：</span>
                  <del><span class="content">5000</span></del>
                </div>
                <div>
                  <span class="label">销售价：</span>
                  <span class="now-price">￥4000</span>
                </div>
                <div class="flexbox j-start buy-num">
                  <span class="label">购买数量：</span>
                  <p><span class="add-icon one"
                          @click="numReduce">-</span> <span class="num">{{buyNum}}</span> <span class="add-icon two"
                          @click="numAdd(goodsInfo.stock_quantity)">+</span></p>
                </div>
                <div class="flexbox j-start buy-num">
                  <span class="label">库存：</span>
                  <span>{{goodsInfo.stock_quantity}} 件</span>
                </div>
              </div>
              <div class="flexbox j-start btn">
                <div class="buy">
                  立即购买
                </div>
                <div class="add-car">
                  加入购物车
                </div>
              </div>
            </div>
          </div>
          <div v-html="goodsDataArr.content"
               class="goods-ses-show width"></div>
        </div>
      </div>
      <div class="right-box">
        <p class="right-goods-title">推荐商品</p>
        <div class="right-goods-list"
             v-for="(item, index) in rightListArr"
             :key="index">
          <div class=" flexbox j-start"
               @click="initData(item.artID)">
            <div class="img-boxr">
              <img :src="item.img_url"
                   alt="">
            </div>
            <div class="text-box">
              <p>{{item.artTitle}}</p>
              <span>{{item.add_time | dateFilter}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import sefMagnifier from '../components/selfMagnifier'
import pathMixins from '../assets/js/mixin/path'
export default {
  mixins: [pathMixins],
  components: {
    sefMagnifier
  },
  data () {
    return {
      goodsDataArr: [],
      imgList: {
        showImg: [],
        magnifier: []
      },
      show: false,
      goodsBoxWidth: '',
      rightListArr: [],
      reload: 0,
      goodsInfo: {},
      // 购买数量
      buyNum: 1,
      loading: ''
    }
  },
  mounted () {
    // 获取到商品展示区域盒子的宽高
    this.goodsBoxWidth = this.$refs.leftBox.offsetWidth
    this.initData(this.$route.query.artid)
  },
  methods: {
    initData (id) {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.axios.get(`/getGoodsDetailSes?artid=${id}`).then(res => {
        if (res.errcode === 0) {
          this.reload = 1
          this.goodsDataArr = res.data.goodsInfo
          let imgList = res.data.imgList
          // 拼接商品图片信息
          this.imgList = {
            showImg: [],
            magnifier: []
          }
          // 清空数组
          imgList.map((cur, index) => {
            let obj = {
              id: index,
              src: cur.original_path
            }
            this.imgList.showImg.push(obj)
            let largeUrl = {
              id: index,
              src: cur.thumb_path
            }
            this.imgList.magnifier.push(largeUrl)
            this.reload = 0
          })
          this.show = true
          // 右边列表
          this.rightListArr = res.data.rightList
          this.goodsInfo = res.data.goodsInfo
          this.loading.close()
        }
      })
    },
    // 购买数量加减
    numReduce () {
      if (this.buyNum > 1) {
        this.buyNum--
      } else {
        this.buyNum = 1
      }
    },
    numAdd (num) {
      if (this.buyNum < num) {
        this.buyNum++
      } else {
        this.buyNum = num
      }
    }
  }
}
</script>
<style lang="less" scoped>
.goods-info {
  background-color: #f5f5f5;

  .outer-box {
    align-items: flex-start;
    .left-box {
      width: 80%;
      background-color: #fff;
      padding: 10px;
      box-sizing: border-box;
      .detail-box {
        .buy-goods {
          width: 100%;
          height: 350px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-basis: 800px;
          .img-box {
            width: 300px;
            height: 100%;
            img {
              width: 250px;
              height: 100%;
            }
          }
          .right-detail-message {
            font-size: 12px;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
            width: calc(100% - 250px);
            flex-direction: column;
            justify-content: space-between;
            .btn {
              div {
                padding: 8px 30px;
                margin-right: 10px;
                background-color: #ffe4d0;
                font-size: 16px;
                font-weight: bold;
                color: #ff4400;
                cursor: pointer;
                &.add-car {
                  background-color: #ff4400;
                  color: #fff;
                }
              }
            }
            div {
              margin-bottom: 10px;
              vertical-align: middle;
              &.buy-num {
                // 禁止浏览器选中文字
                moz-user-select: -moz-none;
                -moz-user-select: none;
                -o-user-select: none;
                -khtml-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                p {
                  border: 1px solid #dcdfe6;
                  border-radius: 5px;
                  span {
                    vertical-align: middle;
                    display: inline-block;
                    text-align: center;
                    line-height: 30px;
                    height: 30px;
                    &.add-icon {
                      width: 27px;
                      height: 30px;
                      background-color: #f5f7fa;
                      font-size: 16px;
                      cursor: pointer;
                      &.one {
                        border-right: 1px solid #dcdfe6;
                      }
                      &.two {
                        border-left: 1px solid #dcdfe6;
                      }
                    }
                    &.num {
                      width: 60px;
                    }
                  }
                }
              }
              .now-price {
                margin-right: 5px;
                color: #f40;
                font-size: 24px;
                font-weight: 700;
                // font-style: normal;
              }
            }
            .title {
              margin-bottom: 10px;
              p {
                color: #555;
                line-height: 1.1em;
                font-size: 18px;
                margin-bottom: 5px;
              }
              .label {
                font-size: 14px;
                margin: 0;
              }
            }
            .label {
              color: #888;
              margin-right: 10px;
            }
          }
        }
      }
    }
    .right-box {
      padding: 10px;
      box-sizing: border-box;
      background-color: #fff;
      width: 18%;
      .right-goods-title {
        margin: 0;
        padding: 0 0 5px 5px;
        border-bottom: 1px solid #e0e0e0;
        color: #333;
        font-size: 16px;
        font-weight: 300;
        line-height: 20px;
      }
      .right-goods-list {
        width: 100%;
        padding: 5px;
        box-sizing: border-box;
        font-size: 12px;
        margin-bottom: 5px;
        .img-boxr {
          padding: 5px;
          margin: 0 5px;
          box-sizing: border-box;
          border: 1px solid #ebebeb;
          img {
            display: inline-block;
            width: 50px;
            height: 50px;
          }
        }
        .text-box {
          line-height: 20px;
          p {
            color: #333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; //需要控制的文本行数
            overflow: hidden;
          }
          span {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.goods-info {
  .goods-ses-show {
    font-size: 14px;
    p {
      text-align: left;
      width: 100%;
      display: flex;
      flex-direction: column;
      img {
        align-self: center;
        max-width: 100%;
        vertical-align: middle;
      }
      &.ql-align-center {
        text-align: center;
      }
    }
  }
  .zoomer-base-container {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
