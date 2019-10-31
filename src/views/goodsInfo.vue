<template>
  <div class="goods-info">
    <div v-html="goodsDataArr.content"></div>
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
      console.log(this.$route.query.artid)
      this.axios.get(`/getGoodsDetailSes?artid=${this.$route.query.artid}`).then(res => {
        if (res.errcode === 0) {
          this.goodsDataArr = res.data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
