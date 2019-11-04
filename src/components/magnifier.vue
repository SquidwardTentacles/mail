<template>

  <div class="container">

    <div class="magnifierContainer">
      <div class="imgLeft">
        <!-- 中号图片 -->
        <div class="imgMedium"
             id="imgMedium">
          <!-- 放大镜 -->
          <div class="magnifier"
               id="magnifier">
            <img src="../assets/img/magnifier.png">
          </div>
          <!-- 图片 -->
          <div class="mediumContainer"
               id="mediumContainer">
            <img :src="centerImg[0].url">
          </div>
          <!-- 覆盖在图片上的隐藏的盒子 -->
          <div id="zhezhao"></div>
        </div>

        <!-- 缩略图 -->
        <ul class="img_x"
            id="img_x">
          <li><img src="../assets/img/letter-img/22628333-1_x_2.jpg"></li>
          <li><img src="../assets/img/letter-img/22628333-2_x_2.jpg"></li>
          <li><img src="../assets/img/letter-img/22628333-3_x_2.jpg"></li>
          <li><img src="../assets/img/letter-img/22628333-4_x_2.jpg"></li>
          <li><img src="../assets/img/letter-img/22628333-5_x_2.jpg"></li>
        </ul>
      </div>
      <div class="imgRight">
        <!-- 大图 -->
        <div class="img_u"
             id="img_u">
          <img class="big-pic"
               src="../assets/img/big/22628333-1_u_2.jpg">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      centerImg: [
        { url: require('@/assets/img/center/22628333-1_w_2.jpg') },
        { url: '@/assets/img/center/22628333-2_w_2.jpg' },
        { url: '@/assets/img/center/22628333-3_w_2.jpg' },
        { url: '@/assets/img/center/22628333-4_w_2.jpg' },
        { url: '@/assets/img/center/22628333-5_w_2.jpg' }
      ]
    }
  },
  mounted () {
    // this.initData()
    this.selfMagnifier()
  },
  methods: {
    selfMagnifier () {
      // 缩略图列表鼠标移动改变图片
      $('#img_x li').mouseover(function (e) {
        let i = $(this).index() + 1
        $(this).css('border', '2px solid #f00').siblings().css('border', '2px solid transparent')
        // 设置放大镜图片地址
        // let magnifierUrl = `../assets/img/center/22628333-3_w_2.jpg`
        // 赋值放大镜图片地址
        $('#mediumContainer img').attr('src', require(`../assets/img/center/22628333-${i}_w_2.jpg`))
        // 赋值放大图片的地址
        $('#img_u img').attr('src', require(`../assets/img/big/22628333-${i}_u_2.jpg`))
      })
      // 放大镜遮罩层图片鼠标移动事件
      $('#zhezhao').mousemove(function (e) {
        // 放大镜半透明盒子的位移
        // 显示放大镜盒子
        let left = parseInt(e.offsetX) - (parseInt($('#magnifier').outerWidth()) / 2)
        // 左边的最大距离为图片遮罩层盒子的宽度减去放大镜盒子的宽度
        let maxLeft = parseInt($('#zhezhao').width()) - parseInt($('#magnifier').width())
        left = left < 0 ? 0 : left
        // 如果左边距离大于最大距离 就将最大距离赋值为左边距离
        left = left > maxLeft ? maxLeft : left
        let top = parseInt(e.offsetY) - (parseInt($('#magnifier').outerHeight()) / 2)
        top = top < 0 ? 0 : top
        let maxTop = parseInt($('#zhezhao').height()) - parseInt($('#magnifier').height())
        top = top > maxTop ? maxTop : top
        $('#magnifier').show().css('left', left).css('top', top)
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // 放大图片位置操作
        // 显示大图片
        $('#img_u').show()
        // 换算小图对大图的比例 大图的宽度除以小图的宽度就是left的比例 再用负号取反位移
        let leftScale = parseFloat(($('#img_u img').width() / $('#zhezhao').width()).toFixed(2))
        let topScale = parseFloat(($('#img_u img').height() / $('#zhezhao').height()).toFixed(2))
        let bigML = (left * leftScale).toFixed(0)
        let bigMT = (top * topScale).toFixed(0)
        $('#img_u img').css('marginLeft', '-' + bigML + 'px').css('marginTop', '-' + bigMT + 'px')
      })
      // 鼠标移出隐藏放大图片
      $('#zhezhao').mouseleave(function () {
        $('#img_u').hide()
        $('#magnifier').hide()
      })
      // 缩略图列表边框隐藏
      $('#img_x').mouseleave(function () {
        $(this).children('li').css('border', '2px solid transparent')
      })
    }

  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
.container {
  width: 100%;
  height: 100%;
  text-align: center;
}
.magnifierContainer {
  display: flex;
  height: 100%;
  position: relative;
}
.imgMedium {
  position: relative;
  height: calc(100% - 80px);
}
.imgLeft .magnifier {
  position: absolute;
  display: none;
  width: 200px;
  height: 200px;
}
.mediumContainer {
  width: 350px;
  height: 100%;
  border: 1px solid #eee;
  overflow: hidden;
}
.mediumContainer img {
  max-height: 100%;
}
#zhezhao {
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  top: 0;
  border: 1px solid transparent;
}
#zhezhao:hover {
  cursor: move;
}
.img_x {
  width: 350px;
  height: 77px;
  border: 1px solid #eee;
  margin-top: 20px;
  display: flex;
}
.img_x li {
  width: 54px;
  height: 54px;
  border: 2px solid transparent;
  margin: 8px 4px;
  padding: 2px;
}
.imgRight {
  position: absolute;
  right: -550px;
  top: 0;
  background-color: #fff;
}
.img_u {
  padding: 15px;
  width: 500px;
  height: 450px;
  border: 1px solid #eee;
  float: left;
  margin-left: 15px;
  overflow: hidden;
  display: none;
}
</style>
