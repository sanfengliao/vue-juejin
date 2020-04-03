<template>
    <transition name="fade">
      <div class="message-box" v-show="visible">
        <!-- 输出消息 -->
        {{message}}
      </div>
    </transition>
</template>
<script>
export default {
    name: "messageMain",
    data() {
      return {
        visible: false, // 控制 DOM 显示隐藏
        message: 'juejin:请输入正确的手机号', // 默认的 message 为空, 由外部传入
        duration: 2000 // 默认显示时间为 2000ms
      }
    }
}
</script>

<style lang="stylus" scoped>


.message-box
  position fixed
  max-width 100%
  left 50%
  bottom 100px
  padding 12px
  border-radius 10px
  font-size 12px
  background #fff
  color #000
  transform translateX(-50%) scale(1)
  transform-origin bottom center
  z-index 1000
  white-space nowrap
  &.fade-leave-to 
    transform: translateX(-50%) scale(0)
    opacity 0
  &.fade-enter-active
    animation bounceIn .5s
  &.fade-leave-active
    transition all .3s

@keyframes bounceIn {
  0% {
    transform: translateX(-50%) scale(0);
  }
  50% {
    transform: translateX(-50%) scale(1.05);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}


</style>