<template>
  <div ref="scroll-con" class="scroll-con">
    <div :style="{display: scrollX ? 'inline-flex' : 'block'}" class="scroll-content">
      <slot></slot>
      <div v-if="isLoading" class="loading-con">
        <loading size="80rem"></loading>
      </div>
    </div>
    <div v-if="refreshing"  class="refresh-con">
      <refresh size="80rem"></refresh>
    </div>
  </div>
</template>

<script>
import Loading from '../loading'
import Refresh from '../refresh'

import BScroll from 'better-scroll'
export default {
  props: {
    data: {
      type: [Object, String, Array]
    },
    click: {
      type: Boolean,
      default: true
    },
    pullUpLoad: {
      type: Object,
      default: () => ({threshold: 50})
    },
    pullDownRefresh: {
      type: Object,
      default: () => ({
        threshold: 50,
        stop: 20
      })
    },
    probeType: {
      type: Number,
      default: 1
    },
    refreshing: {
      type: Boolean,
      default: false
    },
    onPullingUp: Function,
    onPullingDown: Function,
    onScroll: Function,
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    stopPropagation: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    Loading,
    Refresh,
  },
  mounted() {
    this.initBScroll()
  },
  updated() {
    this.refreshing && this.scroll.finishPullDown()
    this.$nextTick(() => {
      this.scroll.refresh()
    })
  },
  methods: {
    initBScroll() {
      this.scroll = new BScroll(
        this.$refs['scroll-con'],
        {
          scrollX: this.scrollX,
          scrollY: this.scrollY,
          click: true, 
          pullUpLoad: this.pullUpLoad || {},
          pullDownRefresh: this.pullDownRefresh || {},
          probeType: this.probeType,
          stopPropagation: this.stopPropagation,
          ...this.config
        }
      )
      if (this.onPullingUp && typeof this.onPullingUp === 'function') {
        this.scroll.on('pullingUp', async () => {
          this.isLoading = true
          let result = this.onPullingUp()
          if (this.isPromise(result)) {
            result.then(() => {
              this.scroll.finishPullUp()
              this.isLoading = false
            })
          } else {
            this.scroll.finishPullUp()
            this.isLoading = false
          }
        })
      }
      if (this.onPullingDown && typeof this.onPullingDown === 'function') {
        this.scroll.on('pullingDown', async () => {
          console.log('pullingdown')
          this.onPullingDown() 
        })
      }
      if (this.onScroll && typeof this.onScroll === 'function') {
        this.scroll.on('scroll', this.onScroll)
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    isPromise(x) {
      return x instanceof Promise || (typeof x === 'object' && typeof x.then === 'function')
    }
  },
}
</script>

<style lang="stylus" scoped>
.scroll-con
  position relative
  width 100%
  height 100%
  overflow hidden
  white-space nowrap
  .loading-con
    width 100%
    display flex
    justify-content center
  .refresh-con
    width 80rem
    position absolute
    top 50rem
    left 50%
    transform translateX(-50%)
</style>