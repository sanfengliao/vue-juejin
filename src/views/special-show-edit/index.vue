<template>
  <div class="special-show-edit">
    <header @click="goBack" class="header">
      <div class="icon-con">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <h2 class="title">{{title}}</h2>
    </header>
    <section class="section">
      <ul class="route-list">
        <li ref="routes" class="route-item" v-for="(item, i) in routeObjs" :key="item.path">
          <div class="left">
            <div @touchstart="touchStart(i, $event)" @touchmove="touchMove(i, $event)" @touchend="touchEnd(i, $event)" class="icon-con">
              <i class="iconfont icon-caidan"></i>
            </div>
            <span class="title">{{item.title}}</span>
          </div>
          <div class="right" @click="handleClick(item)">
            <j-switch :checked="item.show"></j-switch>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import JSwitch from '../../components/switch'
export default {
  data() {
    return {
      routeObjs: [],
      title: ''
    }
  },
  components: {
    JSwitch
  },
  created() {
    let { stateKey = 'homeRoutes', title= '首页特别展示', routeAction='setHomeRoutes', routeIndexAction='setHomeRouteIndex' } = this.$route.params
    this.routeAction = routeAction,
    this.routeIndexAction = routeIndexAction
    this.stateKey = stateKey
    this.routeObjs = this.$store.state[stateKey]
    this.title= title
  },
  mounted() {
    this.routes = this.$refs['routes']
    this.itemHeight = this.routes[0].offsetHeight
    this.translates = this.routes.map(i => 0)
    // 元素在哪个位置
    this.indexToLoc = this.routes.map((item, i) => i)
    // 某个位置是哪个位置
    this.locToIndex = this.routes.map((item, i) => i)
  },
  methods: {
    goBack() {
      let newRouteObjs = []
      let { routeObjs } = this
      for (let item of this.indexToLoc) {
        newRouteObjs.push({
          path: routeObjs[item].path,
          title: routeObjs[item].title,
          show: routeObjs[item].show,
        })
      }
     let routeIndex = {}
     for (let i = 0; i < newRouteObjs.length; ++i) {
       routeIndex[newRouteObjs[i].path] = i + 1
     }
      
      this.$store.dispatch(this.routeAction, newRouteObjs)
      this.$store.dispatch(this.routeIndexAction, routeIndex)
      this.$router.go(-1)
    },
    handleClick(item) {
      item.show = !item.show
    },
    touchStart(i, e) {
      this.touches = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
      for (let item of this.routes) {
        item.style.zIndex = 0
      }
      this.routes[i].style.zIndex = 1
    },
    touchMove(i, e) {
      let clientY = e.changedTouches[0].clientY
      let disY = clientY - this.touches.y
      let liDom = this.routes[i]
      liDom.style.transform = `translateY(${this.translates[i] + disY}px)`
      if (disY >= this.itemHeight) {
        disY = this.itemHeight
        let currentLoc = this.indexToLoc[i]
        if (currentLoc === this.routes.length - 1) {
          return
        }
        let otherLoc = currentLoc + 1
        // 当前item的下一位item
        let otherIndex = this.locToIndex[currentLoc + 1]
        this.switchItem(i, currentLoc, otherIndex, otherLoc, disY)
        this.touches.y = clientY
      } else if (disY <= -this.itemHeight) {
        disY = - this.itemHeight
        // 当前item所在位置
        let currentLoc = this.indexToLoc[i]
        if (currentLoc === 0) {
          return
        }
        let otherLoc = currentLoc - 1
        // 当前item的上一位item
        let otherIndex = this.locToIndex[otherLoc]
        this.switchItem(i, currentLoc, otherIndex, otherLoc, disY)
        this.touches.y = clientY
      }
    },
    touchEnd(i, e) {
      for (let i = 0; i < this.routes.length; ++i) {
        this.translates[i] = (this.indexToLoc[i] - i) * this.itemHeight
        this.routes[i].style.transform = `translateY(${this.translates[i]}px)`
      }
    },
    switchItem(currentIndex, currentLoc, otherIndex, otherLoc, disY) {
      this.routes[otherIndex].style.transform = `translateY(${this.translates[otherIndex] - disY}px)`
      this.indexToLoc[currentIndex] = otherLoc
      this.locToIndex[otherLoc] = currentIndex

      this.indexToLoc[otherIndex] = currentLoc
      this.locToIndex[currentLoc] = otherIndex

      this.translates[currentIndex] += disY
      this.translates[otherIndex] -= disY
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl";
.header
  position relative
  z-index 20
  display flex
  padding 0 20*$unit
  flex 0 0 105*$unit
  background $primary-color
  line-height 105*$unit
  .icon-con
    margin-right 30*$unit
    .iconfont
      border-radius 50%
      padding: 15*$unit
      font-size 35*$unit
      color #fff
      &:active
        background #046bd2
  .title
    font-size 40*$unit
    font-weight 500
    color #fff
.section
  .route-list
    .route-item
      display flex
      align-items center
      position relative
      justify-content space-between
      padding 0 35*$unit
      height 114*$unit
      width 100%
      border-bottom 1px solid $border-color
      background #fff
      .left
        display flex
        align-items center
        .icon-con
          margin-right 45*$unit
          .iconfont
            color #000
        .title
          font-size 32*$unit
          font-weight 500
</style>