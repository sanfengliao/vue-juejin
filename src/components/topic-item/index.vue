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
  padding: 20rem
  .left
    margin-right 20rem
    .icon
      width 100rem
      height 100rem
      border-radius 10rem
      background-size cover
      background-position 50%
      background-repeat no-repeat
  .center
    flex 1
    width 0
    margin-right 20rem
    .title
      margin-bottom 5rem 
      font-size 35rem
    .info
      color #909090
      font-size 25rem
  .right
    .follow-btn
      width 100rem
      border-radius 25rem
      line-height 50rem
      text-align center
      font-size 28rem
      color #007fff
      background #eee
</style>