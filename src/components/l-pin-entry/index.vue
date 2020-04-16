<template>
  <div class="pin-entry">
    <div class="header con">
      <m-author class="author" @toggleFollow="toggleFollow" :author="pin.user" :dateDis="pin.createdAt | dateDis"></m-author>
      <div class="iconfont-con">
        <i class="iconfont icon-unie644"></i>
      </div>
    </div>
    <div class="section con border-bottom-1px">
      <pin-info :pin="pin"></pin-info>
    </div>
    <div class="footer con">
      <three-op :is-like="pin.viewerHasLiked" :like-count="pin.likeCount" :comment-count="pin.commentCount" @like="like" @comment="comment" @share="share"></three-op>
    </div>
  </div>
</template>

<script>
import MAuthor from '../m-author'
import ThreeOp from '../three-op'
import LinkView from '../link-view'
import PinInfo from '../pin-info'
export default {
  props: {
    pin: Object
  },
  components: {
    MAuthor,
    ThreeOp,
    LinkView,
    PinInfo
  },
  methods: {
    like() {
      this.$emit('like', this.pin)
    },
    comment() {
      this.$emit('comment', this.pin)
    },
    share() {
      this.$emit('share', this.pin)
    },
    toggleFollow(author) {
      this.$emit('toggleFollow', author)
    }
  }
}
</script>

<style lang="stylus" scoped>
.pin-entry
  padding-top 20rem
  background #fff
  .header
    display flex
    align-items center
    .author
      margin-right 20rem
    .iconfont
      color #909090
  .section
    padding 30rem 20rem

</style>