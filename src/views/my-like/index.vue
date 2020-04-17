<template>
  <div class="my-like">
    <header  class="my-like-header">
      <s-header :go-back="goBack" title="我赞过的" />
    </header>
    <section class="my-like-section">
      <tab @onItemClick="tabItemClick" :current-index="index" :tabs="['文章', '沸点']" />
      <div class="aritcles-content">
        <swiper ref="swiper" class="swiper" :options="options()">
          <swiper-slide class="swiper-slide">
            <scroll :options="{bounce:{top: false}}">
              <div class="article">
                <ul class="article-list">
                  <li class="article-item border-bottom-1px" v-for="item in articles" :key="item.objectId">
                    <router-link :to="`/post/${item.objectId}`">
                      <s-article-entry :article="item" />
                    </router-link>
                  </li>
                </ul>
              </div>
            </scroll>
          </swiper-slide>
          <swiper-slide>
            <scroll :options="{bounce:{top: false}}">
              <div class="pin-list-con">
                <ul class="pin-list">
                  <li class="pin-item" v-for="item in pins" :key="item.objectId">
                    <router-link :to="`/pin/${item.objectId}`">
                      <l-pin-entry :pin="item"></l-pin-entry>
                    </router-link>
                  </li>
                </ul>
              </div>
            </scroll>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </div>
</template>

<script>
import SHeader from '../../components/s-header'
import Tab from '../../components/tab'
import Scroll from '../../components/scroll'
import SArticleEntry from '../../components/s-article-entry'
import LPinEntry from '../../components/l-pin-entry'
import { getUserLikePins, getUserLikeArticles } from '../../api/user'
export default {
  name: 'my-like',
  data() {
    return {
      index: 0,
      pins: [],
      articles: []
    }
  },
  components: {
    SHeader,
    Tab,
    Scroll,
    LPinEntry,
    SArticleEntry
  },
  created() {
    this.init()
    this.$store.dispatch('addKeepAlive', this.$options.name)
  },
  methods: {
    tabItemClick(item, index) {
      this.$refs['swiper'].$swiper.slideTo(index)
    },
    options() {
      const vm = this
      return {
        on: {
          slideChange: function() {
            vm.index = this.activeIndex
          }
        }
      }
    },
    goBack() {
      console.log('goback')
      this.$store.dispatch('removeKeepAlive', 'my-like')
      this.$router.goBack()
    },
    init() {
      this.pinPage = 0
      this.articlePage = 0
      this.getUserLikePins()
      this.getUserLikeArticles()
    },
    async getUserLikePins() {
      let data = await getUserLikePins(this.$store.state.uid, this.pinPage)
      for (let item of data.d.list) {
        this.pins.push(item)
      }
      this.pinPage++
    },
    async getUserLikeArticles() {
      let data = await getUserLikeArticles(this.$store.state.uid, this.pinPage)
      for (let item of data.d.entryList) {
        this.articles.push(item)
      }
      this.articlePage++
    }
  },
}
</script>

<style lang="stylus" scoped>
.my-like
  display flex
  flex-direction column
.my-like-section
  flex 1
  height 0
  display flex
  flex-direction column
  .aritcles-content
    flex 1
    height 0
    .swiper, .swiper-slide
      height 100%
    .pin-item
      margin-bottom 20*$unit
</style>