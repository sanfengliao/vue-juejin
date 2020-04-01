<template>
  <div class="three-op">
    <div class="op-item">
      <i class="iconfont icon-dianzan"></i>
      <span class="text">{{likeCount > 0 ? likeCount : '点赞'}}</span>
    </div>
    <div class="op-item">
      <i class="iconfont icon-pinglun"></i>
      <span class="text">{{commentCount > 0 ? commentCount : '评论'}}</span>
    </div>
    <div class="op-item">
      <i class="iconfont icon-fenxiang"></i>
      <span class="text">分享</span>
    </div>
  </div>
</template>

<script>
// TODO
export default {
  props: {
    id: String,
    likeCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
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
    height 80rem
    line-height 80rem
    color $gray-text-color
    text-align center
    font-size 25rem
    .iconfont
      margin-right 10rem
      font-size 28rem
      color $gray-text-color
</style>