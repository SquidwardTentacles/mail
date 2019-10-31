<template>
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
            <li class="search-box">
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
          {{item.label}}
        </li>
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
        { label: '首页' },
        { label: '每日精选' },
        { label: '秒杀专区' },
        { label: '商品超市' },
        { label: '会员权益' },
        { label: '购物商城' }
      ],
      navActiveId: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
          color: #008000;
        }
      }
    }
  }
}
</style>
