<template>
  <div class="pin-entry">
    <div class="header con">
      <author :author="pin.user" :dateDis="pin.createdAt | dateDis"></author>
    </div>
    <div class="section con border-bottom-1px">
      <pin-info :pin="pin"></pin-info>
    </div>
    <div class="footer con">
      <three-op :like-count="pin.likeCount" :comment-count="pin.commentCount"></three-op>
    </div>
  </div>
</template>

<script>
import Author from '../author'
import ThreeOp from '../three-op'
import LinkView from '../link-view'
import PinInfo from '../pin-info'
export default {
  props: {
    pin: Object
  },
  components: {
    Author,
    ThreeOp,
    LinkView,
    PinInfo
  }
}
</script>

<style lang="stylus" scoped>
.pin-entry
  background #fff
  .section
    padding 30rem 20rem

</style>