<template>
  <div class="nav-tab" ref="nav-tab">
    <div class="nav-content">
      <ul class="nav-list">
        <li @click="handleClick(i)" ref="nav-item" class="nav-item" v-for="(item, i) in navList" :key="item.path">
          <router-link :to="item.path"><span class="text">{{item.title}}</span></router-link>
        </li>
      </ul>
      <div class="bottom-line" :style="{width: `${lineWidth}px`, transform: `translateX(${lineLeft}px)`}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navList: Array,
  },
  data() {
    return {
      lineLeft: 0,
      lineWidth: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handleClick(i) {
     this.lineLeft = this.arr[i].left
     this.lineWidth = this.arr[i].width
    },
    initArr() {
      let items = this.$refs["nav-item"]
      let arr = []
      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (arr.length === 0) {
          arr.push({
            left: 0,
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
        if (navList[i].path === path) {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-tab 
  background transparent
  width 100%
  overflow-x scroll
  &::-webkit-scrollbar {
    display: none;
  }
  .nav-content
    position relative
    display inline-block
    .nav-list
      display inline-flex
      white-space: nowrap
      padding-bottom 20rem
      min-width  710rem
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
      height 8rem
      background #fff
      transition all 100ms
</style>