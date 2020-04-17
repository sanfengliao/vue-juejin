<template>
  <div class="author-con">
    <div class="avatar-con">
      <router-link :to="`/user/${author.id || author.objectId}`">
        <div class="avatar" :style="{backgroundImage: `url(${author.avatarLarge})`}"></div>
      </router-link>
    </div>
    <div class="user-info" :style="{marginRight: !author.viewerIsFollowing ? 20/16+'rem' : '0'}">
      <div class="top">
        <span class="username">{{author.username}}</span>
        <img class="level" v-if="showLevel && author.level > 0" :src="author.level | levelImage" :alt="`Lv-${author.level}`">
      </div>
      <div class="bottom">
        <span v-if="author.jobTitle" class="jobTitle">{{author.jobTitle}}</span>
        <span v-if="author.company" class="company"> @ {{author.company}}</span>
        <span v-if="dateDis"> · {{dateDis}}</span>
      </div>
      <div v-if="author.description" class="description">{{author.description}}</div>
    </div>
    <div @click.stop.prevent="toggleFollow" v-if="author.viewerIsFollowing || author.currentUserFollowed" class="follow active">
      <i class="iconfont icon-dui"></i>
      <span class="text">已关注</span>
    </div>
    <div v-else @click.stop.prevent="toggleFollow" class="follow">
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
    },
    description: String
  },
  methods: {
    toggleFollow() {
      if (this.$store.state.isLogin) {
        this.$emit('toggleFollow', this.author)
      } else {
        this.$router.push({
          path: '/login',
          query: {
            from: this.$route.path
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.author-con
  padding 20*$unit
  display flex
  width 100%
  align-items center
  background #fff
  .avatar-con
    margin-right 20*$unit
  .avatar
    border-radius 50%
    width 80*$unit
    height 80*$unit
    background-size cover
    background-position 50%
    background-repeat no-repeat
  .user-info
    width 0
    flex 1
    .top
      display flex
      margin-bottom 5*$unit
      align-items center
      .username
        margin-right 8*$unit
        font-size 25*$unit
      .level
        height 25*$unit
    .bottom, .description
      margin-bottom 5*$unit
      width 100%
      font-size 20*$unit
      color #909090
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  .follow
    padding 12*$unit 0
    text-align center
    width 150*$unit
    border 1px #6cbd45 solid
    color #6cbd45
    font-size 26*$unit
    .iconfont
      padding 0
      margin-right 10*$unit
      color #6cbd45
      font-size 26*$unit
    &.active
      color #fff
      .iconfont
        color #fff
</style>