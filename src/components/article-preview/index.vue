<template>
  <div class="article-pre">
    <div class="pre-header">
      <router-link to="">
        <div class="user">
          <div class="avator-con">
            <img class="avator" width="100%" height="100%" src="https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg" alt="头像">
          </div>
          <span class="username">{{article.user.username}}</span>
        </div>
      </router-link>
      <ul class="tag-list">
        <li class="tag-item" v-for="(item, i) in article.tags" :key="item.id">
          <router-link to=""><span class="tag">{{item.title}}</span></router-link> 
          <span v-if="i !== article.tags.length-1">/</span>
        </li>
      </ul>
    </div>
    <div class="pre-content">
      <div class="article">
        <div class="article-title">
          {{article.title}}
        </div>
        <div class="article-content">
          {{article.content}}
        </div>
      </div>
      <div v-if="article.screenshot" class="screenshot" :style="{backgroundImage: `url(${article.screenshot})`}">
      </div>
    </div>
    <div class="pre-footer">
      <span class="like">
        <i @click.stop.prevent="handleLikeClick" class="iconfont icon-dianzan"></i>
        {{article.likeCount || '点赞'}}
      </span>
      <span class="comment">
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
  created() {
   
  },
  methods: {
    handleLikeClick() {
      console.log('abc')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/common.styl";
.article-pre
  padding: 30rem 20rem
  background #fff

.pre-header
  display flex
  justify-content space-between
  padding-bottom 25rem
  .user
    display flex
    align-items center;
    font-size 25rem
    color: #000
    .avator-con
      margin-right 10rem
      width 40rem
      height 40rem
      .avator
        border-radius: 50%
  .tag-list
    display flex
    .tag-item
      color $text-color

.pre-content
  display flex
  justify-content space-between
  padding-bottom 10rem
  .article
    flex 1
    padding-right 15rem
    .article-title
      padding-bottom 15rem
      color $title-color
      font-size 30rem
      font-weight bold
    .article-content
      color $text-color
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
  .screenshot
    border-radius 8rem
    flex 0 0 145rem
    height 145rem
    background $primary-color
    background-size cover
    background-position 50%
    background-repeat no-repeat
.pre-footer
  color $text-color
  font-size 20rem
  .like
    margin-right 40rem
    &.active
      .iconfont
        &::before
          content: "\e601"
        color $primary-color
        font-size 30rem
  .iconfont
    color $text-color
    font-size 20rem
    
</style>