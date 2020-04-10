<template>
<transition name="test">

  <div class="layout">
      <div class="main-con">
        <keep-alive>
          <router-view class="router"></router-view>
        </keep-alive>
      </div>
   
    <div class="footer-con">
      <j-footer></j-footer>
    </div>
  </div>
</transition>
</template>

<script>
import JFooter from '../components/footer'
export default {
  name: 'layout',
  components: {
    JFooter,
  }
}
</script>

<style lang="stylus" scoped>
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
    margin-bottom 85rem
.footer-con
    position fixed
    bottom 0
    left 0
    right 0
    height 85rem
</style>