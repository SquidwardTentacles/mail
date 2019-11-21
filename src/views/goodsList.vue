  <template>
  <div class="goodList">
    <div class="content">
      <div class="content-box">
        <!-- 轮播图内容 -->
        <div class="banner-box width flexbox">
          <!-- 左边轮播图内容 -->
          <div class="list-box flexbox">
            <div class="goodsCate"
                 v-for="(item, index) in bannerCategory"
                 :key="index"
                 @mouseenter="bannerListHover(index)"
                 @mouseleave="bannerCoverShow = false">
              <p class="top-title">
                {{item.title}}
              </p>
              <div class="sub-list">
                <span v-for="(item, index) in item.subGoods"
                      :key="index">{{item.title}}</span>
              </div>
            </div>
          </div>
          <div class="banner">
            <!-- 轮播图遮罩层 -->
            <div class="cover"
                 v-if="bannerCoverShow">
              <p>
                {{bannerCategory[coverId].title}}
              </p>
              <p>
                <span v-for="(item, index) in bannerCategory[coverId].subGoods"
                      :key="index">{{bannerCategory[coverId].title}}</span>
              </p>
            </div>
            <div class="block">
              <el-carousel height="300px">
                <el-carousel-item v-for="(item, index) in bannerImgArr"
                                  :key="index">
                  <img :src="item.img_url"
                       alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <!-- 右边内容 -->
          <div class="list-box flexbox">
            <div class="right-box flexbox j-start"
                 v-for="(item, index) in rightBoxArr"
                 :key="index">
              <div class="img-box">
                <span>{{index+1}}</span>
                <img :src="item.img_url"
                     alt="">
              </div>
              <div class="text-box">
                <p>{{item.title}}</p>
                <p>{{item.add_time | dateFilter}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="goods-list">
          <div class="sub-list width"
               v-for="(item, index) in goodsListArr"
               :key="index">
            <div class="title flexbox between">
              <span>{{item.catetitle}}</span>
              <span>
                <span v-for="(items, index) in item.goodsList"
                      :key="index">{{items.cateTitle}}</span>
                <span>更多</span>
              </span>
            </div>
            <div class="goods-list-detail flexbox j-start">
              <div class="detail-box"
                   v-for="(items, index) in item.goodsList"
                   :key="index">
                <!-- <router-link :to="'/goodsInfo?artid='+items.artID"> -->
                <div @click="toGoodDetail(items.artID)">
                  <img :src="items.img_url"
                       alt="">
                  <div class="introduce flexbox a-start">
                    <p>{{items.artTitle}}</p>
                    <p><span class="price">{{items.market_price}}</span> <span>元</span></p>
                    <p class="flexbox between"><span>市场价：<del>{{items.sell_price}}</del></span> <span>库存：{{items.stock_quantity}}</span></p>
                  </div>
                </div>
                <!-- </router-link> -->
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import pathMix from '../assets/js/mixin/path'
export default {
  mixins: [pathMix],
  name: 'home',
  data () {
    return {
      navData: [
        { label: '首页' },
        { label: '每日精选' },
        { label: '秒杀专区' },
        { label: '商品超市' },
        { label: '会员权益' },
        { label: '购物商城' }
      ],
      navActiveId: 0,
      bannerCategory: [],
      bannerImgArr: [],
      // 轮播图遮罩层是否显示
      bannerCoverShow: false,
      coverId: 0,
      rightBoxArr: [],
      // 商品列表
      goodsListArr: []
    }
  },
  beforeMount () {
    this.initData()
  },
  methods: {
    initData () {
      // 获取轮播图信息
      this.axios.get('/getBanner').then(res => {
        // 右边列表数据
        this.bannerCategory = res.data.categoryData
        // 轮播图图片数据
        this.bannerImgArr = res.data.bannerData
        this.rightBoxArr = []
        for (let i = 0; i < 4; i++) {
          this.rightBoxArr.push(this.bannerImgArr[i])
        }
      })
      // 获取商品列表
      this.axios.get('/getGoodsSesson').then(res => {
        if (res.errcode === 0) {
          this.goodsListArr = res.data
        }
      })
    },
    // 轮播图列表鼠标移入事件
    bannerListHover (i) {
      this.coverId = i
      this.bannerCoverShow = true
    },
    toGoodDetail (id) {
      this.$router.push({
        path: '/goodsInfo',
        query: {
          artId: id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.goodList {
  .content {
    margin: 0 auto;
    .content-box {
      width: 100%;
      background-color: #f5f5f5;
      padding: 10px 0;
      box-sizing: border-box;
      .banner-box {
        background-color: #fff;
        margin: 10px auto;
        .list-box {
          width: 20%;
          height: 100%;
          flex-direction: column;
          .goodsCate {
            width: 90%;
            margin: 0 auto;
            font-size: 12px;
            text-align: left;
            margin-bottom: 10px;
            cursor: pointer;
            .top-title {
              margin: 8px 0;
              font-size: 14px;
            }
            .sub-list {
              span {
                margin-right: 5px;
              }
            }
          }
          .right-box {
            width: 95%;
            margin: 0 auto;
            margin-bottom: 10px;
            font-size: 12px;
            text-align: left;
            &:nth-child(1) span {
              background-color: #f00;
            }
            .img-box {
              position: relative;
              span {
                position: absolute;
                top: 2px;
                left: 2px;
                width: 15px;
                height: 15px;
                font-size: 12px;
                background-color: #fff;
                text-align: center;
                line-height: 15px;
              }
              img {
                width: 50px;
                height: 50px;
                margin-right: 5px;
              }
            }
          }
        }
        .banner {
          width: 60%;
          position: relative;
          .cover {
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.5);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            padding-left: 20px;
            box-sizing: border-box;
            p {
              font-size: 12px;
              text-align: left;
              margin: 10px 0;
              span {
                margin-right: 10px;
              }
              &:nth-child(1) {
                font-size: 14px;
              }
            }
          }
          .block {
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .goods-list {
        margin-top: 50px;
        .sub-list {
          .title {
            padding: 0 10px;
            box-sizing: border-box;
            margin: 20px 0 10px 0;
            span {
              margin-right: 10px;
              &:nth-child(2) {
                font-size: 12px;
              }
            }
          }
          .goods-list-detail {
            width: 100%;
            align-items: start;
            .detail-box {
              width: 260px;
              min-height: 260px;
              margin-right: 15px;
              background-color: #fff;
              padding: 10px;
              box-sizing: border-box;
              img {
                width: 100%;
                max-height: 180px;
              }
              .introduce {
                flex-direction: column;
                height: 120px;
                p {
                  font-size: 12px;
                  text-align: left;
                  margin-top: 7px;
                  .price {
                    color: #f00;
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
