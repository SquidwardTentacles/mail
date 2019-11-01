<template>
  <div class="goods-info">
    <p class="path-detail width">当前位置：首页 > 购物商城 > 商品详情</p>
    <div class="flexbox between outer-box width">
      <div class="left-box">
        <div class="detail-box">
          <div class="buy-goods">

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
export default {
  data () {
    return {
      goodsDataArr: []
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
          let imgList = res.data.imgList
          // this.images.thumbs[0].url = imgList[0].original_path
          // this.images.thumbs[1].url = imgList[0].thumb_path
          this.images.normal_size[0].url = imgList[1].original_path
          this.images.normal_size[1].url = imgList[1].thumb_path
          imgList.map((cur, index) => {
            let obj = {
              id: index,
              url: cur.original_path
            }
            this.images.normal_size[index] = obj
            let largeUrl = {
              id: index,
              url: cur.thumb_path
            }
            this.images.large_size[index] = largeUrl
          })
          console.log(this.images)

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
      // .goods-ses-show {
      // }
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
