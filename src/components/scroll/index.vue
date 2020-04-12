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
    finished: {
      type: Boolean,
      default: false
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    pullUpload:{
      type: Boolean,
      default: true,
    },
    pullDownRefresh: {
      type: Boolean,
      default: true,
    },
    scrollY: {
      type: Boolean,
      default: true
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
    if (this.scroll) {
      this.scroll.off('scroll')
    }
  },
  methods: {
    initBScroll() {
      const { scrollX, scrollY, click, probeType, options, pullUpload, pullDownRefresh } = this
      this.scroll = new BScroll(
        this.$refs['scroll-con'],
        {
          scrollX,
          scrollY,
          click,
          probeType,
          pullUpload,
          pullDownRefresh,
          ...options,
        }
      )
     
      this.scroll.on('pullingUp',  () => {
        if (!this.loading && !this.finished) {
          this.$emit('load')
        }
      })
      
      
      this.scroll.on('pullingDown',  () => {
        if (!this.refreshing) {
          this.$emit('refresh') 
        }
      })
      
    
      this.scroll.on('scroll', (pos) => {
        this.$emit('scroll', pos)
      })
      
    },
    refresh() {
      this.scroll && this.scroll.refresh()
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