<template>
  <div class="nav-tab" ref="nav-tab">
    <div class="nav-content">
      <ul class="nav-list">
        <li @click="handleClick(i)" ref="nav-item" class="nav-item" v-for="(item, i) in navList" :key="item.path">
          <router-link :to="item.path"><span class="text">{{item.text}}</span></router-link>
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
    let items = this.$refs["nav-item"]
    let arr = []
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      console.log(item.clientWidth)
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
    console.log(arr)
    this.arr = arr
  },
  methods: {
    handleClick(i) {
     this.lineLeft = this.arr[i].left
     this.lineWidth = this.arr[i].width
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
        flex 1
        padding 0 40rem
        font-size 30rem
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