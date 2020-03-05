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
    </header>
  </div>
</template>

<script>
import SearchBox from '../../components/search-box'
export default {
  components: {
    SearchBox
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
</style>