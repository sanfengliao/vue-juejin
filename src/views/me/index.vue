<template>
  <div class="me-con">
    <header class="me-header">我</header>
    <section class="me-section">
      <div class="user-info" @click="goUserInfo">
        <div class="left">
          <div class="avatar" :style="{backgroundImage: `url(${user.avatarLarge || $store.state.defaultAvatar})`}"></div>
        </div>
        <div class="center">
          <div class="username">{{user.username}}</div>
          <div class="job-info">
            <div v-if="user.jobTitle || user.company">
              <span>{{user.jobTitle}}</span>
              <span v-if="user.jobTitle && user.company"> @ </span>
              <span>{{user.company}}</span>
            </div>
            <span v-else>添加职位 @ 添加公司</span>
          </div>
        </div>
        <div class="right">
          <i class="iconfont icon-go1"></i>
        </div>
      </div>
      <div class="user-track-con">
        <div class="user-track border-bottom-1px">
          <div class="left">
            <i class="iconfont icon-lingdang"></i>
          </div>
          <div class="center">消息中心</div>
          <div class="right"></div>
        </div>
        <router-link to="/my-like">
          <div class="user-track border-bottom-1px">
            <div class="left">
              <i class="iconfont icon-good"></i>
            </div>
            <div class="center">我赞过的</div>
            <div class="right">{{user.collectedEntriesCount}}篇</div>
          </div>
        </router-link>
        <div class="user-track border-bottom-1px" @click="goCollectionSet">
          <div class="left">
            <i class="iconfont icon-star"></i>
          </div>
          <div class="center">收藏集</div>
          <div class="right">{{user.collectionSetCount}}个</div>
        </div>
        <router-link to="/my-purchased-book">
          <div class="user-track border-bottom-1px">
            <div class="left">
              <i class="iconfont icon-gouwudai"></i>
            </div>
            <div class="center">已购小册</div>
            <div class="right">{{user.purchasedBookletCount}} 本</div>
          </div>
        </router-link>
        <router-link to="/user-read-history">
          <div class="user-track border-bottom-1px">
            <div class="left">
              <i class="iconfont icon-see"></i>
            </div>
            <div class="center">阅读过的文章</div>
            <div class="right">{{user.viewedEntriesCount}}篇</div>
          </div>
        </router-link>
        <router-link to="/tag-manage">
          <div class="user-track border-bottom-1px">
            <div class="left">
              <i class="iconfont icon-xlcameraCenterLabel"></i>
            </div>
            <div class="center">标签管理</div>
            <div class="right">{{user.subscribedTagsCount}}个</div>
          </div>
        </router-link>
      </div>
      <div class="user-track-con">
        <router-link to="/feedback">
          <div class="user-track border-bottom-1px">
            <div class="left">
              <i class="iconfont icon-yijianfankui"></i>
            </div>
            <div class="center">意见反馈</div>
            <div class="right"></div>
          </div>
        </router-link>
        <router-link :to="{name: 'setting', params: user}">
          <div class="user-track border-bottom-1px">
            <div class="left">
              <i class="iconfont icon-shezhi1"></i>
            </div>
            <div class="center">设置</div>
            <div class="right"></div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '../../api/user'
const initUser = {
  avatarLarge: '',
  username: '登录/注册',
  jobTitle: '',
  company: '',
  subscribedTagsCount: 0,
  purchasedBookletCount: 0,
  viewedEntriesCount: 0,
  collectionSetCount: 0,
  collectedEntriesCount: 0
}
export default {
  data() {
    return {
      user: initUser
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      uid: state => state.uid
    })
  },
  created() {
    this.init()
  },
  methods: {
    goUserInfo() {
      if (this.isLogin) {
        this.$router.push(`/user/${this.uid}`)
      } else {
        this.$router.push({
          path: '/login',
          query: {
            from: this.$route.path
          }
        })
      }
    },
    goCollectionSet() {
      if (this.isLogin) {
        this.$router.push(`/user/${this.uid}/collections`)
      } else {
        this.$router.push({
          path: '/login',
          query: {
            from: this.$route.path
          }
        })
      }
    },
    async init() {
      if (this.isLogin) {
        let data = await getUserInfo()
        this.user = data.d
      } else {
        this.user = initUser
      }
    }
  },
  watch: {
    isLogin() {
      this.init()
    }
  }
}
</script>

<style lang="stylus" scoped>
.me-header
  height 85*$unit
  background $primary-color
  color #fff
  font-size 35*$unit
  text-align center
  line-height 85*$unit
.me-section
  padding-top 20*$unit
  .user-info
    display flex
    align-items center
    padding 25*$unit
    background #fff
    margin-bottom 20*$unit
    &:active
      background $active-color
    .left
      flex 0 0 90*$unit
      margin-right 20*$unit
      .avatar
        width 90*$unit
        height 90*$unit
        border-radius 50%
        background-size cover
        background-position 50%
        background-repeat no-repeat
    .center
      flex 1
      .username
        font-size 40*$unit
        color $title-color
      .job-info
        font-size 25*$unit
        color $gray-text-color
    .right
      flex 0 0 25*$unit
      color $gray-text-color
  .user-track-con
    margin-bottom 20*$unit
  .user-track
    display flex
    align-items center
    padding 0 30*$unit
    height 90*$unit
    background #fff
    font-size 30*$unit
    &:active
      background #d6d4d4
    .left
      margin-right 30*$unit
      width 50*$unit
      text-align center
      .iconfont
        color $gray-text-color
      .icon-lingdang
        color $primary-color
      .icon-good
        color #68be46
      .icon-star, .icon-gouwudai
        color #febc4a
    .center
      flex 1
    .right
      color $gray-text-color
      font-size 20*$unit
  
</style>