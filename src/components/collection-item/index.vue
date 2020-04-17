<template>
  <div class="collection-item-con">
    <div class="bgImg" :style="{backgroundImage: `url(${collection.bgImg.url})`}"></div>
    <div class="collection-info">
      <div class="title">{{collection.title}}</div>
      <div class="other">
        <span>{{collection.entryCount}}篇 · </span>
        <span>{{collection.followCount}}关注 · </span>
        <span>{{collection.user.username}}</span>
      </div>
    </div>
    <div class="iconfont-con">
      <i class="iconfont icon-go1"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collection: Object
  }
}
</script>

<style lang="stylus" scoped>
.collection-item-con
  padding 20*$unit
  display flex
  background #fff
  align-items center
  .bgImg
    margin-right 20*$unit
    width 100*$unit
    height 100*$unit
    border-radius 10*$unit
    background-size cover
    background-repeat no-repeat
    background-position 50%
  .collection-info
    display flex
    flex-direction column
    justify-content space-between
    margin-right 20*$unit
    flex 1
    width 0
    height 90*$unit
    .title
      color #333
    .other
      font-size 25*$unit
      color #909090
  .iconfont-con
    .iconfont
      font-size 40*$unit
</style>