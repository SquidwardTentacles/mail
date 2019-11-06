<template>
  <div class="magnifier">
    <div class="outer-box"
         id='outerBox'>
      <!-- 放大图片 -->
      <div class="magnifier-box"
           v-show="elemenImgShow"
           id="thumbnailBox">
        <div class="inner-box">
          <img id="thumbnailImg"
               :src="magnifierImgArr.magnifier[imgIndex].src"
               alt="">
        </div>
      </div>
      <!-- 展示的图片 -->
      <div class="img-show"
           id="imgShowBox">
        <!-- 发大镜图片 -->
        <img src="../assets/img/magnifier.png"
             v-show="elemenImgShow"
             alt=""
             class="magnifier-img"
             id="magnifierImg">
        <img :src="magnifierImgArr.showImg[imgIndex].src"
             alt=""
             id="showGoodsImg">
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
  props: ['magnifierImgArr'],
  data () {
    return {
      // magnifierImgArr: {
      //   // 缩略图图片数组
      //   thumbnail: [
      //     {
      //       src: require('../assets/img/letter-img/22628333-1_x_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/letter-img/22628333-2_x_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/letter-img/22628333-3_x_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/letter-img/22628333-4_x_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/letter-img/22628333-5_x_2.jpg')
      //     }
      //   ],
      //   // 要放大的图片数组
      //   showImg: [
      //     {
      //       src: require('../assets/img/center/22628333-1_w_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/center/22628333-2_w_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/center/22628333-3_w_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/center/22628333-4_w_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/center/22628333-5_w_2.jpg')
      //     }
      //   ],
      //   // 放大的图片数组
      //   magnifier: [
      //     {
      //       src: require('../assets/img/big/22628333-1_u_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/big/22628333-2_u_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/big/22628333-3_u_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/big/22628333-4_u_2.jpg')
      //     },
      //     {
      //       src: require('../assets/img/big/22628333-5_u_2.jpg')
      //     }
      //   ]
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
      let outerBoxWidth = parseInt(document.getElementById('imgShowBox').offsetWidth)
      // 放大镜盒子
      let thumbnailBox = document.getElementById('thumbnailBox')
      thumbnailBox.style.left = (outerBoxWidth + 15) + 'px'
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    },
    magnifiermove (e) {
      // 有鼠标事件才加载大图片的位移 以解决在数据未加载之前就赋值了错误的位移
      this.initData()
      // 鼠标移入展示图片
      this.elemenImgShow = true
      // console.log(e.offsetX)
      let magnifierEle = document.getElementById('magnifierImg')
      // 商品图片大盒子的宽高
      let outerBoxHeight = parseInt(document.getElementById('imgShowBox').offsetHeight)
      let outerBoxWidth = parseInt(document.getElementById('imgShowBox').offsetWidth)
      //  放大镜图片的宽高
      let magnifierHeight = parseInt(magnifierEle.offsetHeight)
      let magnifierWidth = parseInt(magnifierEle.offsetWidth)
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // 刚开始赋值left的初始值时就要减去放大镜图片宽度的一般 保证移动距离大于宽度一半之后才开始移动图片 top同理
      let left = e.offsetX - (magnifierWidth / 2)
      let top = e.offsetY - (magnifierHeight / 2)
      // 左边临界点
      left = left < 0 ? 0 : left
      //  右边临界点
      left = left > outerBoxWidth - magnifierWidth ? outerBoxWidth - magnifierWidth : left
      magnifierEle.style.left = left + 'px'
      // 上面临界点
      top = top < 0 ? 0 : top
      // 下面临界点
      top = top > outerBoxHeight - magnifierHeight ? outerBoxHeight - magnifierHeight : top
      magnifierEle.style.top = top + 'px'
      // 放大的图片位移通过使用margin改变图片的位置 使用比例换算出移动的距离
      let thumbnailImgEle = document.getElementById('thumbnailImg')
      // let showGoodsImgEle = document.getElementById('showGoodsImg')
      let leftScale = parseFloat((thumbnailImgEle.offsetWidth / (outerBoxWidth - magnifierWidth)).toFixed(2))
      let topScale = parseFloat((thumbnailImgEle.offsetHeight / (outerBoxHeight - magnifierHeight)).toFixed(2))
      // let leftScale = parseFloat((thumbnailImgEle.offsetWidth / (showGoodsImgEle.offsetWidth - magnifierWidth)).toFixed(2))
      // let topScale = parseFloat((thumbnailImgEle.offsetHeight / (showGoodsImgEle.offsetHeight - magnifierHeight)).toFixed(2))

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
