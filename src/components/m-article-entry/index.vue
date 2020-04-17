<template>
  <div class="article-pre">
    <div class="pre-header">
      <router-link :to="`/user/${article.user.id || article.user.objectId}`">
        <div class="user">
          <div class="avator-con">
            <img class="avator" width="100%" height="100%" :src="article.user.avatarLarge || 'https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg'" alt="头像">
          </div>
          <span class="username">{{article.user.username}}</span>
        </div>
      </router-link>
      <ul class="tag-list">
        <li class="tag-item" v-for="(item, i) in tags" :key="item.id">
          <router-link to=""><span class="tag">{{item.title}}</span></router-link> 
          <span v-if="i !== tags.length - 1">/</span>
        </li>
      </ul>
    </div>
    <div class="pre-content">
      <div class="article" :style="{marginRight: article.screenshot ? 20/16 + 'rem' : '0'}">
        <div class="pre-article-title">
          {{article.title}}
        </div>
        <div class="pre-article-content">
          {{article.content}}
        </div>
      </div>
      <div v-if="article.screenshot" class="screenshot" :style="{backgroundImage: `url(${article.screenshot})`}">
      </div>
    </div>
    <div class="pre-footer">
      <span class="like" :class="{'active': article.viewerHasLiked}" @click.stop.prevent="handleLikeClick">
        <i class="iconfont " :class="article.viewerHasLiked ? 'icon-dianzan1' : 'icon-dianzan'"></i>
        {{article.likeCount || article.collectionCount ||  '点赞'}}
      </span>
      <span class="comment" @click.stop.prevent="handleCommentClick">
        <i class="iconfont icon-pinglun"></i>
        {{article.commentsCount || '评论'}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: Object,
  },
  computed: {
    tags() {
      return this.article.tags.slice(0, 2)
    }
  },
  created() {
   
  },
  methods: {
    handleLikeClick() {
      this.$emit('like', this.article)
    },
    handleCommentClick() {
      this.$emit('comment', this.article)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl";
.article-pre
  padding: 30*$unit 20*$unit
  background #fff

.pre-header
  display flex
  justify-content space-between
  padding-bottom 25*$unit
  .user
    display flex
    align-items center;
    font-size 25*$unit
    color: #000
    .avator-con
      margin-right 10*$unit
      width 40*$unit
      height 40*$unit
      .avator
        border-radius: 50%
  .tag-list
    display flex
    .tag-item
      color $text-color
      font-size 25*$unit
      line-height 25*$unit

.pre-content
  display flex
  justify-content space-between
  padding-bottom 10*$unit
  .article
    flex 1
    width 0
    .pre-article-title
      width 100%
      padding-bottom 5*$unit
      color $title-color
      white-space normal
      font-size 30*$unit
      font-weight bold
    .pre-article-content
      width 100%
      font-size 25*$unit
      color $text-color
      white-space normal
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 3
      -webkit-box-orient vertical
  .screenshot
    border-radius 8*$unit
    flex 0 0 145*$unit
    height 145*$unit
    background $primary-color
    background-size cover
    background-position 50%
    background-repeat no-repeat
.pre-footer
  color $text-color
  font-size 20*$unit
  .like
    margin-right 40*$unit
    color $text-color
    &.active
      color #6cbd45
      // .iconfont
      //   color $primary-color
      //   font-size 30*$unit
  .iconfont
    font-size 20*$unit
    
</style>