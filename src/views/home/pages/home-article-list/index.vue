<template>
  <div class="article-list-con">
    <div ref="tags-con" :style="{height: tags.length ? '90rem' : 0, overflow: showAllTag ? 'visible' : 'hidden'}" class="tags-con border-bottom-1px">
      <!-- <div class="tag-list-con" ref="tags-con"> -->
        <ul ref="tags-list" class="tag-list" :style="{flexWrap: showAllTag? 'wrap' : 'nowrap'}">
          <li @click="handleTagClick(item.tagId, $event)" class="tag-item" v-for="item in tags" :key="item.tagId">
            <tag :text="item.title" :class="{active: tagId === item.tagId}"></tag>
          </li>
        </ul>
      <!-- </div> -->
      <div @click="toggleShowAllTag" class="show-con" v-if="showMoreTagOp">
        <i v-if="showAllTag" class="iconfont icon-sort_asc"></i>
        <i v-if="!showAllTag" class="iconfont icon-sanjiaojiantoutriangular"></i>
      </div>
      <div @click="toggleShowAllTag" class="mask" v-show="showAllTag">

      </div>
    </div>

    <scroll @load="loadMore" :refreshing="refreshing" @refresh="refresh" :loading="loading">
      <div class="article-con">
        <div v-if="recommendedHotArticleFeed.length>0" class="recommended-article-con">
          <div class="recommended-article-header border-bottom-1px con">
            <div class="title">
              <i class="iconfont icon-hot"></i>
              <span>热门文章</span>
            </div>
            <div class="delete-con">
              <i class="iconfont icon-chuyidong1-copy"></i>
            </div>
          </div>
          <ul class="recommended-article-list">
            <li v-for="item in recommendedHotArticleFeed" :key="item.objectId || item.id" class="recommended-artile-item border-bottom-1px">
              <router-link :to="`/post/${item.objectId || item.id}`">
                <s-article-entry :article="item"></s-article-entry>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="aricle-list-con">
          <ul class="article-pre-list">
            <li class="article-pre-item" v-for="item in edges" :key="item.id">
              <router-link :to="`/post/${item.id}`"><m-article-entry :article="item" @like="like"></m-article-entry></router-link>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
        
    
  </div>
</template>

<script>
import { query, queryTag, getEntryByPeriod } from '@/api/home'
import MArticleEntry from '@/components/m-article-entry'
import Tag from '@/components/tag'
import Scroll from '@/components/scroll'
import SArticleEntry from '@/components/s-article-entry'
import { routeTypes } from '@/common/config'
import { randomSelect } from '@/util'
import BScroll from 'better-scroll'
import { likeEntry } from '@/api/entry'
export default {
  props: {
    queryId: String,
    categoryId: String,
    sortTags: {
      type: Array,
      default: () => []
    },
    hasTags: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MArticleEntry,
    Tag,
    Scroll,
    SArticleEntry
  },
  data() {
    return {
      edges: [],
      loading: false,
      refreshing: true,
      tags: this.sortTags || [],
      showAllTag: false,
      tagId: '',
      showMoreTagOp: false,
      recommendedHotArticleFeed:[]
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  created() {
    if (this.hasTags) {
      this.queryTag()
    }
    if(this.tags.length) {
      this.tagId = this.tags[0].tagId
    }
  },
  mounted() {
    this.$tagsCon = this.$refs['tags-con']
    this.initScroll()
    this.refresh()
  },
  updated() {
    if (this.tagsChange) {
      this.showMoreTagOp = this.$tagsCon.clientWidth < this.$refs['tags-list'].clientWidth
      this.tagsChange = false
    }
    this.scroll && this.scroll.refresh()
    this.$nextTick(() => {
      if (this.$currentTag && this.fromAllTag) {
        this.scrollTagToCenter(this.$currentTag)
        this.fromAllTag = false
      }
    })
  },
  methods: {
    async like(article) {
      if (!this.isLogin) {
        this.$router.push({
          path: '/login',
          query: {
            from: this.$route.path
          }
        })
        return
      }
      let data = await likeEntry(article.id)
      if (data.s === 1) {
        if (article.viewerHasLiked) {

          article.likeCount -= 1
          article.viewerHasLiked = false
        } else {
          article.likeCount += 1
          article.viewerHasLiked = true
        }
      }
    },
    /**
     * @param {true} isRefresh
     */
    async query(isRefresh) {
      let result = await this.requestData()
      let items = result.articleFeed.items
      let recommendArticles = []
      if (isRefresh) {
        if (result.recommendedHotArticleFeed) {
          let edges = result.recommendedHotArticleFeed.items.edges
          recommendArticles = edges.map(item => item.entry)
        }
        else if (this.categoryId && this.tagId === '') {
          let data = await getEntryByPeriod(this.categoryId)
          recommendArticles = data.d.entrylist
        }
        this.recommendedHotArticleFeed = []
        this.edges = []
      }
      for (let item of items.edges) {
        this.edges.push(item.node || item.entry)   
      }
      this.hasNextPage = items.pageInfo.hasNextPage
      this.endCursor = items.pageInfo.endCursor
      if (recommendArticles) {
        // this.recommendedHotArticleFeed = randomSelect(this._recommendedHotArticleFeed, 3)
        this.recommendedHotArticleFeed = recommendArticles.slice(0, 3)
      }
    },
    async requestData() {
      let { routeType } = this.$route.meta
      let data = await query(this.assembleQueryData(routeType))
      // if (routeType === routeTypes.HOME_RECOMMEND) {
      //   data = await getRecommendedArticle(this.endCursor)
      // } else if (routeType === routeTypes.HOME_HOT) {
      //   data = await getHotArticle(this.endCursor, this.tagId)
      // } else if (routeType == routeTypes.HOME_CATEGORY) {
      //   data = await getEntryByTimeline(this.categoryId, [this.tagId], this.endCursor)
      // }
      return data.data
    },
    async queryTag() {
      let requestTags = await this.requestTag()
      let tags = [{
        tagId: '',
        title: '全部'
      }]
      tags.push(...requestTags)
      this.tags = tags
      this.tagId = this.tags[0].tagId
    },

    async requestTag() {
      let result = await queryTag(this.categoryId)
      return result.data.tagNav.items
    },
    async refresh() {
      this.refreshing = true
      this.endCursor = ''
      await this.query(true)
      this.refreshing = false
    },
    async loadMore() {
      this.loading = true
      await this.query()
      this.loading = false
    },
    assembleQueryData(routeType) {
      const data = {
        variables: {after:''},
        extensions: {query: {id: this.queryId}}
      }
      if (routeType === routeTypes.HOME_RECOMMEND) {
        data.variables.platformCode = '2',
        data.variables.positionCodes = [2, 3]
      }
      if (routeType === routeTypes.HOME_CATEGORY) {
        data.variables.category = this.categoryId
        data.variables.tags = [this.tagId]
      }
      
      if (routeType === routeTypes.HOME_HOT) {
        data.variables.order = this.tagId
      }

      if (this.hasNextPage && this.endCursor) {
        data.variables.after = this.endCursor
      }
      return data
    },
    toggleShowAllTag() {
      this.showAllTag = !this.showAllTag
    },
    handleTagClick(tagId, e) {
      this.tagId = tagId
      this.refresh()
      if (this.showAllTag){
        this.fromAllTag = true
        this.showAllTag = false
      }
      this.$currentTag = e.currentTarget
    },
    initScroll() {
      this.scroll = new BScroll(this.$tagsCon, {
        click: true,
        scrollX: true,
        scrollY: false
      })
    },
    scrollTagToCenter(target) {
      let i = 0
      while (target.previousElementSibling && i < 2) {
        target = target.previousElementSibling
        i++
      }
      this.scroll && this.scroll.scrollToElement(target)
    }
  },
  watch: {
    tags() {
      this.tagsChange = true
    },
    isLogin() {
      this.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../../assets/css/variable.styl"
.article-list-con
  display flex
  flex-direction column
  width: 100%
  height 100%
  .tags-con
    position relative
    width 100%
    background #fff
    overflow hidden
    .tag-list-con
      height 100%
      width 100%
      overflow hidden
    .tag-list
      position absolute
      left 0
      display flex
      white-space nowrap
      padding: 0 10rem
      align-items center
      background #fff
      z-index 20
      .tag-item
        margin-right 20rem
        height 80rem
        line-height 80rem
        color $text-color
        .active
          color #fff
          background $primary-color
    .show-con
      position absolute
      right 0
      top 50%
      transform translateY(-50%)
      z-index 25
      .iconfont
        font-size 55rem
        color $text-color
    .mask
      position fixed
      bottom 0
      left 0
      right 0
      top 148rem
      background rgba(0, 0, 0, .5)
      z-index 10
  
.article-pre-list
  .article-pre-item
    margin-bottom 20rem

.recommended-article-con
  background: #fff
  margin-bottom 18rem
  .recommended-article-header
    display flex
    justify-content space-between
    align-items center
    height 75rem
    .title
      .iconfont
        margin-right 10rem
        color $primary-color
        font-size 30rem
      color $primary-color
      font-size 30rem
    .delete-con
      .iconfont
        color $text-color
  .recommend-article
    display flex
    height 155rem
    padding-top 20rem
    .left
      flex 1
      .article-title
        margin-bottom 25rem
        font-size 25rem
        color $title-color
      .footer-content
        font-size 18rem
        color $text-color
    .screenshot
      margin-left 35rem
      border-radius 8rem
      flex 0 0 100rem
      height 100rem
      background $primary-color
      background-size cover
      background-position 50%
      background-repeat no-repeat
</style>i