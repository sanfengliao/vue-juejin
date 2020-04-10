<template>
  <div class="author-con">
    <div class="avatar-con">
      <router-link :to="`/user/${author.id || author.objectId}`">
        <div class="avatar" :style="{backgroundImage: `url(${author.avatarLarge})`}"></div>
      </router-link>
    </div>
    <div class="user-info" :style="{marginRight: !author.viewerIsFollowing ? '20rem' : '0'}">
      <div class="top">
        <span class="username">{{author.username}}</span>
        <img class="level" v-if="showLevel && author.level > 0" :src="author.level | levelImage" :alt="`Lv-${author.level}`">
      </div>
      <div class="bottom">
        <span v-if="author.jobTitle" class="jobTitle">{{author.jobTitle}}</span>
        <span v-if="author.company" class="company"> @ {{author.company}}</span>
        <span v-if="dateDis"> · {{dateDis}}</span>
      </div>
    </div>
    <div v-if="!author.viewerIsFollowing" @click.stop.prevent="follow" class="follow">
      <i class="iconfont icon-Add1"></i>
      <span class="text">关注</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      default: () => ({})
    },
    dateDis: String,
    showLevel: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    follow() {
      // TODO
    }
  }
}
</script>

<style lang="stylus" scoped>
.author-con
  display flex
  width 100%
  align-items center
  .avatar-con
    margin-right 20rem
  .avatar
    border-radius 50%
    width 80rem
    height 80rem
    background-size cover
    background-position 50%
    background-repeat no-repeat
  .user-info
    width 0
    flex 1
    .top
      display flex
      margin-bottom 5rem
      align-items center
      .username
        margin-right 8rem
        font-size 25rem
      .level
        height 25rem
    .bottom
      width 100%
      font-size 20rem
      color #909090
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  .follow
    padding 12rem 20rem
    border 1px #6cbd45 solid
    color #6cbd45
    font-size 26rem
    .iconfont
      padding 0
      margin-right 10rem
      color #6cbd45
      font-size 26rem
</style>