const mixins = {
  data () {
    return {}
  },
  beforeMount () {
    let pathArr = [{ path: '/', name: '首页 >' }]
    let routerPath = this.$router.options.routes[0]
    routerPath.children.map(cur => {
      if (cur.path === this.$route.path) {
        let obj = {
          path: cur.path,
          name: cur.name
        }
        pathArr.push(obj)
        this.$store.commit('currentPathArrFunc', pathArr)
      }
    })
  }
}
export default mixins
