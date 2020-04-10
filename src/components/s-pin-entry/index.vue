<template>
  <div class="pin-l-entry-con">
    <div class="pin-content">
      <div class="content">
        <span class="recommend-icon" v-if="pin.isRecommend">荐</span>
        <span class="hot-icon" v-else>热</span>
        {{pin.content}}
      </div>
      <div v-if="pin.pictures && pin.pictures.length>0" class="picture" :style="{backgroundImage: `url(${pin.pictures[0]})`}"></div>
    </div>
    <div class="pin-info">
      <span class="pin-user-username">{{pin.user.username}}</span>
      <span class="pin-view-info">{{pin.likedCount}} 赞 · {{pin.commentCount}} 评论</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pin: Object
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.pin-l-entry-con
  display flex
  flex-direction column
  justify-content space-between
  height 100%
  min-width 665rem
  min-height 220rem
  padding 30rem 25rem 20rem
  background #fff
  .pin-content
    display flex
    .content
      flex 1
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      white-space pre-line
      word-break break-all
      margin-right 25rem
      width 0
      height 100%
      font-size 30rem
      .recommend-icon, .hot-icon
        display inline-block
        width 30rem
        height 30rem
        border-radius 5rem
        text-align center
        line-height 30rem
        color #fff
        background #f98e0c
        font-size 25rem
      .hot-icon
        background #f25d43
    .picture
      flex 0 0 100rem
      height 100rem
      border-radius 10rem
      background-size cover
      background-position 50%
      background-repeat no-repeat
  .pin-info
    color $gray-text-color
    .pin-user-username
      margin-right 25rem
</style>