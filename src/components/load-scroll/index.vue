<template>
  <div class="load-scroll" ref="container">
    <div class="content" ref="content">
      <slot></slot>
    </div>
    <div v-if="showLoadingCon" ref="loading-con" class="loading-con">
      <div v-if="loading" class="text-con">
        <loading :size="80/36 + 'rem'"></loading>
      </div>
      <div v-if="showText" class="text-con">没有更多了</div>
    </div>
  </div>
</template>

<script>
import Loading from '../loading'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    loadMore: Function
  },
  data() {
    return {
      showText: false,
      showLoadingCon: true
    }
  },
  components: {
    Loading
  },
  mounted() {
    this.$container = this.$refs['container']
    this.containerHeight = this.$container.clientHeight
    this.loadingConHeight = this.$refs['loading-con'].clientHeight
    this.$content = this.$refs['content']
    this.$container.addEventListener('scroll', this.scroll)
  },
  destroyed() {
    this.$container.removeEventListener('scroll', this.scroll)
  },
  methods: {
    scroll(e) {
      this.$emit('scroll', e)
      let { scrollTop } = e.target
      if (scrollTop >= this.$content.clientHeight - this.containerHeight - this.loadingConHeight) {
        this.$emit('scrollEnd', e)
        if (!this.finished && !this.loading) {
          this.$emit('load')
        }
      }
    }
  },
  watch: {
    finished() {
      if (this.finished) {
        this.showText = true
        setTimeout(() => {
          this.showText = false
          this.showLoadingCon = false
        }, 1000)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.load-scroll
  height 100%
  overflow scroll
  &::-webkit-scrollbar
    display none
  .loading-con
    height 100*$unit
    .text-con
      display flex
      justify-content center
      align-items center
      height 100*$unit
      background-color #fff
      font-size 25*$unit
      color #666
</style>