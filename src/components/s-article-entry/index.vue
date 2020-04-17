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
  min-height 155*$unit
  padding 20*$unit
  background #fff
  .left
    flex 1
    .article-title
      margin-bottom 25*$unit
      font-size 25*$unit
      color $title-color
      font-weight 500
      white-space normal
    .footer-content
      font-size 18*$unit
      color $gray-text-color
  .screenshot
    margin-left 35*$unit
    border-radius 8*$unit
    flex 0 0 100*$unit
    height 100*$unit
    background $primary-color
    background-size cover
    background-position 50%
    background-repeat no-repeat
</style>