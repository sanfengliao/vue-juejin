<template>
  <div class="pins-following">
    <scroll @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
      <div class="user-activty-con">
        <ul v-if="isLogin" class="user-activity-list">
          <li v-for="item in activies" :key="item.id" class="activity-item">
            <div v-if="item.action === 'PUBLISH_ARTICLE'">
              <router-link :to="`/post/${item.entries[0].id}`">
                <l-article-entry @like="likeArticle" @toggleFollow="toggleFollow" :article="item.entries[0]"/>
              </router-link>
            </div>
            <div v-if="item.action === 'LIKE_ARTICLE'">
              <div class="action like-action border-bottom-1px">
                <span v-if="item.actors[0].viewerIsFollowing">你关注的 </span>
                <span class="actor-name">{{item.actors[0].username}}</span>
                <span> 赞了这边文章</span>
              </div>
              <div>
                <router-link :to="`/post/${item.entries[0].id}`">
                  <l-article-entry @like="likeArticle"  @toggleFollow="toggleFollow" :article="item.entries[0]"/>
                </router-link>
              </div>
            </div>
            <div v-if="item.action === 'FOLLOW_USER'">
              <div class="action follow-action">
                <div class="actor-avatar" :style="{backgroundImage: `url(${item.actors[0].avatarLarge || $store.state.defaultAvatar})`}"></div>
                <div class="action-content">
                  <div class="user-info">
                    <span class="username">{{item.actors[0].username}} </span>
                    <span class="text">关注了</span>
                    <div class="follow-user">
                      <router-link :to="`/user/${item.users[0].id}`">
                        <span class="username">{{item.users[0].username}}</span>
                      </router-link>
                      <img class="level" :src="item.users[0].level | levelImage" alt="">
                    </div>
                  </div>
                  <div class="actor-job">
                    <span v-if="item.actors[0].jobTitle">{{item.actors[0].jobTitle}}</span> 
                    <span v-if="item.actors[0].jobTitle && item.actors[0].company"> @ </span>
                    <span v-if="item.actors[0].company">{{item.actors[0].company}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="item.action === 'FOLLOW_TAG'">
              <div class="action follow-action">
                <div class="actor-avatar" :style="{backgroundImage: `url(${item.actors[0].avatarLarge || $store.state.defaultAvatar})`}"></div>
                <div class="action-content">
                  <div class="user-info">
                    <span class="username">{{item.actors[0].username}} </span>
                    <span class="text">关注了标签</span>
                    <router-link :to="`/tag/${item.tags[0].id}`" class="follow-tag">
                      <img class="tag-icon" v-if="item.tags[0].icon" :src="item.tags[0].icon" alt="">
                      {{item.tags[0].title}}
                    </router-link>
                  </div>
                  <div class="actor-job">
                    <span v-if="item.actors[0].jobTitle">{{item.actors[0].jobTitle}}</span> 
                    <span v-if="item.actors[0].jobTitle && item.actors[0].company"> @ </span>
                    <span v-if="item.actors[0].company">{{item.actors[0].company}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="item.action === 'PUBLISH_PIN'">
              <router-link :to="`/pin/${item.pins[0].id}`">
                <l-pin-entry @like="likePin" @toggleFollow="toggleFollow" :pin="item.pins[0]"/> 
              </router-link>
            </div>
            <div v-if="item.action === 'LIKE_PIN'">
              <div class="action like-action border-bottom-1px">
                <span v-if="item.actors[0].viewerIsFollowing">你关注的 </span>
                <span class="actor-name">{{item.actors[0].username}}</span>
                <span> 赞了这边沸点</span>
              </div>
              <div>
                <router-link :to="`/pin/${item.pins[0].id}`">
                  <l-pin-entry @like="likePin"  @toggleFollow="toggleFollow" :pin="item.pins[0]" />
                </router-link>
              </div>
            </div>
          </li>
        </ul>
        <div v-else>
          <div class="need-login-con">
            <need-login title="登录后可以查看关注动态"/>
            <div class="recommended-user-con">
              <div class="title border-bottom-1px">
                <span class="text">你可能感兴趣的人</span>
              </div>
              <ul class="user-list">
                <li class="user-item border-bottom-1px" v-for="item in recommendedUsers" :key="item.id">
                  <router-link :to="`/user/${item.id}`">
                    <m-author :author="item" />
                  </router-link>
                </li>
              </ul>
              <div class="change" >
                <span @click="getRecommendedUser"><i class="iconfont icon-shuaxin"></i>换一批</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import LArticleEntry from '@/components/l-article-entry'
import LPinEntry from '@/components/l-pin-entry'
import Scroll from '@/components/scroll'
import NeedLogin from '@/components/need-login'
import MAuthor from '@/components/m-author'
import { getFollowingUserActivities, getRecommendedUser, likePin, unlikePin } from '@/api/pins.js'
import { followUser,unFollowUser } from '@/api/user'
import { likeEntry } from '@/api/entry'
export default {
  name: 'pin-following',
  data() {
    return {
      activies: [],
      recommendedUsers:[],
      refreshing: false,
      loading: false
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  components: {
    LArticleEntry,
    LPinEntry,
    Scroll,
    NeedLogin,
    MAuthor
  },
  created() {
    this.init()
  },
  methods: {
    async toggleFollow(author) {
      if (author.viewerIsFollowing) {
        let data = await unFollowUser(author.id)
        if (data.s === 1) {
          author.viewerIsFollowing = false
        }
      } else {
        let data = await followUser(author.id)
        if (data.s === 1) {
          author.viewerIsFollowing = true
        }
      }
    },
    async likePin(pin) {
      if (pin.viewerHasLiked) {
        let data = await unlikePin(pin.id)
        if (data.s === 1) {
          pin.viewerHasLiked = false
          pin.likeCount -= 1
        }
      } else {
        let data = await likePin(pin.id)
        if (data.s === 1) {
          pin.viewerHasLiked = true
          pin.likeCount += 1
        }
      }
    },
    async likeArticle(article) {
      let data = await likeEntry(article.id)
      if (data.s === 1) {
        if (article.viewerHasLiked) {

          article.likeCount -= 1
          article.viewerHasLiked = false
        } else {
          article.likeCount += 1
          article.viewerHasLiked = true
        }
      }
    },
    init() {
      this.refresh()
    },
    async refresh() {
      if (this.isLogin) {
        this.refreshing = true
        this.after = ''
        this.activies = await this.getFollowingUserActivities()
        this.refreshing = false
      } else {
        this.exclude = []
        this.getRecommendedUser()
      }
    },
    async load() {
      if (this.isLogin) {
        this.loading = true
        let activies = await this.getFollowingUserActivities()
        for (let item of activies) {
          this.activies.push(item)
        }
        this.loading = false
      }
    },
    async getFollowingUserActivities() {
      let data = await getFollowingUserActivities(this.after)
      let { pageInfo, userActivities } = data.data.followingActivityFeed.items
      this.after = pageInfo.endCursor
      return userActivities.map(item => item.userActivity)
    },
    async getRecommendedUser() {
      let data = await getRecommendedUser(this.exclude)
      let items = data.data.userRecommendationCard.items
      this.exclude = items.map(item => item.id)
      this.recommendedUsers = items.map(item => {
        let {user, achievement, description } = item
        user.jobTitle = description
        user.company = ''
        user.description = achievement
        return user
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../../assets/css/variable.styl"
.pins-following
  height 100%
  .user-activty-con
    .user-activity-list
      .activity-item
        margin-bottom 20*$unit
        .action
          background #fff
          padding 20*$unit
        .like-action
          font-size 25*$unit
          color $gray-text-color
          .actor-name
            color #333
        .follow-action
          display flex
          .actor-avatar
            margin-right 20*$unit
            width 80*$unit
            height 80*$unit
            border-radius 50%
            background-size cover
            background-position 50%
            background-repeat no-repeat
          .action-content
            display flex
            flex-direction column
            justify-content space-between
            .user-info
              display flex
              align-items center
              font-size 30*$unit
              color $gray-text-color
              .username
                color #333
              .text
                margin 0 8*$unit
              .follow-user
                display flex
                align-items center
                height 35*$unit
                .level
                  margin-left 5*$unit
                  height 25*$unit
              .follow-tag
                color #333
                .tag-icon
                  width 28*$unit
                  margin-right 4*$unit
            .actor-job
              font-size 25*$unit
              color $gray-text-color
    .recommended-user-con
      margin-top 20*$unit
      .title
        display flex
        justify-content space-between
        padding 15*$unit 20*$unit
        background #fff
        font-size 28*$unit
        color #333
        .iconfont
          font-size 28*$unit
      .user-item
        .description
          margin-top -20*$unit
          padding-left 120*$unit
          color #909090
          font-size 20*$unit
          background #fff
      .change
        padding 15*$unit 20*$unit
        text-align center
        background #fff
        font-size 28*$unit
        color $primary-color
        .iconfont
          margin-right 10*$unit
          font-size 28*$unit
</style>