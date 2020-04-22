<template>
  <div class="books-con">
    <header class="books-header">
      <div class="nav-tab-con scroll-with-no-bar">
        <nav-tab :nav-list="navList"></nav-tab>
      </div>
    </header>
    <section class="books-section">
      <router-transition prefix="/books" :route-index="routeIndex">
        <keep-alive>
          <router-view v-if="routeKey" :key="routeKey"></router-view>
        </keep-alive>
      </router-transition>
    </section>
  </div>
</template>

<script>
import { getBooks } from '../../api/book'
import NavTab from '../../components/nav-tab'
let path = window.location.pathname
path = path.startsWith('/books/') ? path : '/books/all'
export default {
  data() {
    return {
      navList: [{
        title: '全部',
        path: '/books/all'
      },{
        title: '已购',
        path: '/books/my'
      }],
      routeKey: path,
      routeIndex: {
        '/books/my': 1,
        '/books/all': 0
      }
    }
  },
  components: {
    NavTab
  },
  created() {
    
  },
  watch: {
    $route() {
      let { path } = this.$route
      if (path.startsWith('/books/')) {
        this.routeKey = path
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.books
  position relative
.books-header
  background $primary-color
  display flex
  justify-content center
.books-section
  position absolute
  top 85*$unit
  bottom 0
  width 100%
  
</style>