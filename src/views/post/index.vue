<template>
  <div class="post" >
    <header class="header">
      <d-header title="文章详情页">
        <div ref="header-con" class="header-con">
          <div v-if="entry" ref="header-content" class="header-content">
            <router-link class="link" :to="`/user/${entry && entry.user.objectId}`">
              <div class="user-con">
                  <s-author @toggleFollow="toggleFollow" :author="entry.user"></s-author>
              </div>
            </router-link>
            <div class="title-con">
              <h2 class="title">文章详情页</h2>
            </div>
          </div>
        </div>
      </d-header>
    </header>
    <load-scroll @scroll="postScroll" @load="loadMore" :finished="loadFinish" :is-loading="isLoading">
      <div>
        <section class="article">
          <div v-if="entry" class="summary">
            <div class="author-container">
              <router-link :to="`/user/${entry && entry.user.objectId}`">
                <m-author @toggleFollow="toggleFollow" :author="entry && entry.user"></m-author>
              </router-link>
            </div>
            <h1 class="title">{{entry.title}}</h1>
            <a class="origin-url" target="_blank" :href="entry.originalUrl">原文链接</a>
            <div class="screenshot" v-if="entry.screenshot" :style="{backgroundImage: `url(${entry.screenshot})`}"></div>
          </div>
          <div class="article-content" ref="post" v-html="content"></div>
          <div class="tag-con">
            <ul class="tag-list" v-if="entry && entry.tags">
              <li class="tag-item" v-for="item in entry.tags" :key="item.id">
                {{item.title}}
              </li>
            </ul>
          </div>
          <div v-if="entry" class="article-info">
            阅读 {{entry.viewsCount}} · 赞 {{entry.collectionCount}}
          </div>
        </section>
        <section class="related-article con">
          <h3 v-if="entry" class="title border-bottom-1px">{{entry && entry.user.username}}的更多文章</h3>
          <ul class="related-article-list">
            <li class="related-article-item border-bottom-1px" v-for="item in relatedEntry" :key="item.objectId">
              <router-link :to="`/post/${item.id || item.objectId}`">
                <s-article-entry :article="item"></s-article-entry>
              </router-link>
            </li>
          </ul>
        </section>
        <section class="comment-con con">
          <ul v-if="comments.length>0" class="comment-list">
            <li v-for="item in comments" class="comment-item border-bottom-1px" :key="item.id">
              <comment :authorId="entry && entry.user.id" :comment="item"></comment>
            </li>
          </ul>
          <div v-else class="no-comment">
            <i class="iconfont icon-Comment"></i>
            <span>暂无评论</span>
          </div>
        </section>
      </div>
    </load-scroll>
  </div>
</template>

<script>
import { getEntryView, getEntryByEntryIds, getRelatedEntry, getComments } from '../../api/post'
import { followUser, unFollowUser, isCurrentUserFollowed } from '../../api/user'
import DHeader from '../../components/d-header'
import SArticleEntry from '../../components/s-article-entry'
import Comment from '../../components/comment'
import Loading from '../../components/loading'
import MAuthor from '../../components/m-author'
import SAuthor from '../../components/s-author'
import LoadScroll from '../../components/load-scroll'

export default {
  name: 'post',
  data() {
    return {
      content: '',
      entry:null,
      relatedEntry: [],
      comments: [],
      isLoading: false,
      loadFinish: false
    }
  },
  components: {
    DHeader,
    SArticleEntry,
    Comment,
    Loading,
    MAuthor,
    LoadScroll,
    SAuthor
  },
  created() {
    this.init()
  },
  mounted() {
    this.headerConHeight = this.$refs['header-con'] && this.$refs['header-con'].clientHeight
    this.$headerContent = this.$refs['header-content']
  },
  updated() {
    this.headerConHeight = this.$refs['header-con'].clientHeight && this.$refs['header-con'].clientHeight
    this.$headerContent = this.$refs['header-content']
  },
  methods: {
    init() {
      let { id } = this.$route.params
      this.postId = id
      this.getEntryByEntryIds(id)
      this.getRelatedEntry(id)
      this.getEntryView(id)
      this.getComments(id)
    },
    async toggleFollow(author) {
      if (author.currentUserFollowed) {
        let data = await unFollowUser(author.objectId)
        if (data.s === 1) {
          author.currentUserFollowed = false
        }
      } else {
        let data = await followUser(author.objectId)
        if (data.s === 1) {
          author.currentUserFollowed = true
        }
      }
    },
    postScroll(e) {
      let { scrollTop } = e.target
      if (scrollTop > this.headerConHeight) {
        this.$headerContent.style.transform = `translateY(0)`
      } else {
        this.$headerContent.style.transform = `translateY(-50%)`
      }
    },
    async loadMore() {
      if(!this.isLoading) {
        let { createdAt  }= this.comments[this.comments.length - 1]

        this.isLoading = true
        let data = await getComments(this.postId, createdAt)
        if(data.d.comments.length === 0) {
          this.loadFinish = true
          this.isLoading = false
          return 
        }
        data.d.comments.forEach(item => {
          this.comments.push(item)
        })
        this.isLoading = false
      }
    },
    async getEntryView(id) {
      let data = await getEntryView(id)
      this.content = data.d.content
    },
    async getEntryByEntryIds(id) {
      let data = await getEntryByEntryIds(id)
      let entry = data.d.entrylist[0]
      data = await isCurrentUserFollowed(entry.user.objectId)
      entry.user.currentUserFollowed = data.d[entry.user.objectId]
      this.entry = entry
    },
    async getRelatedEntry(id) {
      let data = await getRelatedEntry(id)
      this.relatedEntry = data.d.entrylist
    },
    async getComments(id, created) {
      let data = await getComments(id, created)
      this.comments = data.d.comments
      if (this.comments.length === 0) {
        this.loadFinish = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

.post
  background #f4f8fb
  transition all .5s
  .header
    position fixed
    width 100%
    border-bottom 1px solid #edeeef
    background #fff
    z-index 1
    .header-con
      height 100%
      width 100%
      overflow hidden
      .header-content
        transform translateY(-50%)
        transition transform .5s
        .user-con
          height 105*$unit
          display flex
          align-items center
          justify-content space-between
            
        .title-con
          height 105*$unit
          line-height 105*$unit
      .follow
        display flex
        justify-content center
        align-items center
        flex 0 0 140*$unit
        height 60*$unit
        border 1px #6cbd45 solid
        color #6cbd45
        font-size 26*$unit
        .iconfont
          padding 0
          margin-right 10*$unit
          color #6cbd45
          font-size 26*$unit
  .article
    margin-bottom 20*$unit
    padding 125*$unit 20*$unit 50*$unit
    background #fff
    .summary
      .author-container
        margin-bottom 20*$unit
      .title
        font-size 35*$unit
        margin-bottom 45*$unit
      .origin-url
        margin-bottom 30*$unit
        font-size 25*$unit
        color #909090
      .screenshot
        margin 20*$unit 0
        background-size cover
        background-position 50%
        background-repeat no-repeat
        &::after
          content: ""
          display: block
          padding-top: 56.29%
          width: 100%
          pointer-events: none
    .article-content
      margin-bottom 65*$unit
    .tag-con
      margin-bottom 50*$unit
    .tag-list
      display flex
      .tag-item
        padding 15*$unit 20*$unit
        background #ebebeb
        color #666
        margin-right 10*$unit
        font-size 20*$unit
    .article-info
      color #909090
      font-size 25*$unit
      line-height 1

  .related-article
    margin-bottom 20*$unit
    background #fff
    .title
      height 100*$unit
      line-height 100*$unit
      font-size 30*$unit
      font-weight 500
      color #333
  .loading-con
    display flex
    justify-content center
    align-items center
    height 100*$unit
    background-color #fff
    font-size 25*$unit
    color #666
.comment-con
  .no-comment
    height 300*$unit
    background: #fff
    display flex
    flex-direction column
    justify-content center
    align-items center
    font-size 30*$unit
    color #909090
    .iconfont
      font-size 70*$unit
</style>