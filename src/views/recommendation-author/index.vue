<template>
  <div class="recommendation-author">
    <header class="recommendation-author-header">
      <d-header :go-back="goBackAndRemoveKeepAlive">
        <div class="title">作者榜</div>
        <div slot="right">
          <router-link to="/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022">
           排名规则
          </router-link>
        </div>
      </d-header>
    </header>
    <section class="recommendation-author-section">
      <div class="nav-tab-con">
        <nav-tab :nav-list="navList" />
      </div>
      <div class="main">
        <keep-alive>

          <router-view :key="routeKey">

          </router-view>
        </keep-alive>
      </div>
    </section>
  </div>
</template>

<script>
import DHeader from '../../components/d-header'
import NavTab from '../../components/nav-tab'
import { getRecommendedAuthorChannel } from '../../api/user'
let path = window.location.pathname
path = path.startsWith('/recommendation/authors/') ? path : '/recommendation/authors/recommended'
import { keepAliveMixin } from '../../mixins'
export default {
  name: 'recommendation-author',
  mixins: [keepAliveMixin],
  data() {
    return {
      navList: [],
      routeKey: path
    }
  },
  components: {
    DHeader,
    NavTab
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getRecommendedAuthorChannel()
    },
    async getRecommendedAuthorChannel() {
      let data = await getRecommendedAuthorChannel()
      let { channels } = data.data.articleAuthorRecommendationChannelCard
      for (let item of channels) {
        this.navList.push({
          path: `/recommendation/authors/${item.name}`,
          title: item.title
        })
      }
    }
  },
  watch: {
    $route() {
      let { path } = this.$route
      if (path.startsWith('/recommendation/authors/')) {
        this.routeKey = path
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.recommendation-author
  display flex
  flex-direction column
.recommendation-author-header
  .d-header
    background $primary-color
    color #fff
    .title
      font-size 40rem
      // font-weight 
.recommendation-author-section
  display flex
  flex-direction column
  flex 1
  height 0
  .nav-tab-con
    background $primary-color
  .main
    flex 1
    height 0
</style>