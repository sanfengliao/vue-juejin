<template>
  <div id="app">
    <div class="main-con">
      <router-view />
    </div>
    <div class="footer-con">
      <j-footer></j-footer>
    </div>
  </div>
</template>

<script>
import JFooter from './components/footer'
export default {
  components: {
    JFooter
  }
}
</script>

<style lang="stylus">
@import "./assets/css/common.styl"
html,body,#app
  width 100%
  height 100%
  background $gray-color
#app
  padding-bottom 42.5px
.main-con
  height 100%
.footer-con
    position fixed
    bottom 0
    left 0
    right 0
    height 85rem
</style>