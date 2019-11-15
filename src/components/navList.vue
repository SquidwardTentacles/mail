<template>
  <div>
    <div class="navList">
      <div class="bg">
        <div class="inner-box flexbox between">
          <div class="left-title">
            商城
          </div>
          <div class="function-list">
            <ul class="flexbox j-end">
              <li class="search-box">
                <input type="text"
                       placeholder="请输入关键字">
                <i class="el-icon-search"></i>
              </li>
              <li class="search-box">
                <span>会员中心</span>
                <i class="border"></i>
              </li>
              <li class="search-box">
                <span>推出</span>
                <i class="border"></i>
              </li>
              <li class="search-box"
                  @click="carClick">
                <span>购物车</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="top-nav width">
        <!-- 导航栏 -->
        <div class="sub-box flexbox between">
          <li v-for="(item, index) in navData"
              :key="index"
              :class="{'active':navActiveId===index}">
            <router-link :to="item.router"> {{item.label}}</router-link>
          </li>
        </div>
      </div>
    </div>
    <div class="outer-path">
      <div class="path-detail width">当前位置：
        <p>
          <router-link to="/">首页 > </router-link>
        </p>
        <p>
          <router-link v-if="pathObj.name"
                       :to="pathObj.path"> {{pathObj.name}}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navList',
  props: {
    msg: String
  },
  data () {
    return {
      navData: [
        { label: '首页', router: '/' },
        { label: '每日精选', router: '/' },
        { label: '秒杀专区', router: '/' },
        { label: '商品超市', router: '/' },
        { label: '会员权益', router: '/' },
        { label: '购物商城', router: '/' }
      ],
      navActiveId: 0,
      pathObj: {
        name: '',
        path: ''
      }
    }
  },
  watch: {
    $route (to, from) {
      console.log(to, from)
      this.pathObj.name = to.name
      this.pathObj.path = to.path
    }
  },

  methods: {
    carClick () {
      this.$router.push({
        path: '/buyCar'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.outer-path {
  background-color: #f5f5f5;
  .path-detail {
    text-align: left;
    font-size: 14px;
    padding: 20px 0 10px 0;
    p {
      display: inline-block;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
.navList {
  width: 100%;
  .bg {
    background-color: #333333;

    .inner-box {
      margin: 0 auto;
      font-size: 14px;
      color: #fff;
      padding: 10px 0;
      width: 1200px;
      li {
        margin-right: 5px;
        i.border {
          width: 0;
          height: 100%;
          border-right: 1px solid #ccc;
          margin: 0 3px 0 8px;
        }
        &.search-box {
          cursor: pointer;
          margin-right: 15px;
          input {
            background: none;
            color: #fff;
            border-bottom: 1px solid #fff;
            margin-right: 5px;
            padding: 0 5px;
          }
          i {
            cursor: pointer;
            padding: 0 5px;
          }
        }
      }
    }
  }
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
          a {
            color: #008000;
          }
        }
        a {
          color: #fff;
        }
      }
    }
  }
}
</style>
