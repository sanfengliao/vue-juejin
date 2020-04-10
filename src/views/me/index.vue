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
        <router-link to="/read-history">
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
      token: state => state.token,
      uid: state => state.uid
    })
  },
  created() {
    this.init()
  },
  methods: {
    goUserInfo() {
      if (this.token) {
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
      if (this.token) {
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
      if (this.token) {
        let data = await getUserInfo()
        this.user = data.d
      } else {
        this.user = initUser
      }
    }
  },
  watch: {
    token() {
      this.init()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.me-header
  height 85rem
  background $primary-color
  color #fff
  font-size 35rem
  text-align center
  line-height 85rem
.me-section
  padding-top 20rem
  .user-info
    display flex
    align-items center
    padding 25rem
    background #fff
    margin-bottom 20rem
    &:active
      background $active-color
    .left
      flex 0 0 90rem
      margin-right 20rem
      .avatar
        width 90rem
        height 90rem
        border-radius 50%
        background-size cover
        background-position 50%
        background-repeat no-repeat
    .center
      flex 1
      .username
        font-size 40rem
        color $title-color
      .job-info
        font-size 25rem
        color $gray-text-color
    .right
      flex 0 0 25rem
      color $gray-text-color
  .user-track-con
    margin-bottom 20rem
  .user-track
    display flex
    align-items center
    padding 0 30rem
    height 90rem
    background #fff
    font-size 30rem
    &:active
      background #d6d4d4
    .left
      margin-right 30rem
      width 50rem
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
      font-size 20rem
  
</style>