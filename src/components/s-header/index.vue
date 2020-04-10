<template>
  <div class="s-header">
    <div @click="back" class="icon-con">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <h2 class="title">{{title}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '掘金'
    },
    goBack: Function
  },
  methods: {
    back() {
      if (this.goBack) {
        this.goBack()
      } else {
        this.$router.goBack()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.s-header
  display flex
  padding 0 20rem
  background $primary-color
  line-height 105rem
  .icon-con
    margin-right 30rem
    border-radius 50%
    .iconfont
      padding: 15rem
      font-size 35rem
      color #fff
      &:active
        background #046bd2
  .title
    font-size 40rem
    font-weight 500
    color #fff
</style>