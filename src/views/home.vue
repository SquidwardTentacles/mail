<template>
  <div class="home">
    <navList />
    <router-view></router-view>
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
}
</style>
