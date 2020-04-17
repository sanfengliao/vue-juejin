<template>
  <div class="pin">
    <header class="pin-header con">
      <div class="nav-tab-con">
        <nav-tab :nav-list="routeList"></nav-tab>
      </div>
      <div class="triangle-con">
        <div @click="goSpecialEdit" class="triangle"></div>
      </div>
    </header>
    <section class="main">
      <keep-alive>
        <router-view :key="routeKey"></router-view>
      </keep-alive>
      <div class="icon-add-con">
        <i class="iconfont icon-edit"></i>
      </div>
    </section>
  </div>
</template>

<script>
import NavTab from '../../components/nav-tab'
import { defaultPinsRoutes } from '../../common/config'
import { mapState } from 'vuex'
let path = window.location.pathname
path = path.startsWith('/pins/') ? path : '/pins/recommended'
export default {
  data() {
    return {
      routeKey: path
    }
  },
  computed: {
    ...mapState({
      routeList(state) {
        return defaultPinsRoutes.concat(state.pinsRoutes.filter(item => item.show))
      }
    })
  },
  components: {
    NavTab
  },
  methods: {
    goSpecialEdit() {
      this.$router.push({
        name: 'specialShowEdit',
        params: {
          stateKey: 'pinsRoutes',
          title: '话题特别展示'
        }
      })
    }
  },
  watch: {
    $route() {
      let { path } = this.$route
      if (path.startsWith('/pins/')) {
        this.routeKey = path
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.pin-header
  display flex
  align-items center
  width 100%
  background $primary-color
  .nav-tab-con
    flex 1
    height 85*$unit
    overflow hidden
  .triangle-con
    padding-left: 30*$unit
    flex 0 0 30*$unit
    .triangle
      width 0
      height 0
      border: 15*$unit solid transparent
      border-top: 15*$unit solid #fff
.icon-add-con
  position fixed
  right 30*$unit
  bottom 120*$unit
  border-radius 50%
  width 110*$unit
  height 110*$unit
  background $primary-color
  text-align center
  color #fff
  line-height 110*$unit
  z-index 12
  .iconfont
    font-size 30*$unit
.main
  position absolute
  top 85*$unit
  bottom 0
  width 100%
</style>