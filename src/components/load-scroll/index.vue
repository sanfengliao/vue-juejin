<template>
  <div class="load-scroll" ref="container">
    <div class="content" ref="content">
      <slot></slot>
    </div>
    <div v-if="loading || isLoading" class="loading-con">
      <span v-if="loadFinish">没有更多了</span>
      <loading v-else size="80rem"></loading>
    </div>
  </div>
</template>

<script>
import Loading from '../loading'
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    loadFinish: {
      type: Boolean,
      default: true
    },
    loadMore: Function
  },
  data() {
    return {
      loading: this.isLoading
    }
  },
  components: {
    Loading
  },
  mounted() {
    this.$container = this.$refs['container']
    this.containerHeight = this.$container.clientHeight
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
      if (scrollTop >= this.$content.clientHeight - this.containerHeight - 20) {
        this.$emit('scrollEnd', e)
        if (!this.loadFinish) {
          if (this.loadMore) {
            this.loading = true
            let result = this.loadMore()
            if (result instanceof Promise) {
              result.then(() => this.loading = false)
            } else {
              this.loading = false
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.load-scroll
  height 100%
  overflow scroll
  .loading-con
    display flex
    justify-content center
    align-items center
    height 100rem
    background-color #fff
    font-size 25rem
    color #666
</style>