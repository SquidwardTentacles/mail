<template>
  <div class="buy-car">
    <div class="width">
      <div class="progress flexbox between">
        <div class="my-car">
          我的购物车
        </div>
        <div class="progress-bar">
          <p class="flexbox between">
            <span class="active">1 加入购物车</span>
            <span>2 填写订单信息</span>
            <span>3 支付确认订单</span>
          </p>
        </div>
      </div>
      <div class="table-outer-box">
        <table class="table-box"
               cellspacing='0     '>
          <thead>
            <tr>
              <th>选择</th>
              <th>商品信息</th>
              <th>单价</th>
              <th>数量</th>
              <th>金额（元）</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <el-switch v-model="value"
                           active-color="#13ce66"
                           inactive-color="#ff4949">
                </el-switch>
              </td>
              <td>电脑</td>
              <td>3000</td>
              <td>1</td>
              <td>3000元</td>
              <td>购买</td>
            </tr>
          </tbody>
        </table>
        <div class="footer">
          <span>已选商品：<i>1</i>件</span>
          <span>商品总金额（不含运费）：￥7008（元）</span>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.buy-car {
  background-color: #f5f5f5;
  height: 100%;
  .width {
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    .progress {
      .my-car {
        padding-left: 40px;
        background: url('../assets/img/carIcon.svg') left center no-repeat;
        background-size: 40px 40px;
        width: 150px;
      }
      .progress-bar {
        margin: 0 auto;
        width: calc(100% - 150px);
        font-size: 14px;
        p {
          margin: 0 auto;
          width: 90%;
          height: 30px;
          border-radius: 30px;
          background-color: #fff;
          overflow: hidden;
          span {
            width: 33%;
            padding-left: 5px;
            display: inline-block;
            box-sizing: border-box;
            color: #000;
            height: 100%;
            line-height: 30px;
            background-color: #f5f5f5;
            &.active {
              color: #fff;
              background-color: #83c44e;
            }
          }
        }
      }
    }
    .table-outer-box {
      background: #f5f5f5;
      padding: 3px;
      padding-top: 0;
      box-sizing: border-box;
      .table-box {
        margin-top: 20px;
        width: 100%;
        background: #f5f5f5;
        thead {
          color: #555;
          font-size: 13px;
          font-weight: 400;
          border-bottom: 1px solid #eee;
          tr {
            height: 45px;
          }
        }
        tbody {
          text-align: center;
          background-color: #fff;
          tr {
            td {
              border-bottom: 1px solid #f5f5f5;
              padding: 10px 0;
              box-sizing: border-box;
            }
          }
        }
      }
      .footer {
        text-align: right;
        padding: 5px;
        box-sizing: border-box;
        span {
          vertical-align: middle;
          margin-right: 20px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
