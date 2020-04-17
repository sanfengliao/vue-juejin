<template>
  <div class="footer">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link class="link-item" :to='homeRoute' replace><i class="iconfont icon-home"></i></router-link>
      </li>
      <li class="nav-item">
        <router-link class="link-item" :to='pinsRoute' replace><i class="iconfont icon-pin"></i></router-link>
      </li>
      <li class="nav-item">
       <router-link class="link-item" to='/sousou' replace><i class="iconfont icon-sousuo"></i></router-link>
      </li>
      <li class="nav-item">
        <router-link class="link-item" :to="booksRoute" replace><i class="iconfont icon-taizhangguanli-copy-copy"></i></router-link>
      </li>
      <li class="nav-item">
        <router-link class="link-item" to='/me' replace><i class="iconfont icon-yonghu"></i></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        homeRoute: '/home',
        pinsRoute: '/pins',
        booksRoute: '/books'
      }
    },
    watch: {
      $route() {
        if (this.$route.path.startsWith('/home/')) {
          this.homeRoute = this.$route.path
        } else if (this.$route.path.startsWith('/pins/')) {
          this.pinsRoute = this.$route.path
        } else if (this.$route.path.startsWith('/books/')) {
          this.booksRoute = this.$route.path
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl";
.footer
  box-shadow 0 1px 2px 0 rgba(0,0,0,.05)
  height 100%
  background #fff
  border-top 1*$unit solid $border-color
  .nav-list
    height 100%
    display flex
    justify-content space-between
    align-items center
    .nav-item
      flex 1
      display flex
      align-items center
      justify-content center
      height 100%
      $:active
        background #dcdbdb
      .iconfont
        color $text-color
        font-size 55*$unit
      .router-link-active
        .iconfont
          color $primary-color

</style>