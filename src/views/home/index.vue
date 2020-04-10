<template>
    <div class="home">
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
            <nav-tab :nav-list="routeList"></nav-tab>
          </div>
          <div class="triangle-con">
            <div @click="goSpecialEdit" class="triangle"></div>
          </div>
        </div>
      </header>
      <section class="main">
        <router-transition prefix="/home">
          <keep-alive>
            <router-view v-if="routeKey" :key="routeKey" class="router"></router-view>
          </keep-alive>
        </router-transition>
        <div class="icon-add-con">
          <i class="iconfont icon-Add"></i>
        </div>
      </section>
    </div>
</template>

<script>
import SearchBox from '../../components/search-box'
import NavTab from '../../components/nav-tab'
import { defaultHomeRoutes } from '../../common/config'
import { mapState } from 'vuex'
export default {
  components: {
    SearchBox,
    NavTab,
  },
  data() {
    return {
      
    }
  },
  computed: {
    routeKey() {
      if (this.$route.path.startsWith('/home/')) {
        return this.$route.path
      }
    },
    ...mapState({
      routeList(state) {
        return defaultHomeRoutes.concat(state.homeRoutes.filter(item => item.show))
      }
    })
  },
  created() {
    
  },
  activated() {
    //  this.$router.replace(this.currentRoutePath)
  },
  deactivated() {
    console.log(this.$route.path)
    // this.currentRoutePath = this.$route.path
  },
  methods: {
    handleFocus(e) {
      // e.target.blur()
      // this.$router.push('/search')
    },
    goSpecialEdit() {
      this.$router.push({
        name: 'specialShowEdit',
        params: {
          stateKey: 'homeRoutes'
        }
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
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
      height 75rem
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
  .icon-add-con
    position fixed
    right 30rem
    bottom 120rem
    border-radius 50%
    width 110rem
    height 110rem
    background $primary-color
    text-align center
    color #fff
    line-height 110rem
    z-index 12
    .iconfont
      font-size 30rem
</style>