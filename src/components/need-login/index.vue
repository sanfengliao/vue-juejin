<template>
  <div class="need-login">
      <div class="iconfont-con">
        <i class="iconfont icon-yonghu"></i>
      </div>
      <div class="title">
        {{title}}
      </div>
      <div class="btn">
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
  height 400rem
  background #fff
  .iconfont-con
    margin-bottom 10rem
    .iconfont
      font-size 110rem
      color #e7e9e9
  .title
    color $gray-text-color
    font-size 30rem
    margin-bottom 30rem
  .btn
    padding 15rem 30rem
    font-size 30rem
    background-color $primary-color
    color #fff
</style>