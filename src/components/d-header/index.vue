<template>
  <div class="d-header con">
    <div class="left">
      <slot name="left">
        <i @click="back" class="iconfont icon-fanhui"></i>
      </slot>
    </div>
    <div class="center">
      <slot class="title">
        <h2 class="title">{{title}}</h2>
      </slot>
    </div>
    <div class="right">
      <slot name="right">
        <i @click="onShare" class="iconfont icon-unie644"></i>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '文章详情页'
      },
      onShare: {
        type: Function,
        default: () => () =>{}
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
.d-header
  height 105rem
  display flex
  align-items center
  .left
    flex 0 0 35rem
    display flex
    align-items center
    margin-right 30rem
    height 100%
  .center
    display flex
    align-items center
    width 0
    flex 1
    height 100%
    .title
      font-size 40rem
      font-weight 500
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
  .right
    display flex
    align-items center
    flex 0 0 35rem
    height 100%
    margin-left 30rem
  .iconfont
      border-radius 50%
      padding: 15rem
      font-size 35rem
      &:active
        background #d6d4d4
    
</style>