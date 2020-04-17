<template>
  <div class="l-article-entry">
    <div class="article-author">
      <m-author class="author" @toggleFollow="toggleFollow" :author="article.user" />
      <div class="iconfont-con">
        <i class="iconfont icon-unie644"></i>
      </div>
    </div>
    <div class="article-content-con border-bottom-1px">
      <div class="article-title">
        <div class="original-con">
          <span v-if="article.original" class="original">专栏</span>
        </div>
        <h3 class="title">{{article.title}}</h3>
      </div>
      <div class="art-content">
        <div class="left-content">
          {{article.content}}
        </div>
        <div v-if="article.screenshot" class="right-image" :style="{backgroundImage: `url(${article.screenshot})`}"></div>
      </div>
    </div>
    <div class="three-op">
      <three-op :is-like="article.viewerHasLiked" @like="like" @share="share" @comment="comment" :like-count="article.likeCount" :comment-count="article.commentsCount" />
    </div>
  </div>
</template>

<script>
import MAuthor from '../m-author'
import ThreeOp from '../three-op'
export default {
  props: {
    article: Object
  },
  components: {
    MAuthor,
    ThreeOp
  },
  created() {
    
  },
  methods: {
    like() {
      this.$emit('like', this.article)
    },
    comment() {
      this.$emit('comment', this.article)
    },
    share() {
      this.$emit('share', this.article)
    },
    toggleFollow(author) {
      this.$emit('toggleFollow', author)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.l-article-entry
  background #fff
  .article-author
    padding 25*$unit 25*$unit 0
    display flex
    align-items center
    .author
      margin-right 20*$unit
    .iconfont
      color $gray-text-color
  .article-content-con
    padding 20*$unit
    .article-title
      .original-con
        display inline-block
        line-height 32*$unit
        .original
          margin-right 20*$unit
          padding 2*$unit 10*$unit
          font-size 20*$unit
          font-weight 500
          color #007fff
          background-color #e5f2ff
          border-radius 4*$unit
      .title
        font-size 34*$unit
        display inline
        color #17181a
        white-space normal
    
    .art-content
      display flex
      .left-content
        flex 1
        width 0
        font-size 30*$unit
        color $article-content-color
        line-height 1.5
        white-space normal
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 3
        -webkit-box-orient vertical
      .right-image
        margin-left 20*$unit
        width 130*$unit
        height 130*$unit
        border-radius 5*$unit
        background-size cover
        background-position 50%
        background-repeat no-repeat

</style>