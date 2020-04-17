<template>
  <div class="topic-item">
    <div class="left">
      <div class="icon" :style="{backgroundImage: `url(${topic.icon})`}"></div>
    </div>
    <div class="center">
      <div class="title">{{topic.title}}</div>
      <div class="info">
        <span>{{topic.followersCount}} 关注者</span>
        <span> · </span>
        <span>{{topic.msgsCount}} 沸点</span>
      </div>
    </div>
    <div class="right">
      <div @click.prevent.stop="follow" class="follow-btn">关注</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topic: Object
  },
  methods: {
    follow() {
      if (!this.$store.state.isLogin) {
        this.$router.push({
          path: '/login',
          query: {
            from: this.$route.path
          }
        })
        return
      }
      this.$emit('follow', this.topic)
    }
  }
}
</script>

<style lang="stylus" scoped>
.topic-item
  display flex
  align-items center
  background #fff
  padding: 20*$unit
  .left
    margin-right 20*$unit
    .icon
      width 100*$unit
      height 100*$unit
      border-radius 10*$unit
      background-size cover
      background-position 50%
      background-repeat no-repeat
  .center
    flex 1
    width 0
    margin-right 20*$unit
    .title
      margin-bottom 5*$unit 
      font-size 35*$unit
    .info
      color #909090
      font-size 25*$unit
  .right
    .follow-btn
      width 100*$unit
      border-radius 25*$unit
      line-height 50*$unit
      text-align center
      font-size 28*$unit
      color #007fff
      background #eee
</style>