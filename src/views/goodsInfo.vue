<template>
  <div class="goods-info">
    <p class="path-detail width">当前位置：<router-link to="/">首页 > </router-link>
      <router-link to="/">购物商城</router-link> > 商品详情
    </p>
    <div class="flexbox between outer-box width">
      <div class="left-box">
        <div class="detail-box">
          <div class="buy-goods flexbox between">
            <div class="img-box"
                 v-if="show">
              <!-- <img :src="images.normal_size[0].url"
                   alt=""> -->
              <magnifier :imgList="imgList"></magnifier>
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
        aaaaa
      </div>
    </div>

  </div>
</template>
<script>
import magnifier from '../components/magnifier'
export default {
  components: {
    magnifier
  },
  data () {
    return {
      goodsDataArr: [],
      imgList: [],
      images: {
        normal_size: [
          { id: '', url: '' }
        ],
        large_size: [
          { id: '', url: '' }
        ]
      },
      show: false
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.axios.get(`/getGoodsDetailSes?artid=${this.$route.query.artid}`).then(res => {
        if (res.errcode === 0) {
          this.goodsDataArr = res.data.goodsInfo
          this.imgList = res.data.imgList
          console.log(this.imgList)

          // this.images.thumbs[0].url = imgList[0].original_path
          // this.images.thumbs[1].url = imgList[0].thumb_path
          // imgList.map((cur, index) => {
          //   let obj = {
          //     id: index,
          //     url: cur.original_path
          //   }
          //   this.images.normal_size[index] = obj
          //   let largeUrl = {
          //     id: index,
          //     url: cur.thumb_path
          //   }
          //   this.images.large_size[index] = largeUrl
          // })
          // console.log(this.images)

          // this.images.large_size[0].url = imgList[2].original_path
          // this.images.large_size[1].url = imgList[2].thumb_path
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
          margin-bottom: 10px;
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
