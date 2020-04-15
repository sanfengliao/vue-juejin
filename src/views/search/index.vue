<template>
  <div class="search">
    <header class="search-header">
      <d-header :go-back="goBackAndRemoveKeepAlive">
        <div class="input-box">
          <form class="search-form" @submit.prevent="search">

            <input v-model="query" class="search-input" type="text" placeholder="搜索文章、用户、标签">
            
          </form>
        </div>
        <div slot="right">
          <i v-show="query" @click="clearQuery" class="iconfont  icon-chuyidong1-copy"></i>
        </div>
      </d-header>
    </header>
    <section class="search-section">
      <div v-show="!isSearch && this.history.length" class="search-history">
        <ul class="history-list" >
          <li class="history-item border-bottom-1px" @click="setQuery(item)" v-for="(item, i) in history" :key="item">
            <div class="left">
              <i class="iconfont icon-history"></i>
              <span>{{item}}</span>
            </div>
            <div class="right">
              <i class="iconfont icon-chuyidong1-copy" @click.stop="deleteItem(i)"></i>
            </div>
          </li>
        </ul>
        <div @click="clearHistory" class="clear-history border-bottom-1px">
          清空搜索记录
        </div>
      </div>
      <div v-show="isSearch" class="search-result">
        <div class="nav-tab-con">
          <nav-tab :nav-list="navList" />
        </div>
        <keep-alive>
          <router-view v-if="routerKey" class="search-router" :key="routerKey">

          </router-view>
        </keep-alive>
      </div>
    </section>
  </div>
</template>

<script>
import DHeader from '../../components/d-header'
import NavTab from '../../components/nav-tab'
import { keepAliveMixin } from '../../mixins'
const HISTORY_KEY = 'history_key'

export default {
  name: 'search',
  mixins: [keepAliveMixin],
  data() {
    return {
      query: '',
      history: [],
      isSearch: false, 
      navList: [{
        title: '综合',
        path: '/search/all'
      },{
        title: '文章',
        path: '/search/article'
      },{
        title: '标签',
        path: '/search/tag'
      },{
        title: '用户',
        path: '/search/user'
      }]
    }
  },
  components: {
    DHeader,
    NavTab
  },
  computed: {
    routerKey() {
      if (this.$route.path.startsWith('/search/')) {
        return this.$route.path
      }
    }
  },
  created() {
    this.init()
  },
  beforeDestroy() {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history))
  },
  methods: {
    init() {
      this.history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
    },
    search() {
      if (this.query) {
        this.$store.dispatch('setQuery', this.query)
        this.isSearch = true
        if (this.history.indexOf(this.query) === -1) {
          this.history.unshift(this.query)
          localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history))
        }
      }
    },
    setQuery(item) {
      this.query = item
      this.search()
    },
    clearQuery() {
      this.query = ''
      this.isSearch = false
    },
    clearHistory() {
      this.history = []
      localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history))
    },
    deleteItem(i) {
      this.history.splice(i, 1)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history))
    },
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.search
  display flex
  flex-direction column
.search-header
  .d-header
    color #fff
    background $primary-color

    .input-box
      width 100%
      .search-input
        padding 10rem 0
        width 100%
        color #fff
        font-size 36rem
        background transparent
        &::placeholder
          color #ccc
          font-size 36rem
    .iconfont
      font-size 50rem
      color #eee
.search-section
  position relative
  flex 1
  height 0
  .search-history
    position absolute
    width 100%
    .history-item
      display flex
      align-items center
      justify-content space-between
      padding 15rem 20rem
      font-size 36rem
      .left
        .iconfont
          margin-right 20rem
      .iconfont
        font-size 38rem
    .clear-history
      padding 0 20rem
      font-size 30rem
      color #333
      text-align center
  .search-result
    height 100%
    display flex
    flex-direction column
    .nav-tab-con
      background $primary-color
      /deep/ .nav-content, /deep/ .nav-list
        width 100% !important
        .nav-item
          flex 1
          text-align center
    .search-router
      flex 1
      height 0
</style>