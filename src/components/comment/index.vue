<template>
  <div class="comment-con">
    <div class="avatar-con">
      <router-link :to="`/user/${comment.userInfo.objectId}`">
        <div class="avatar" :style="{backgroundImage: `url(${comment.userInfo.avatarLarge || 'https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg'})`}"></div>
      </router-link>
    </div>
    <div class="content-con">
      <div class="header">
        <div class="user-con">
          <div class="user-info">
            <div class="username">
              <router-link :to="`/user/${comment.userInfo.objectId}`">
                <span class="name">{{comment.userInfo.username}}</span>
                <img  class="level" :src="comment.userInfo.level | levelImage" alt="">
              </router-link>
            </div>
            <div class="job">
              <span v-if="comment.userInfo.jobTitle">{{comment.userInfo.jobTitle}} · </span>{{comment.createdAt | dateDis}}
            </div>
          </div>
        </div>
        <div class="op">
          <div class="like-con" :class="{'like': comment.isLike}">
            <i @click="toggleLike" class="iconfont" :class="{'icon-dianzan1': comment.isLike, 'icon-dianzan': !comment.isLike}">
            </i>
            <span class="likes-count" v-if="comment.likesCount">{{comment.likesCount}}</span>
          </div>
          <!-- TODO -->
          <i class="iconfont icon-pinglun"></i>
        </div>
      </div>
      <div class="content">
        <div class="main-content">{{comment.content}}</div>
        <div v-if="comment.topComment && comment.topComment.length>0" class="reply-con">
          <ul class="top-comment-list">
            <li v-for="(item, index) in comment.topComment" :key="item.id" class="top-comment-item">
              <span class="username">{{item.userInfo.username}}{{item.userInfo.objectId === authorId ? '(作者)': ''}}</span>
              <span class="reply" v-if="index>0"> 回复 </span>
              <span v-if="index>0" class="resp-username">{{item.respUserInfo.username}}{{item.respUserInfo.objectId === authorId ? '(作者)': ''}}</span>
              ：
              <span class="content">{{item.content}}</span>
            </li>
            
          </ul>
          <!-- TODO -->
          <router-link v-if="comment.topComment && comment.topComment.length <  comment.replyCount" :to="`/`">
            <span class="total-comment">全部{{comment.replyCount}}条评论&gt;</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object
    },
    authorId: {
      type: String
    }
  },
  methods: {
    toggleLike() {
      if (this.comment.isLike) {
        this.comment.isLike = false
        this.comment.likesCount -= 1
      } else {
        this.comment.isLike = true
        this.comment.likesCount += 1
      }
      // TODO
    }
  }
}
</script>

<style lang="stylus" scoped>
.comment-con
  display flex
  padding 25*$unit 0
  .avatar-con
    flex 0 0 75*$unit
    .avatar
      margin-right 10*$unit
      width 75*$unit
      height 75*$unit
      border-radius 50%
      background-size cover
      background-position 50%
.content-con
  width 0
  flex 1
.header
  display flex
  height 75*$unit
  justify-content space-between
  margin-bottom 10*$unit
  .user-con
    display flex
    justify-content center
    align-items center
    .user-info
      display flex
      flex-direction column
      justify-content space-around
      height 25*$unit
      line-height 25*$unit
      .username
        margin-bottom 10*$unit
        display flex
        align-items center
        .name
          font-size 25*$unit
          color #6a8ba3
        .level
          height 20*$unit
      .job
        color #909090
        font-size 20*$unit
  .op
    display flex
    justify-content space-between
    width 120*$unit
    font-size 22*$unit
    color #909090
    .iconfont
      color #909090
      font-size 22*$unit
    .icon-pinglun
      margin-top 2*$unit
    .like-con
      display flex
      align-items flex-start
      &.like
        color #0cbb0a
        .iconfont
          color #0cbb0a
      .iconfont
        margin-right  20*$unit
.content
  .main-content
    margin-bottom 20*$unit
    font-size 28*$unit
    color black
    word-break break-all
  .reply-con
    padding 26*$unit
    background #f4f8f7
    .top-comment-item
      margin-bottom 10*$unit
      font-size 28*$unit
      color black
      .reply, .content
        color #666
    .total-comment
      color #6a8ba3
</style>