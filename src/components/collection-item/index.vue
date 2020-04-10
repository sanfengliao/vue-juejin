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
  padding 20rem
  display flex
  background #fff
  align-items center
  .bgImg
    margin-right 20rem
    width 100rem
    height 100rem
    border-radius 10rem
    background-size cover
    background-repeat no-repeat
    background-position 50%
  .collection-info
    display flex
    flex-direction column
    justify-content space-between
    margin-right 20rem
    flex 1
    width 0
    height 90rem
    .title
      color #333
    .other
      font-size 25rem
      color #909090
  .iconfont-con
    .iconfont
      font-size 40rem
</style>