<template>
  <div class="tag-item-con">
    <div class="icon" :style="{backgroundImage: `url(${tag.icon})`}"></div>
    <div class="tag-info">
      <div class="tag-name">{{tag.title}}</div>
      <div class="tag-other">
        <span class="tag">{{tag.subscribersCount}}人关注</span>
        <span class="tag"> · </span>
        <span class="tag">{{tag.entryCount}}篇文章</span>
      </div>
    </div>
    <div class="btn-con">
      <div @click.stop.prevent="follow" class="follow" :class="{'active': tag.isSubscribe}">
        <i class="iconfont" :class="{'icon-Add1': !tag.isSubscribe, 'icon-dui': tag.isSubscribe}"></i>
        <span class="text">关注</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: Object
  },
  methods: {
    follow() {
      this.$emit('follow', this.tag)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tag-item-con
  display flex
  padding 10*$unit 20*$unit
  background #fff
  align-items center
  .icon
    margin-right 20*$unit
    width 80*$unit
    height 80*$unit
    border-radius 50%
    background-size cover
    background-repeat no-repeat
    background-position 50%
  .tag-info
    display flex
    flex-direction column
    justify-content space-between
    flex 1
    width 0
    margin-right 20*$unit
    .tag-name
      font-size 32*$unit
      color #333
      font-weight 600
    .tag-other
      font-size 25*$unit
      color #909090
</style>