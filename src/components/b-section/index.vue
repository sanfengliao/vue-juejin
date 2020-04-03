<template>
  <div class="b-section-con">
    <div class="step">{{index}}</div>
    <div class="center">
      <div class="title">{{section.title}}</div>
      <div class="info">
        <span class="time">阅读时长: {{section.contentSize | readTime }}</span>
        <span class="view-count">{{section.pv}}次学习</span>
      </div>
    </div>
    <div class="aside">
      <div v-if="section.isFree" class="to-read">
        试读
      </div>
      <div v-else class="lock">
        <img class="img" src="https://b-gold-cdn.xitu.io/v3/static/img/lock.45f0927.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    section: Object,
    index: Number
  },
  filters: {
    readTime(value) {
      let minute = Math.floor(value / 600) - 1
      let second = parseInt(value % 600)
      let result = `${minute}分`
      if (second >= 300) {
        result += `${30}秒`
      }
      return result
    }
  },
}
</script>

<style lang="stylus" scoped>
.b-section-con
  background #fff
  padding 30rem 20rem
  display flex
  align-items center
  justify-content space-between
.step
  flex 0 0 40rem
  display flex
  align-items center
  justify-content center
  height 90rem
  margin-right 20rem
  font-size 28rem
  color #b5b7ba
.center
  flex 1
  width 0
  margin-right 20rem
  .title
    font-size 32rem
    color #000
    margin-bottom 5rem
  .info
    font-size 24rem
    color #b2bac2
    .time
      margin-right 24rem
.aside
  flex 0 0 70rem
  height 40rem
  .to-read
    width 100%
    height 100%
    border 1px solid #ff7600
    border-radius 4rem
    font-size 25rem
    text-align center
    line-height 40rem
    color #ff7600
  .lock
    text-align center
    .img
      width 25rem
      vertical-align bottom
</style>