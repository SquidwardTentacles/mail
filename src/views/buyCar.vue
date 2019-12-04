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
               cellspacing='0'>
          <thead>
            <tr>
              <th>选择</th>
              <th class="goodsSes">商品信息</th>
              <th>单价</th>
              <th>库存</th>
              <th>购买数量</th>
              <th>金额（元）</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody v-if="carTableSes||carTableSes.length">
            <tr v-for="(item, index) in carTableSes"
                :key="index">
              <td>
                <el-switch v-model="item.choose"
                           active-color="#13ce66"
                           inactive-color="#ff4949">
                </el-switch>
              </td>
              <td class="goodsSes">
                <router-link :to="'/goodsInfo?artId='+item.artId">{{item.title}}</router-link>
              </td>
              <td>{{item.price}}</td>
              <td>{{item.stock_quantity}} 件</td>
              <td class="buy-num prohibitChoose">
                <p class="flexbox between"><span @click="numAdd(item,index)">+</span><span>{{item.buyNum}} </span><span @click="numReduce(item,index)">-</span> </p>
              </td>
              <td>{{item.totalPrice}}元</td>
              <td><span>购买</span><span class="delect"
                      @click="delectGoods(item.artId)">删除 </span></td>
            </tr>
          </tbody>
        </table>
        <div class="none-goods"
             v-if="!carTableSes||!carTableSes.length">
          空空如也
        </div>
        <div class="footer flexbox j-end">
          <p>已选商品：<span class="choose-goods">{{chooseGoods}}</span>件</p>
          <p>商品总金额（不含运费）：￥<span class="total-price">{{totalPrice}}</span>（元）</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      carTableSes: []
    }
  },
  mounted () {
    this.initData()
  },
  computed: {
    totalPrice () {
      if (this.carTableSes || this.carTableSes.length) {
        let price = 0
        this.carTableSes.map(curItem => {
          price += curItem.choose ? parseInt(curItem.totalPrice * curItem.buyNum) : 0
        })
        return price
      } else {
        return 0
      }
    },
    chooseGoods () {
      if (this.carTableSes || this.carTableSes.length) {
        let choose = 0
        this.carTableSes.map(curItem => {
          choose += curItem.choose ? 1 : 0
        })
        return choose
      } else {
        return 0
      }
    }
  },
  methods: {
    initData () {
      this.axios.get(`/getUserCar?userName=${this.$store.state.userSes.userName}`).then(res => {
        if (res.errCode === 0) {
          if (res.message.data) {
            this.carTableSes = res.message.data
          } else {
            this.carTableSes = []
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    numAdd (item, i) {
      if (item.buyNum < parseInt(item.stock_quantity)) {
        item.buyNum++
      } else {
        this.$message.error('没有库存')
      }
    },
    numReduce (item) {
      if (item.buyNum > 1) {
        item.buyNum--
      } else {
        this.$message.error('不能再减了偶')
      }
    },
    // 删除商品
    delectGoods (id) {
      this.$confirm('确认删除商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          if (id) {
            this.axios.delete(`/delectCarGoods?artId=${id}&userName=${this.$store.state.userSes.userName}`).then(res => {
              if (res.errCode === 0) {
                this.$message.success(res.message)
                this.initData()
              } else {
                this.$message.error(res.message)
              }
            })
          }
        })
        .catch(res => {
          // this.errtipMessage()
          console.log(res)
        })
    }
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
      .none-goods {
        width: 100%;
        display: block;
        background: none;
        text-align: center;
        font-size: 12px;
        padding: 10px;
      }
      .table-box {
        margin-top: 20px;
        width: 100%;
        background: #f5f5f5;
        font-size: 14px;
        .goodsSes {
          text-align: left;
        }
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
              .delect {
                margin-left: 10px;
                cursor: pointer;
                &:hover {
                  color: #f00;
                }
              }
              &.buy-num {
                p {
                  border: 1px solid #ccc;
                  height: 20px;
                  line-height: 20px;
                  font-size: 14px;
                  width: 100px;
                  margin: 0 auto;
                  span {
                    vertical-align: middle;
                    height: 100%;
                    width: 20px;
                    cursor: pointer;
                    &:nth-child(1) {
                      border-right: 1px solid #ccc;
                    }
                    &:nth-child(2) {
                      width: 25px;
                    }
                    &:nth-last-child(1) {
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .footer {
        text-align: right;
        padding: 5px;
        box-sizing: border-box;
        p {
          font-size: 14px;
          margin-left: 10px;
        }
        span {
          vertical-align: middle;
          font-size: 14px;
          &.choose-goods {
            margin: 0;
            margin: 5px;
          }
          &.total-price {
            color: #f00;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
