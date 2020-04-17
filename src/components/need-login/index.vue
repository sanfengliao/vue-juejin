<template>
  <div class="need-login">
      <div class="iconfont-con">
        <i class="iconfont icon-yonghu"></i>
      </div>
      <div class="title">
        {{title}}
      </div>
      <div @click="goLogin" class="btn">
        登录/注册
      </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '关注的人发布的文章会出现在这里'
    }
  },
  methods: {
    goLogin() {
      this.$router.push({
        path: '/login',
        query: {
          from : this.$route.path
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.need-login
  display flex
  flex-direction column
  justify-content center
  align-items center
  height 400*$unit
  background #fff
  .iconfont-con
    margin-bottom 10*$unit
    .iconfont
      font-size 110*$unit
      color #e7e9e9
  .title
    color $gray-text-color
    font-size 30*$unit
    margin-bottom 30*$unit
  .btn
    padding 15*$unit 30*$unit
    font-size 30*$unit
    background-color $primary-color
    color #fff
</style>