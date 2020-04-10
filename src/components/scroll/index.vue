<template>
  <div ref="scroll-con" class="scroll-wrapper">
    <div :style="{display: scrollX ? 'inline-flex' : 'block'}" class="scroll-content">
      <slot></slot>
      <div v-show="loading && !loadFinish" class="loading-con">
        <loading size="80rem"></loading>
      </div>
    </div>
    <div v-show="refreshing"  class="refresh-con">
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
    probeType: {
      type: Number,
      default: 1
    },
    refreshing: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadFinish: {
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
    options: {
      type: Object,
      default: () => ({})
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
    this.scroll.finishPullDown()
    this.scroll.finishPullUp()
    this.$nextTick(() => {
      this.scroll.refresh()
    })
  },
  beforeDestroy() {
    if (this.onScroll) {
      this.scroll.off('scroll')
    }
  },
  methods: {
    initBScroll() {
      const { scrollX, scrollY, click, probeType, stopPropagation, options, onPullingUp, onPullingDown } = this
      let pullUpload = !!onPullingUp
      let pullDownRefresh = !!onPullingDown
      this.scroll = new BScroll(
        this.$refs['scroll-con'],
        {
          pullUpload,
          pullDownRefresh,
          ...options,
          scrollX,
          scrollY,
          click,
          probeType,
          stopPropagation
        }
      )
      if (onPullingUp) {
        this.scroll.on('pullingUp',  () => {
          if (!this.loading && !this.loadFinish) {
            onPullingUp()
          }
        })
      }
      if (onPullingDown) {
        this.scroll.on('pullingDown',  () => {
          if (!this.refreshing) {
            onPullingDown() 
          }
        })
      }
      // if (this.onScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      // }
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
.scroll-wrapper
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