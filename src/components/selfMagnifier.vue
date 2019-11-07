<template>
  <div class="magnifier">
    <div class="outer-box">
      <!-- 放大图片 -->
      <div class="magnifier-box"
           v-show="elemenImgShow"
           ref="thumbnailBox">
        <div class="inner-box">
          <img ref="thumbnailImg"
               :src="magnifierImgArr.magnifier[imgIndex].src"
               alt="">
        </div>
      </div>
      <!-- 展示的图片 -->
      <div class="img-show"
           ref="imgShowBox">
        <div class="magnifier-img"
             v-show="elemenImgShow"
             ref="magnifierImg"></div>
        <img :src="magnifierImgArr.showImg[imgIndex].src"
             alt="">
        <div class="transparent"
             @mousemove="magnifiermove($event)"
             @mouseleave="elemenImgShow = false"></div>
      </div>
      <!-- 缩略图 -->
      <div class="img-thumbnail flexbox j-start">
        <li v-for="(item, index) in thumbnailForArr"
            :key="index"
            @mouseenter="thumbnailEnter(index)"
            :class="{'active':imgIndex===index}">
          <img :src="item.src"
               alt=""
               srcset="">
        </li>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['magnifierImgArr', 'goodsBoxWidth'],
  /*
    magnifierImgArr
    传入的图片对象集合 数据格式 :
      magnifierImgArr: {
          //缩略图图片数组
         thumbnail: [{src: ''}],
          //要放大的图片数组
         showImg: [{src:''}]
          //放大的图片数组
         magnifier: [{src:''}]
       },
      // 其中缩略图图片数组可以不传 如果不传将自动使用 要放大的图片数组 的数据
      // goodsBoxWidth
      // 设置放大的图片盒子的宽度 尽量沾满商品图片的右边部分
  */
  data () {
    return {
      // magnifierImgArr: {
      //   // 缩略图图片数组
      //   thumbnail: [{src: require('../assets/img/letter-img/22628333-1_x_2.jpg')},
      //     {src: require('../assets/img/letter-img/22628333-2_x_2.jpg')},
      //     {src: require('../assets/img/letter-img/22628333-3_x_2.jpg')},
      //     {src: require('../assets/img/letter-img/22628333-4_x_2.jpg')},
      //     {src: require('../assets/img/letter-img/22628333-5_x_2.jpg')}],
      //   // 要放大的图片数组
      //   showImg: [{src: require('../assets/img/center/22628333-1_w_2.jpg')},
      //     {src: require('../assets/img/center/22628333-2_w_2.jpg')},
      //     {src: require('../assets/img/center/22628333-3_w_2.jpg')},
      //     {src: require('../assets/img/center/22628333-4_w_2.jpg')},
      //     {src: require('../assets/img/center/22628333-5_w_2.jpg')}],
      //   // 放大的图片数组
      //   magnifier: [{src: require('../assets/img/big/22628333-1_u_2.jpg')},
      //     {src: require('../assets/img/big/22628333-2_u_2.jpg')},
      //     {src: require('../assets/img/big/22628333-3_u_2.jpg')},
      //     {src: require('../assets/img/big/22628333-4_u_2.jpg')},
      //     {src: require('../assets/img/big/22628333-5_u_2.jpg')} ]
      // },
      imgIndex: 0,
      elemenImgShow: false
    }
  },
  mounted () {

  },
  computed: {
    thumbnailForArr () {
      if (this.magnifierImgArr.thumbnail && this.magnifierImgArr.thumbnail.length) {
        return this.magnifierImgArr.thumbnail
      } else {
        return this.magnifierImgArr.showImg
      }
    }
  },
  methods: {
    // 缩略图鼠标移入事件
    thumbnailEnter (i) {
      this.imgIndex = i
    },
    initData () {
      // 将放大盒子向右移动
      let outerBoxWidth = parseInt(this.$refs.imgShowBox.offsetWidth)
      // 放大镜盒子
      let thumbnailBox = this.$refs.thumbnailBox
      thumbnailBox.style.left = (outerBoxWidth + 15) + 'px'
      // 设置放大盒子的宽度
      if (this.goodsBoxWidth && this.goodsBoxWidth > 500) {
        thumbnailBox.style.width = this.goodsBoxWidth - outerBoxWidth - 75 + 'px'
      } else {
        thumbnailBox.width = 500
      }
    },
    magnifiermove (e) {
      // 有鼠标事件才加载大图片的位移 以解决在数据未加载之前就赋值了错误的位移
      this.initData()
      // 鼠标移入展示图片
      this.elemenImgShow = true
      // 鼠标下移动的半透明方块
      let magnifierEle = this.$refs.magnifierImg
      // 待放大的图片盒子宽高
      let outerBoxHeight = parseInt(this.$refs.imgShowBox.offsetHeight)
      let outerBoxWidth = parseInt(this.$refs.imgShowBox.offsetWidth)
      //  半透明方块的宽高
      let magnifierHeight = parseInt(magnifierEle.offsetHeight)
      let magnifierWidth = parseInt(magnifierEle.offsetWidth)
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // 刚开始赋值left的初始值时就要减去放大镜图片宽度的一般 保证移动距离大于宽度一半之后才开始移动图片 top同理
      let left = e.offsetX - (magnifierWidth / 2)
      let top = e.offsetY - (magnifierHeight / 2)
      // 左边临界点
      left = left < 0 ? 0 : left
      //  右边临界点 透明方块可以移动的距离只有盛放商品展示图片盒子的宽度减去半透明盒子的宽度 如果移动的距离大于这个宽度 就将可移动距离设置为最大宽度 否则为鼠标移动的距离 top值同理
      left = left > outerBoxWidth - magnifierWidth ? outerBoxWidth - magnifierWidth : left
      magnifierEle.style.left = left + 'px'
      // 上面临界点
      top = top < 0 ? 0 : top
      // 下面临界点
      top = top > outerBoxHeight - magnifierHeight ? outerBoxHeight - magnifierHeight : top
      magnifierEle.style.top = top + 'px'
      // 放大的图片位移通过使用margin改变图片的位置 使用比例换算出移动的距离
      // 获取到需要放大的图片元素
      let thumbnailImgEle = this.$refs.thumbnailImg
      // 换算出小图片对大图片的比例
      let leftScale = parseFloat((thumbnailImgEle.offsetWidth / (magnifierWidth / 2.5)).toFixed(2))
      let topScale = parseFloat((thumbnailImgEle.offsetHeight / ((magnifierHeight / 2.5))).toFixed(2))
      thumbnailImgEle.style.marginLeft = '-' + (leftScale * left) + 'px'
      thumbnailImgEle.style.marginTop = '-' + (topScale * top) + 'px'
    }
  }
}
</script>
<style lang="less" scoped>
.magnifier {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .outer-box {
    position: relative;
    width: 100%;
    height: 100%;
    .img-show {
      border: 1px solid #ccc;
      width: 100%;
      height: calc(100% - 80px);
      position: relative;
      .magnifier-img {
        width: 200px;
        height: 200px;
        background: rgba(160, 203, 236, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
      }
      .transparent {
        cursor: move;
        width: 100%;
        height: 100%;
        background: none;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 20;
      }
      img {
        max-height: 100%;
        max-width: 100%;
      }
    }
    .img-thumbnail {
      margin-top: 10px;
      height: 54px;
      overflow: auto;
      li {
        width: 50px;
        height: 50px;
        border: 2px solid transparent;
        vertical-align: middle;
        &.active {
          border-color: #f00;
        }
        text-align: center;
        img {
          max-height: 100%;
          max-width: 100%;
        }
      }
    }
    .magnifier-box {
      position: absolute;
      left: 50px;
      top: -5px;
      width: 500px;
      height: 330px;
      padding: 20px;
      z-index: 10;
      background-color: #fff;
      .inner-box {
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color: #fff;
      }
    }
  }
}
</style>
