<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted () {
    // 检查用户信息
    let userSes = sessionStorage.getItem('userSesson');
    if (userSes) {
      this.$store.commit('userSesFunc', JSON.parse(userSes))
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.width {
  max-width: 1100px;
  min-width: 900px;
  margin: 0 auto;
}
html,
body {
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
}
.flexbox {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.flexbox.between {
  justify-content: space-between;
}
.flexbox.a-start {
  align-items: flex-start;
}
.flexbox.j-end {
  justify-content: flex-end;
}
.flexbox.j-start {
  justify-content: flex-start;
}
.flexbox.j-center {
  justify-content: center;
}
.flexbox.a-start {
  align-items: start;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
p,
h1,
h2,
h3 {
  margin: 0;
  padding: 0;
}
input {
  border: none;
  outline: none;
}
li {
  margin-bottom: 0;
  list-style: none;
}
ul {
  padding: 0;
  margin: 0;
}
.prohibitChoose {
  // 禁止浏览器选中文字
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
