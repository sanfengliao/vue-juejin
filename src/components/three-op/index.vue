<template>
  <div class="three-op">
    <div class="op-item" :class="{active: isLike}" @click.stop.prevent="like">
      <i class="iconfont" :class="isLike ? 'icon-dianzan1' : 'icon-dianzan'"></i>
      <span class="text">{{likeCount > 0 ? likeCount : '点赞'}}</span>
    </div>
    <div class="op-item" @click.stop.prevent="comment">
      <i class="iconfont icon-pinglun"></i>
      <span class="text">{{commentCount > 0 ? commentCount : '评论'}}</span>
    </div>
    <div class="op-item" @click.stop.prevent="share">
      <i class="iconfont icon-fenxiang"></i>
      <span class="text">分享</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLike: Boolean,
    likeCount: Number,
    commentCount: Number
  },
  methods: {
    like() {
      this.$emit('like')
    },
    comment() {
      this.$emit('comment')
    },
    share() {
      this.$emit('share')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.three-op
  display flex
  .op-item
    flex 1
    height 80*$unit
    line-height 80*$unit
    color $gray-text-color
    text-align center
    font-size 25*$unit
    &.active
      color $primary-green-color
    .iconfont
      margin-right 10*$unit
      font-size 28*$unit
</style>