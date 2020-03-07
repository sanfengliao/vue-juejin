<template>
    <div class="home">
      <transition name="header">
        <header class="header con">
          <div class="header-top">
            <div class="search-con">
              <search-box @focus="handleFocus" />
            </div>
            <div class="tag-setting-con">
              <i class="iconfont icon-shezhi"></i>
              <span>标签</span>
            </div>
          </div>
          <div class="header-bottom">
            <div class="nav-tab-con">
              <nav-tab :nav-list="navList"></nav-tab>
            </div>
            <div class="triangle-con">
              <div class="triangle"></div>
            </div>
          </div>
        </header>
      </transition>
      <transition name="main">
        <section class="main">
          <router-view :key="$route.path"></router-view>
        </section>
      </transition>
    </div>
</template>

<script>
import SearchBox from '../../components/search-box'
import NavTab from '../../components/nav-tab'
import { homePathText } from '../../router/home'

export default {
  components: {
    SearchBox,
    NavTab
  },
  data() {
    return {
      navList: homePathText
    }
  },
  created() {
    
  },
  methods: {
    handleFocus(e) {
      e.target.blur()
      this.$router.push('/search')
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/common.styl"
.home
  height 100%
  position relative
.header
  display flex
  flex-direction column
  justify-content space-between
  height 148rem
  background $primary-color
  .header-top
    display flex
    padding-top 15rem 
    height 75rem
    .search-con
      flex 1
      height 100%
    .tag-setting-con
      flex 0 0 120rem
      display flex
      align-items center
      justify-content space-around
      padding-left 20rem
      height 100%
      color #fff
      font-size 30rem
      .iconfont
        font-size 30rem
  .header-bottom
    display flex
    align-items center
    width 100%
    .nav-tab-con
      flex 1
      overflow hidden
    .triangle-con
      padding-left: 30rem
      flex 0 0 30rem
      .triangle
        width 0
        height 0
        border: 15rem solid transparent
        border-top: 15rem solid #fff
.main
  position absolute
  top 148rem
  bottom 0
  width 100%
.header-enter
  transform translateY(-75rem)
.header-enter-active
  transform all .5s
.main-enter
  transform translateY(-75rem)
.main-enter-active
  transform all .5s
</style>