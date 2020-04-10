<template>
  <div class="article-entry">
    <div class="left">
      <h3 class="article-title">
        {{article.title}}
      </h3>
      <div class="footer-content">
        <span>{{article.likeCount || article.collectionCount}}人赞 · {{article.user.username}} · {{article.createdAt | dateDis }}</span>
      </div>
    </div>
    <div v-if="article.screenshot" class="screenshot" :style="{backgroundImage: `url(${article.screenshot})`}"></div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.article-entry
  display flex
  min-height 155rem
  padding 20rem
  background #fff
  .left
    flex 1
    .article-title
      margin-bottom 25rem
      font-size 25rem
      color $title-color
      font-weight 500
      white-space normal
    .footer-content
      font-size 18rem
      color $gray-text-color
  .screenshot
    margin-left 35rem
    border-radius 8rem
    flex 0 0 100rem
    height 100rem
    background $primary-color
    background-size cover
    background-position 50%
    background-repeat no-repeat
</style>