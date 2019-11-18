<template>
  <div class="home flexbox between">
    <div class="top">
      <navList />
      <div class="content-box">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer">
      <div class="width">
        <ul class="flexbox j-start top-href">
          <li>关于我们</li>
          <li>联系我们</li>
          <li>联系客服</li>
          <li>合作招商</li>
          <li>商家帮助</li>
          <li>营销中心</li>
          <li>隐私政策</li>
        </ul>
        <div class="bottom">
          <p>版权所有</p>
          <p>Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navList from '@/components/navList.vue'
export default {
  components: {
    navList
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  flex-direction: column;
  .top {
    width: 100%;
  }
  .content-box {
    min-height: calc(100vh - 400px);
    background-color: #f5f5f5;
  }
  .footer {
    color: #fff;
    background-color: #333333;
    width: 100%;
    .top-href {
      font-size: 14px;
      padding: 15px 0;
      border-bottom: 1px solid #fff;
      li {
        padding-left: 15px;
      }
    }
    .bottom {
      font-size: 14px;
      color: #fff;
      height: 200px;
      line-height: 50px;
    }
  }
}
</style>
