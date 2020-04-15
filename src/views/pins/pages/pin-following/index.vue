<template>
  <div class="pins-following">
    <scroll>
      <div class="user-activty-con">
        <ul v-if="isLogin" class="user-activity-list">
          <li v-for="item in activies" :key="item.id" class="activity-item">
            <div v-if="item.action === 'PUBLISH_ARTICLE'">
              <router-link :to="`/post/${item.entries[0].id}`">
                <l-article-entry :article="item.entries[0]"/>
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
                  <l-article-entry :article="item.entries[0]"/>
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
                <l-pin-entry :pin="item.pins[0]"/> 
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
                  <l-pin-entry :pin="item.pins[0]" />
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
import { getFollowingUserActivities, getRecommendedUser } from '@/api/pins.js'
export default {
  name: 'pin-following',
  data() {
    return {
      activies: [],
      recommendedUsers:[]
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
    init() {
      this.refresh()
    },
    async refresh() {
      if (this.isLogin) {
        this.after = ''
        this.activies = await this.getFollowingUserActivities()
      } else {
        this.exclude = []
        this.getRecommendedUser()
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
        margin-bottom 20rem
        .action
          background #fff
          padding 20rem
        .like-action
          font-size 25rem
          color $gray-text-color
          .actor-name
            color #333
        .follow-action
          display flex
          .actor-avatar
            margin-right 20rem
            width 80rem
            height 80rem
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
              font-size 30rem
              color $gray-text-color
              .username
                color #333
              .text
                margin 0 8rem
              .follow-user
                display flex
                align-items center
                height 35rem
                .level
                  margin-left 5rem
                  height 25rem
              .follow-tag
                color #333
                .tag-icon
                  width 28rem
                  margin-right 4rem
            .actor-job
              font-size 25rem
              color $gray-text-color
    .recommended-user-con
      margin-top 20rem
      .title
        display flex
        justify-content space-between
        padding 15rem 20rem
        background #fff
        font-size 28rem
        color #333
        .iconfont
          font-size 28rem
      .user-item
        .description
          margin-top -20rem
          padding-left 120rem
          color #909090
          font-size 20rem
          background #fff
      .change
        padding 15rem 20rem
        text-align center
        background #fff
        font-size 28rem
        color $primary-color
        .iconfont
          margin-right 10rem
          font-size 28rem
</style>