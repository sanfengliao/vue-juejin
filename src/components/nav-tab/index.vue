<template>
  <div class="nav-tab" :style="{backgroundColor: backgroundColor}">
    <ul class="nav-list">
      <li @click="handleClick(i, $event)" ref="nav-item" class="nav-item" v-for="(item, i) in navList" :key="item.path.path || item.path">
        <router-link :to="item.path"><span class="text" :style="{color: getTitleColor(item.path)}">{{item.title}}</span></router-link>
      </li>
    </ul>
    <div class="bottom-line" :style="{width: `${lineWidth}px`, transform: `translateX(${lineLeft}px)`, backgroundColor: lineColor}"></div>
  </div>
</template>

<script>
export default {
  props: {
    navList: Array,
    titleColor: String,
    lineColor: String,
    activeTitleColor: String,
    backgroundColor: String
  },
  data() {
    return {
      lineLeft: 0,
      lineWidth: 0
    }
  },
  mounted() {
    this.init()
    // let dom = this.$refs['nav-tab']
    // let observer = new MutationObserver(() => {
    //   console.log('change')
    // })
    // observer.observe(dom, {attributes: true})
  },
  updated() {
    // this.init()
  },
  methods: {
    getTitleColor(path) {
      return path === this.$route.path ? this.activeTitleColor : this.titleColor
    },
    handleClick(i, e) {
      this.lineLeft = e.currentTarget.offsetLeft
      this.lineWidth = e.currentTarget.clientWidth
    },
    init() {
      this.$navItems = this.$refs['nav-item']
      let path = this.$route.path
      let { navList } = this
      for (let i = 0; i < navList.length; ++i) {
        console.log(navList[i].path, path)
        if (navList[i].path === path || navList[i].path.path === path) {
          
          this.lineLeft = this.$navItems[i].offsetLeft
          this.lineWidth = this.$navItems[i].clientWidth
          break
        }
      }
    }
  },
  watch: {
    navList() {
      this.$nextTick(() => {
        this.init()
      })
    },
    $route() {
      let path = this.$route.path
      let { navList } = this
      for (let i = 0; i < navList.length; ++i) {
        if (navList[i].path === path || navList[i].path.path === path) {
          
          this.lineLeft = this.$navItems[i].offsetLeft
          this.lineWidth = this.$navItems[i].offsetParent
          break
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-tab
  position relative
  display inline-block
  background $primary-color
  .nav-list
    display flex
    align-items center
    white-space: nowrap
    .nav-item
      padding 20*$unit 30*$unit
      font-size 32*$unit
      color #cfcfd3
      .router-link-active
        color #fff
  .bottom-line
    position absolute
    border-radius 2*$unit
    bottom 0
    height 6*$unit
    background #fff
    transition all 100ms
</style>