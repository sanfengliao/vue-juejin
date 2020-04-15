<template>
  <div ref="scroll-con" class="scroll-wrapper">
    <div :style="{display: scrollX ? 'inline-flex' : 'block'}" class="scroll-content">
      <slot></slot>
      <!-- <div v-if="!finished" class="loading-container"> -->
        <div v-show="loading" class="loading-con">
          <loading size="80rem"></loading>
        </div>
      <!-- </div> -->
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
      type: [Boolean, Object],
      default: () => ({
        threshold: -30
      }),
    },
    pullDownRefresh: {
      type: [Boolean, Object],
      default: () => ({
        threshold: 30,
        // 回弹停留在距离顶部20px的位置
        stop: 20
      })
      // default: true
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
    if (!this.refreshing) {
      this.scroll.finishPullDown()
    }
    if (!this.loading) {
      this.scroll.finishPullUp()
    }
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
      this.scroll.on('touchEnd', (pos) => {
        if (pos.y > 50 && !this.refreshing) {
          this.$emit('refresh')
        }
      
      })
      this.scroll.on('scrollEnd', pos => {
        if (pos.y <= this.scroll.maxScrollY - 50 && !this.loading) {
          this.$emit('load')
        }
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
  .loading-container
    min-height 100rem
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