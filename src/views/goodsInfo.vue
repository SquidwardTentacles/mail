<template>
  <div class="goods-info">
    <p class="path-detail width">当前位置：<router-link to="/">首页 > </router-link>
      <router-link to="/">购物商城</router-link> > 商品详情
    </p>
    <div class="flexbox between outer-box width">
      <div class="left-box"
           ref="leftBox">
        <div class="detail-box">
          <!-- <magnifier :imgList="imgList"></magnifier> -->
          <div class="buy-goods flexbox between">
            <div class="img-box"
                 v-if="show">
              <sefMagnifier :goodsBoxWidth="goodsBoxWidth"
                            :magnifierImgArr="imgList"></sefMagnifier>
            </div>
            <div class="right-detail-message">
              <div class="title">
                <p>华为（HUAWEI）荣耀6Plus 16G双4G版</p>
                <span class="label">支持联通移动电信三网4G，5.5英寸，1920x1080分辨率，800万像素摄像头，Touch ID指纹识别传感器</span>
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
                <p><span class="add-icon one">-</span> <span class="num">1</span> <span class="add-icon two">+</span></p>
              </div>
            </div>
          </div>
          <div v-html="goodsDataArr.content"
               class="goods-ses-show width"></div>
        </div>
      </div>
      <div class="right-box">
        <p class="">推荐商品</p>
      </div>
    </div>

  </div>
</template>
<script>
// import magnifier from '../components/magnifier'
import sefMagnifier from '../components/selfMagnifier'
export default {
  components: {
    // magnifier,
    sefMagnifier
  },
  data () {
    return {
      goodsDataArr: [],
      imgList: {
        showImg: [],
        magnifier: [],
        requestOk: false
      },
      show: false,
      goodsBoxWidth: ''
    }
  },
  mounted () {
    // 获取到商品展示区域盒子的宽高
    this.goodsBoxWidth = this.$refs.leftBox.offsetWidth
    this.initData()
  },
  methods: {
    initData () {
      this.axios.get(`/getGoodsDetailSes?artid=${this.$route.query.artid}`).then(res => {
        if (res.errcode === 0) {
          this.goodsDataArr = res.data.goodsInfo
          let imgList = res.data.imgList
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
          })
          this.show = true
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.goods-info {
  background-color: #f5f5f5;
  .path-detail {
    text-align: left;
    font-size: 14px;
    padding: 20px 0 10px 0;
  }
  .outer-box {
    align-items: flex-start;
    .left-box {
      width: 80%;
      background-color: #fff;
      padding: 10px;
      box-sizing: border-box;
      .detail-box {
        .buy-goods {
          height: 350px;
          margin-bottom: 30px;
          .img-box {
            height: 100%;
            img {
              width: 350px;
              height: 100%;
            }
          }
          .right-detail-message {
            font-size: 12px;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
            div {
              margin-bottom: 10px;
              vertical-align: middle;
              &.buy-num {
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
