<template>
  <div class="user-con">
    <header ref="header" class="user-header" :style="{backgroundColor: headerBackgroundColor}">
      <d-header :go-back="goBackAndRemoveKeepAlive">
        <transition name="username-slide">
          <div v-show="showUser" class="username-con">
            <span class="username">{{user.username}}</span>
            <img class="level" :src="user.level | levelImage" alt="">
          </div>
        </transition>
      </d-header>
    </header>
    <load-scroll @scroll="scroll">

      <div class="mask" ref="mask"></div>
      <div class="user-info">
        <div class="avatar" :style="{backgroundImage: `url(${user.avatarLarge || $store.state.defaultAvatar})`}"></div>
        <div class="info">
          <div class="info-box">
            <div class="top">
              <div class="left">
                <h1 class="username-con">
                  {{user.username}}
                  <router-link to="/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022">
                    <img :src="user.level | levelImage" alt="">
                  </router-link>
                </h1>
                <div class="job-info">
                  <span v-if="user.jobTitle">{{user.jobTitle}}</span> 
                  <span v-if="user.jobTitle && user.company"> @ </span>
                  <span v-if="user.company">{{user.company}}</span>
                </div>
                <div v-if="user.roles && user.roles.favorableAuthor.isGranted" class="favorable-author">掘金优秀作者</div>
              </div>
              <div class="right">
                <div v-if="isMe" class="edit-btn">
                  编辑
                </div>
                <div @click="unfollow" v-else-if="user.isFollowed" class="follow active">
                  <i class="iconfont icon-dui"></i>
                  <span class="text">已关注</span>
                </div>
                <div @click="follow" v-else class="follow">
                  <i class="iconfont icon-Add1"></i>
                  <span class="text">关注</span>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="self-desc">
                {{user.selfDescription}}
              </div>
              <div class="stat-items">
                <div class="stat-item">
                  <div class="number">{{user.followeesCount}}</div>
                  <div class="text">关注</div>
                </div>
                <div class="stat-item">
                  <div class="number">{{user.followersCount}}</div>
                  <div class="text">关注者</div>
                </div>
                <div class="stat-item">
                  <div class="number">{{user.juejinPower}}</div>
                  <div class="text">掘力值</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="user-section">
        <div ref="nav" class="nav-tab-con border-bottom-1px">
          <div :style="{position: isNavFixed ? 'fixed': 'static'}" class="nav-con">
            <nav-tab ref="nav-tab" :nav-list="navList" active-title-color="#333" title-color="#666" line-color="#0180ff"></nav-tab>
          </div>
        </div>
        <div ref="content">
          <keep-alive>
            <router-view ref="routerChild"></router-view> 
          </keep-alive>
        </div>
      </section>
    </load-scroll>
  </div>
</template>

<script>
import DHeader from '../../components/d-header'
import NavTab from '../../components/nav-tab'
import LoadScroll from '../../components/load-scroll'
import { getMultiUser, isCurrentUserFollowed, followUser, unFollowUser, getUserInfo } from '../../api/user'
import { keepAliveMixin } from '../../mixins'
export default {
  name: 'user',
  mixins: [keepAliveMixin],
  data() {
    return {
      user: {},
      isMe: false,
      contentHeight: 0,
      headerBackgroundColor: 'transparent',
      showUser: false,
      isNavFixed: false
    }
  },
  components: {
    DHeader,
    NavTab,
    LoadScroll
  },
  computed: {
    navList() {
      let { objectId, pinCount=0, postedPostsCount=0, postedEntriesCount=0,collectionSetCount=0, collectedEntriesCount=0,subscribedTagsCount=0 } = this.user
      return [
        {
          title: '动态',
          path: `/user/${objectId}/activies`
        }, 
        {
          title: '专栏 ' + postedPostsCount,
          path: `/user/${objectId}/posts`
        }, 
        {
          title: '沸点 ' + pinCount,
          path: `/user/${objectId}/pins`
        }, 
        {
          title: '分享 ' + postedEntriesCount,
          path: `/user/${objectId}/shares`
        }, 
        {
          title: '更多',
          path: {
            name: 'user-more',
            path: `/user/${objectId}/more`,
            params: {
              id: objectId,
              collectedEntriesCount,
              subscribedTagsCount,
              collectionSetCount
            }
          }
        }, 
      
      ]
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.headerHeight = this.$refs['header'].clientHeight
    this.contentScrollTop = this.$refs['nav'].offsetTop - this.headerHeight
    this.maskHeight = this.$refs['mask'].clientHeight
    this.$routerView = this.$refs['router-view']
  },
  updated() {
    this.contentScrollTop = this.$refs['nav'].offsetTop - this.headerHeight
  },
  methods: {
    scroll(e) {
      let { scrollTop } = e.target
      if (scrollTop >= this.maskHeight - this.headerHeight - 20) {
        this.headerBackgroundColor = '#0180ff'
        this.showUser = true
      } else {
        this.headerBackgroundColor = 'transparent'
        this.showUser = false
      }
      if (scrollTop >= this.contentScrollTop) {
        this.isNavFixed = true
      } else {
        this.isNavFixed = false
      }
    },
    init() {
      let { id } = this.$route.params
      this.isMe = id === this.$store.state.uid
      if (!this.isMe) {
        this.getMultiUser(id)
      } else {
        this.getUserInfo(id)
      }
    },
    async follow() {
      let data = await followUser(this.user.objectId)
      if (data.s === 1) {
        this.user.isFollowed = true
      }
    },
    async unfollow() {
      let data = await unFollowUser(this.user.objectId)
      if (data.s === 1) {
        this.user.isFollowed = false
      }
    },
    async getMultiUser(id){
      let data = await getMultiUser(id)
      let user = data.d[id]
      data = await isCurrentUserFollowed(id)
      user.isFollowed = data.d[id]
      this.user = user
    },
    async getUserInfo(id) {
      let data = await getUserInfo(id)
      this.user = data.d
    }
  },
  watch: {
    $route() {
      this.loading = false
    }
  }
} 
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.username-slide-enter, .username-slide-leave-to
  transform translateY(100%)
.username-slide-enter-active, .username-slide-leave-to-active
  transition transform .5s  
.user-header
  position fixed
  width 100%
  background transparent
  z-index 10
  .d-header
    background transparent
    color #fff
    .username-con
      display flex
      align-items center
      height 100%
      font-size 38rem
      .level
        margin-left 10rem
        height 30rem
.mask
  height 285rem
  background #015ab6
.user-info
  position relative
  // height 350rem
  background #fff
  margin-bottom 20rem
  padding 0 30rem
  .avatar
    position absolute
    width 155rem
    height 155rem
    top -72.5rem
    border 5rem solid #eee
    border-radius 50%
    background-size cover
    background-repeat no-repeat
    background-position 50%
  .info
    padding-top 95rem
    height 100%
    .info-box
      padding-bottom 10rem
      height 100%
      display flex
      flex-direction column
      justify-content space-between
      .top
        display flex
        justify-content space-between
        margin-bottom 10rem
        .left
          flex 1
          width 0
          margin-right 50rem
        .username-con
          margin-bottom 10rem
          font-size 40rem
        .job-info
          font-size 25rem
          color #333
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .favorable-author
          font-size 20rem
          color $primary-text-color
    .self-desc
      margin-bottom 15rem
      font-size 25rem
      color $gray-text-color
    .stat-items
      display flex
      .stat-item
        margin-right 30rem
        .number
          color #333
          font-weight 600
        .text
          font-size 25rem
          color $gray-text-color
.user-section
  .nav-tab-con
    height 80rem
    width 100%
    .nav-con
      width 100%
      height 80rem
      z-index 10
      top 105rem
      background #fff
</style>