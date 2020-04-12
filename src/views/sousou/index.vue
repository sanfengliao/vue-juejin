<template>
  <div class="sousou-con">
    <header class="sousou-header con">
      <search-box @focus="handleFocus"></search-box>
    </header>
    <section class="sousou-section">
      <load-scroll :load-more="loadMore" :load-finish="loadFinish" :is-loading="isLoading">
        <div class="sousou-content">
          <div class="activity-con">
            <div v-if="banner.length>0" class="banner-con">
              <swiper :options="{loop:true, autoplay: true}">
                <swiper-slide v-for="item in banner" :key="item.id">
                  <a class="banner-item" :href="item.url" :style="{backgroundImage: `url(${item.imageUrl})`}" ></a>
                </swiper-slide>
              </swiper>
            </div>
            <div class="nav-con">
              <div class="nav-item">
                <i class="iconfont icon-wenzhang"></i>
                <span class="title">文章榜</span>
              </div>
              <div class="nav-item">
                <i class="iconfont icon-huangguan"></i>
                <span class="title">作者榜</span>
                </div>
              <div class="nav-item">
                <i class="iconfont icon-kanyikantubiao"></i>
                <span class="title">看一看</span>
                </div>
              <div class="nav-item">
                <i class="iconfont icon-huati"></i>
                <span class="title">话题广场</span>
                </div>
              <div class="nav-item">
                <i class="iconfont icon-laba"></i>
                <span class="title">活动</span>
                </div>
            </div>
          </div>
          <div class="hot-article-con">
            <div class="hot-title-con con border-1px bottom">
              <div class="title">
                <i class="iconfont icon-hot1"></i>
                <span>热门文章</span>
              </div>
              <div class="setting">
                <i class="iconfont icon-setting"></i>
                <span>定制热门</span>
              </div>
            </div>
            <div class="hot-articles-con">
              <ul class="hot-article-list">
                <li class="hot-aritcle-item con border-bottom-1px" v-for="(item, i) in hotArticles" :key="i">
                  <router-link :to="`/post/${item.objectId}`">
                    <s-article-entry :article="item"></s-article-entry>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </load-scroll>
    </section>
  </div>
</template>

<script>
import SearchBox from '../../components/search-box'
import LoadScroll from '../../components/load-scroll'
import SArticleEntry from '../../components/s-article-entry'
import { getEventBanner, getEntryByRank } from '../../api/search'
export default {
  name: 'sousou',
  data() {
    return {
      banner: [],
      hotArticles: [],
      loadFinish: false,
      isLoading: false
    }
  },
  components: {
    SearchBox,
    LoadScroll,
    SArticleEntry
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getBanner()
      this.getEntryByRank()
    },
    handleFocus(e) {
      e.target.blur()
      this.$router.push('/search')
    },
    async getBanner() {
      let data = await getEventBanner()
      for (let item of data.data.advertisementCard.items) {
        this.banner.push({
          id: item.id,
          url: item.url,
          imageUrl: item.imageUrl
        })
      }
    },
    async getEntryByRank() {
      let data = await getEntryByRank(this.before)
      for (let item of data.d.entrylist) {
        this.hotArticles.push(item)
      }
      this.before = this.hotArticles[this.hotArticles.length - 1].rankIndex
    },
    async loadMore() {
      if (!this.isLoading) {
        
        await this.getEntryByRank()
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.sousou-con
  height 100%
  .sousou-header
    position fixed
    display flex
    align-items center
    width 100%
    height 85rem
    background $primary-color
  .sousou-section
    padding-top 85rem
    height 100%

.sousou-content
  .activity-con
    margin-bottom 20rem
    background #fff
  .hot-article-con
    background #fff
.activity-con
  .banner-item
    display block
    height 250rem
    background-size cover
    background-position 50%
    background-repeat no-repeat
  .nav-con
    display flex
    justify-content space-between
    align-items center
    padding 0 30rem
    height 150rem
    font-size 25rem
    .nav-item
      display flex
      flex-direction column
      align-items center
      .iconfont
        font-size 55rem
      .icon-wenzhang
        color #7dc636
      .icon-huangguan
        color #f0c300
      .icon-kanyikantubiao
        color #319f70
      .icon-huati
        color #fb8d21
      .icon-laba
        color #ffcc01
.hot-title-con
  display flex
  align-items center
  justify-content space-between
  height 80rem
  font-size 26rem
  .iconfont
    margin-right 10rem
  .title
    .iconfont
      color #fd3f42
  .setting
    color $gray-text-color
</style>