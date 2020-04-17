<template>
  <div class="layout">
      <div class="main-con">
        <keep-alive>
          <router-view class="layout-router"></router-view>
        </keep-alive>
      </div>
    <footer class="footer-con">
      <j-footer></j-footer>
    </footer>
  </div>
</template>

<script>
import JFooter from './footer'
export default {
  name: 'layout',
  components: {
    JFooter,
  }
}
</script>

<style lang="stylus" scoped>
@import "../assets/css/variable.styl"
.layout
  height 100%
  position relative
  transition all .6s
  .main-con
    position absolute
    left 0
    right 0
    bottom 0
    top 0
    margin-bottom 85*$unit
    .layout-router
      width 100%
      height 100%
.footer-con
    position fixed
    width 100%
    bottom 0
    height 85*$unit
</style>