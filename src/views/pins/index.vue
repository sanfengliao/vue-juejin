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
export default {
  computed: {
    routeKey() {
      if (this.$route.path.startsWith('/pins/')) {
        return this.$route.path
      }
    },
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
    height 85rem
    overflow hidden
  .triangle-con
    padding-left: 30rem
    flex 0 0 30rem
    .triangle
      width 0
      height 0
      border: 15rem solid transparent
      border-top: 15rem solid #fff
.icon-add-con
  position fixed
  right 30rem
  bottom 120rem
  border-radius 50%
  width 110rem
  height 110rem
  background $primary-color
  text-align center
  line-height 110rem
  z-index 12
  .iconfont
    font-size 30rem
.main
  position absolute
  top 85rem
  bottom 0
  width 100%
</style>