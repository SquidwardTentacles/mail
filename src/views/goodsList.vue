  <template>
  <div class="goodList">
    <navList />
    <div class="content">
      <div class="top-nav width">
        <!-- 导航栏 -->
        <div class="sub-box flexbox between">
          <li v-for="(item, index) in navData"
              :key="index"
              :class="{'active':navActiveId===index}">
            {{item.label}}
          </li>
        </div>
      </div>
      <div class="content-box">
        <!-- 轮播图内容 -->
        <div class="banner-box width flexbox">
          <div class="list-box">
            <div class="goodsCate"
                 v-for="(item, index) in bannerGoodList"
                 :key="index">
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
            <div class="block">
              <el-carousel height="150px">
                <el-carousel-item v-for="item in 4"
                                  :key="item">
                  <div v-for="(item, index) in bannerGoodList.bannerData"
                       :key="index">
                    <img :src="item.img_url"
                         alt="">
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="list-box"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navList from '@/components/navList.vue'

export default {
  name: 'home',
  components: {
    navList
  },
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
      bannerGoodList: []
    }
  },
  beforeMount () {
    this.initData()
  },
  methods: {
    initData () {
      this.axios.get('/getBanner').then(res => {
        console.log(res)
        this.bannerGoodList = res.data
      })
    }
  }
}
</script>
<style lang="less" scoped>
.goodList {
  .width {
    max-width: 1100px;
    margin: 0 auto;
  }
  .content {
    margin: 0 auto;
    .top-nav {
      width: 100%;
      background-color: #333;
      border-radius: 5px;
      margin: 3px auto;
      color: #fff;
      font-size: 16px;
      .sub-box {
        width: 85%;
        margin: 0 auto;
        li {
          padding: 10px 20px;
          margin-right: 5px;
          cursor: pointer;
          &.active {
            color: #008000;
          }
        }
      }
    }
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
        }
        .banner {
          width: 60%;
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
