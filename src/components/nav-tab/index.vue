<template>
  <div  class="nav-tab" ref="nav-tab">
    <div class="nav-content">
      <ul class="nav-list">
        <li @click="handleClick(i, $event)" ref="nav-item" class="nav-item" v-for="(item, i) in navList" :key="item.path.path || item.path">
          <router-link :to="item.path"><span class="text" :style="{color: getTitleColor(item.path)}">{{item.title}}</span></router-link>
        </li>
      </ul>
      <div class="bottom-line" :style="{width: `${lineWidth}px`, transform: `translateX(${lineLeft}px)`, backgroundColor: lineColor}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navList: Array,
    titleColor: String,
    lineColor: String,
    activeTitleColor: String
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
    
  },
  methods: {
    getTitleColor(path) {
      return path === this.$route.path ? this.activeTitleColor : this.titleColor
    },
    handleClick(i, e) {
      this.lineLeft = this.arr[i].left || e.currentTarget.offsetLeft
      this.lineWidth = this.arr[i].width || e.currentTarget.clientWidth
    },
    initArr() {
      let items = this.$refs["nav-item"]
      let arr = []
      let left = items[0].offsetLeft
      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (arr.length === 0) {
          arr.push({
            left: left,
            width: item.clientWidth
          })
          this.lineWidth = arr[0].width
        } else {
          arr.push({
            left: arr[i-1].left + arr[i-1].width,
            width: item.clientWidth
          })
        }
      }
      this.arr = arr
    },
    init() {
      this.initArr()
      let path = this.$route.path
      let { navList } = this
      for (let i = 0; i < navList.length; ++i) {
        if (navList[i].path === path || navList[i].path.path === path) {
          
          this.lineLeft = this.arr[i].left
          this.lineWidth = this.arr[i].width
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
          
          this.lineLeft = this.arr[i].left
          this.lineWidth = this.arr[i].width
          break
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-tab 
  background transparent
  width 100%
  overflow-x scroll
  height 100%
  &::-webkit-scrollbar {
    display: none;
  }
  .nav-content
    position relative
    display inline-block
    height 100%
    .nav-list
      display inline-flex
      align-items center
      white-space: nowrap
      height 100%
      min-height 75rem
      .nav-item
        padding 0 40rem
        font-size 30rem
        color #cfcfd3
        .router-link-active
          color #fff
    .bottom-line
      position absolute
      border-radius 2rem
      bottom 0
      height 6rem
      background #fff
      transition all 100ms
</style>