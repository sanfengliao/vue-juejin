<template>
  <div class="home-following">
    <scroll>
      <div v-if="!isLogin" class="need-login-con">
        <need-login />
      </div>
      <div class="article-list-con">
        <ul v-if="articles" class="article-list">
          <li class="article-item" v-for="(item, i) in articles" :key="item.id">
            <router-link :to="`/post/${item.id}`">
              <l-article-entry :article="item" />
            </router-link>
            <div v-if="i === 3 && showRecommendedUser" class="recommended-user-con">
              <div class="title border-bottom-1px">
                <span class="text">你可能感兴趣的人</span>
                <i class="iconfont icon-remove" @click="hideRecommendedUser"></i>
              </div>
              <ul class="user-list">
                <li class="user-item border-bottom-1px" v-for="item in recommendedUsers" :key="item.id">
                  <router-link :to="`/user/${item.author.id}`">
                    <m-author :author="item.author" />
                    <div class="description">{{item.description}}</div>
                  </router-link>
                </li>
              </ul>
              <div class="change" >
                <span @click="getRecommendedUser"><i class="iconfont icon-shuaxin"></i>换一批</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../components/scroll'
import LArticleEntry from '../../components/l-article-entry'
import MAuthor from '../../components/m-author'
import NeedLogin from '../../components/need-login'
import { getFollowingUserArticle, getEntryByPeriod, getRecommendedUser } from '../../api/home'
export default {
  data() {
    return {
      articles: [],
      recommendedUsers:[],
      showUser: true
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    },
    showRecommendedUser() {
      return this.recommendedUsers.length > 0 && this.showUser
    }
  },
  components: {
    Scroll,
    LArticleEntry,
    MAuthor,
    NeedLogin
  },
  created() {
    this.init()
  },
  methods: {
    hideRecommendedUser() {
      this.showUser = false
    },
    init() {
      this.refresh()
    },
    async refresh() {
      if (this.isLogin) {
        this.exclude = []
        this.getRecommendedUser()
      } else {
        this.recommendedUsers = []
      }
      this.after = ''
      this.before = ''
      let entries = await this.getFollowingUserArticle()
      console.log(entries)
      this.articles = entries
    },
    async getFollowingUserArticle() {
      if (this.isLogin) {
        let data = await getFollowingUserArticle(this.after)
        let { pageInfo, userActivities } = data.data.followingActivityFeed.items
        this.after = pageInfo.endCursor
        return userActivities.map(item => item.userActivity.entries[0])
      } else {
        let data = await getEntryByPeriod('all', this.before)
        let { entrylist } = data.d
        this.before = entrylist[entrylist.length - 1].hotIndex
        return entrylist
      }
    },
    async getRecommendedUser() {
      let data = await getRecommendedUser(this.exclude)
      let users = data.data.articleAuthorRecommendationCard.items
      this.exclude = users.map(item =>item.id)
      this.recommendedUsers = users
    }
  },
  watch: {
    isLogin() {
      this.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.home-following
  .article-item
    margin-bottom 20rem
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