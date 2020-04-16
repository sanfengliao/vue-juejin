<template>
  <div class="s-author-con">
    <div class="avatar-con">
      <router-link :to="`/user/${author.id}`">
        <div class="avatar" :style="{backgroundImage: `url(${author.avatarLarge})`}"></div>
      </router-link>
    </div>
    <div class="user-info" :style="{marginRight: !author.viewerIsFollowing ? '20rem' : '0'}">
      <span class="username">{{author.username}}</span>
      <img class="level" v-if="showLevel && author.level > 0" :src="author.level | levelImage" :alt="`Lv-${author.level}`">
    </div>
     <div v-if="author.viewerIsFollowing || author.currentUserFollowed" @click="toggleFollow" class="follow active">
      <i class="iconfont icon-dui"></i>
      <span class="text">已关注</span>
    </div>
    <div v-else @click="toggleFollow" class="follow">
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
    showLevel: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleFollow() {
      this.$emit('toggleFollow', this.author)
    }
  }
}
</script>

<style lang="stylus" scoped>
.s-author-con
  width 100%
  display flex
  align-items center
  .avatar-con
    margin-right 20rem
  .avatar
    border-radius 50%
    width 60rem
    height 60rem
    background-size cover
    background-position 50%
    background-repeat no-repeat
  .user-info
    flex 1
    display flex
    width 0
    height 30rem
    align-items center
    .username
      margin-right 8rem
      font-size 25rem
    .level
      height 25rem
   
  .follow
    display flex
    justify-content center
    align-items center
    flex 0 0 140rem
    height 55rem
    border 1px #6cbd45 solid
    color #6cbd45
    font-size 23rem
    &.active
      color #fff
    .iconfont
      padding 0
      margin-right 10rem
      font-size 26rem
</style>