<template>
  <div class="navList">
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
</template>

<script>
export default {
  name: 'navList',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.navList {
  width: 100%;
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
</style>
