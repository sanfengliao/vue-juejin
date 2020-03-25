<template>
  <div class="article-list-con">
    <div ref="tags-con" :style="{height: tags.length ? '85rem' : 0, overflow: showAllTag ? 'visible' : 'hidden'}" class="tags-con border-bottom-1px">
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

    <list :on-pulling-up="loadMore" :refreshing="isRefresh" :on-pulling-down="refresh">
      <ul class="article-pre-list">
        <li class="article-pre-item" v-for="item in edges" :key="item.id">
          <router-link to="/search"><article-preview :article="item"></article-preview></router-link>
        </li>
      </ul>
    </list>
        
    
  </div>
</template>

<script>
import { query } from '../../api/home'
import ArticlePreview from '../../components/article-preview'
import Tag from '../../components/tag'
import List from '../../components/list'
import BScroll from 'better-scroll'
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
    ArticlePreview,
    Tag,
    List
  },
  data() {
    return {
      edges: [],
      isLoading: false,
      isRefresh: true,
      tags: this.sortTags || [],
      showAllTag: false,
      tagId: '',
      showMoreTagOp: false,
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
    /**
     * @param {true} isRefresh
     */
    async query(isRefresh) {
      let items = await this.requestData()
      if (isRefresh) {
        this.edges = []
      }

      for (let item of items.edges) {
        this.edges.push(item.node)   
      }
      this.hasNextPage = items.pageInfo.hasNextPage
      this.endCursor = items.pageInfo.endCursor
    },
    async requestData() {
      let data = await query(this.assembleQueryData())
      return data.data.articleFeed.items
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
       const data = {
        operationName: "",
        query: "",
        variables: {category: this.categoryId, limit: 15},
        extensions: {query: {id: "801e22bdc908798e1c828ba6b71a9fd9"}}
      }
      let result = await query(data)
      return result.data.tagNav.items
    },
    async refresh() {
      this.isRefresh = true
      this.endCursor = ''
      await this.query(true)
      this.isRefresh = false
    },
    async loadMore() {
      await this.query()
    },
    assembleQueryData() {
      const data = {
        operationName: '',
        query: '',
        variables: {first: 20, after: '', order: 'POPULAR'},
        extensions: {query: {id: '21207e9ddb1de777adeaca7a2fb38030'}}
      }
      data.extensions.query.id = this.queryId
      if (this.categoryId) {
        data.variables.category = this.categoryId
      }
      if (this.hasNextPage && this.endCursor) {
        data.variables.after = this.endCursor
      }
      console.log(this.categoryId)
      if (this.tagId) {
        if (this.categoryId){
          data.variables.tags = [this.tagId]
        } else {
          data.variables.order = this.tagId
        }
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
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/common.styl"
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



</style>