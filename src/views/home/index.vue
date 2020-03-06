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
          <nav-tab :nav-list="navList"></nav-tab>
        </div>
        <div class="triangle-con">
          <div class="triangle"></div>
        </div>
      </div>
    </header>
    <section class="main">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import SearchBox from '../../components/search-box'
import NavTab from '../../components/nav-tab'
export default {
  components: {
    SearchBox,
    NavTab
  },
  data() {
    return {
      navList: [{
        path: '/home/1',
        text: '推荐'
      }, {
        path: '/home/2',
        text: '后端',
      }, {
        path: '/home/3',
        text: '人工智能',
      }, {
        path: '/home/4',
        text: 'Android'
      }, {
        path: '/home/5',
        text: 'IOS',
      }, {
        path: '/home/6',
        text: '人工智能'
      }]
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

.header
  height 148rem
  background $primary-color
  display flex
  flex-direction column
  justify-content space-between
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
</style>