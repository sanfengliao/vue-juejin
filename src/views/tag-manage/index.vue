<template>
  <div class="tag-manage">
    <header class="tag-manage-header">
      <s-header title="标签管理" />
    </header>
    <section class="tag-manage-section">
      <tab @onItemClick="tabItemClick" :current-index="index" :tabs="['已关注标签', '所有标签']" />
      <div class="tags-content">
        <swiper ref="swiper" class="swiper" :options="options()">
          <swiper-slide class="swiper-slide">
            <scroll :options="{bounce:{top: false}}">
              <div class="user-suggest-tags">
                <ul class="tag-list">
                  <li class="tag-item border-bottom-1px" v-for="item in userTags" :key="item.id">
                    <router-link to="/">
                      <tag-item @follow="follow" :tag="item"></tag-item>
                    </router-link>
                  </li>
                </ul>
              </div>
            </scroll>
          </swiper-slide>
          <swiper-slide>
            <scroll @load="loadMore" :loading="loading" :options="{bounce:{top: false}}">
              <div class="all-tags">
                <div class="recommend-tags">
                  <div class="title">推荐标签</div>
                  <div class="tag-list-con">
                    <ul class="tag-list">
                      <li class="tag-item border-bottom-1px" v-for="item in recommendTags" :key="item.id">
                        <router-link to="/">
                          <tag-item  @follow="follow" :tag="item"></tag-item>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="suggest-tags">
                  <div class="title">你可能感兴趣的标签</div>
                  <div class="tag-list-con">
                    <ul class="tag-list">
                      <li class="tag-item border-bottom-1px" v-for="item in suggestTags" :key="item.id">
                        <router-link to="/">
                          <tag-item  @follow="follow" :tag="item"></tag-item>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
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
import TagItem from '../../components/tag-item'
import { getUserSubscribeTag, getSuggestTag, getRecommendTag } from '../../api/user'
export default {
  data() {
    return {
      userTags: [],
      recommendTags: [],
      suggestTags: [],
      loading: false,
      index: 0
    }
  },
  components: {
    SHeader,
    Tab,
    TagItem,
    Scroll
  },
  created() {
    this.init()
  },
  methods: {
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
    follow(item) {
      // TODO
      

    },
    tabItemClick(item, index) {
      this.$refs['swiper'].$swiper.slideTo(index)
    },
    init() {
      this.page = 1
      this.getUserSubscribeTag()
      this.getRecommendTag()
      this.getSuggestTag()
    },
   
    async loadMore() {
      this.loading = true
      await this.getSuggestTag()
      this.loading = false
    },
    async getUserSubscribeTag() {
      let { uid } = this.$store.state
      let data = await getUserSubscribeTag(uid)
      for (let item of data.d.tagList) {
        this.userTags.push(item)
      }
    },
    async getSuggestTag() {
      let data = await getSuggestTag(this.page)
      for (let item of data.d.tags) {
        this.suggestTags.push(item)
      }
      this.page++
    },
    async getRecommendTag() {
      let data = await getRecommendTag()
      for (let item of data.d.tags) {
        this.recommendTags.push(item)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.tag-manage
  display flex
  flex-direction column
.tag-manage-section
  flex 1
  height 0
  display flex
  flex-direction column
.tags-content
  flex 1
  height 0
  .swiper
    height 100%
    .swiper-slide
      height 100%
    .all-tags
      .title
        color #333
        padding 20*$unit
</style>