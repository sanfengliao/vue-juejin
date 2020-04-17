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
  padding 0 20*$unit
  background $primary-color
  line-height 105*$unit
  .icon-con
    margin-right 30*$unit
    border-radius 50%
    .iconfont
      padding: 15*$unit
      font-size 35*$unit
      color #fff
      &:active
        background #046bd2
  .title
    font-size 40*$unit
    font-weight 500
    color #fff
</style>