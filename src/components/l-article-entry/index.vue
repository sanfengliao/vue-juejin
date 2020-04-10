<template>
  <div class="l-article-entry">
    <div class="article-author">
      <m-author class="author" :author="article.user" />
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
      <three-op />
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
    
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.l-article-entry
  background #fff
  .article-author
    padding 25rem 25rem 0
    display flex
    align-items center
    .author
      margin-right 20rem
    .iconfont
      color $gray-text-color
  .article-content-con
    padding 20rem
    .article-title
      .original-con
        display inline-block
        line-height 32rem
        .original
          margin-right 20rem
          padding 2rem 10rem
          font-size 20rem
          font-weight 500
          color #007fff
          background-color #e5f2ff
          border-radius 4rem
      .title
        font-size 34rem
        display inline
        color #17181a
    
    .art-content
      display flex
      .left-content
        flex 1
        width 0
        font-size 30rem
        color $article-content-color
        line-height 1.5
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 3
        -webkit-box-orient vertical
      .right-image
        margin-left 20rem
        width 130rem
        height 130rem
        border-radius 5rem
        background-size cover
        background-position 50%
        background-repeat no-repeat

</style>