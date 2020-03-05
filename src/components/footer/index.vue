<template>
  <div class="footer">
    <ul class="nav-list">
      <li :class="{active: $route.path.startsWith('/home'), 'nav-item': true}">
        <router-link to='/home'><i class="iconfont icon-home"></i></router-link>
      </li>
      <li :class="{active: $route.path.startsWith('/pin'), 'nav-item': true}">
        <router-link to='/pin'><i class="iconfont icon-pin"></i></router-link>
      </li>
      <li :class="{active: $route.path.startsWith('/search'), 'nav-item': true}">
       <router-link to='/search'><i class="iconfont icon-sousuo"></i></router-link>
      </li>
      <li :class="{active: $route.path.startsWith('/books'), 'nav-item': true}">
        <router-link to='/books'><i class="iconfont icon-taizhangguanli-copy-copy"></i></router-link>
      </li>
      <li :class="{active: $route.path.startsWith('/user'), 'nav-item': true}">
        <router-link to='/user'><i class="iconfont icon-yonghu"></i></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    created() {
    }
  }
</script>

<style lang="stylus" scoped>
@import "../../assets/css/common.styl";
.footer
  box-shadow 0 1px 2px 0 rgba(0,0,0,.05)
  height 100%
  background #fff
  border-top 1rem solid $border-color
  padding: 0 40rem
  .nav-list
    height 100%
    display flex
    justify-content space-between
    align-items center
    .nav-item
      .iconfont
        color $text-color
      &.active
        .iconfont
          color $primary-color

</style>