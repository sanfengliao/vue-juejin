<template>
  <div class="topic">
    <header class="topic-header">
      <d-header>
        <div></div>
        <div slot="right">
          <i class="iconfont icon-fenxiang"></i>
        </div>
      </d-header>
    </header>
    <section class="topic-section">
      <div class="topic-info">
        <div class="top">
          <div class="image" :style="{backgroundImage: `url(${topic.icon})`}"></div>
          <div class="info">
            <div class="title">{{topic.title}}</div>
            <div class="other">
              <div class="stat">
                <span class="num">{{topic.followersCount}}</span>
                <span class="text">关注者</span>
              </div>
              <div class="stat">
                <span class="num">{{topic.msgsCount}}</span>
                <span class="text">沸点</span>
              </div>
            </div>
          </div>
          <div class="btn-con">
            <div v-if="!topic.followed"  class="follow">
              <i class="iconfont icon-Add1"></i>
              <span class="text">关注</span>
            </div>
            <div v-else class="follow active">
              <i class="iconfont icon-dui"></i>
              <span class="text">已关注</span>
            </div>
          </div>
        </div>
        <div class="center">
          <fold-text :text="topic.description" />
        </div>
        <div class="bottom">
          <router-link :to="`/topic/${topic.objectId}/attenders`">
            <div class="content">
              <div class="avatar-list">
                <router-link :to="`/user/${item.objectId}`" v-for="item in attenders" :key="item.objectId">
                  <div class="avatar" :style="{backgroundImage: `url(${item.avatarLarge})`}"></div>
                </router-link>
              </div>
              <div class="text">已有{{attenderNum}}人参加</div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="topic-nav-list">
        <nav-tab :nav-list="navList" title-color="#333" active-title-color="#007fff" line-color="#007fff"></nav-tab>
      </div>
    </section>
  </div>
</template>

<script>
import DHeader from '../../components/d-header'
import FoldText from '../../components/fold-text'
import NavTab from '../../components/nav-tab'
import { getTopicInfo, getTopicAttender } from '../../api/topic'
import { keepAliveMixin } from '../../mixins'
export default {
  name: 'topic',
  mixins: [keepAliveMixin],
  data() {
    return {
      topic: {},
      attenderNum: 0,
      attenders: [],
      routerKey: '',
      navList: null
    }
  },
  components: {
    DHeader,
    FoldText,
    NavTab
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let { id } = this.$route.params
      this.navList = [{
        path: `/topic/${id}/rank`,
        title: '热门'
      },{
        path: `/topic/${id}/newest`,
        title: '最新'
      }]
      let path = window.location.pathname
      this.routerKey = path
      this.getTopicInfo(id)
      this.getTopicAttender(id)
    },
    async getTopicInfo(id) {
      let data = await getTopicInfo(id)
      this.topic = data.d
    },
    async getTopicAttender(id) {
      let data = await getTopicAttender(id)
      let { total, list } = data.d
      this.attenderNum = total
      this.attenders = list.slice(0, 6)
    }
  },
  watch:{
    $route() {
      let { path } = this.$route
      if (path.startsWith('/topic/')) {
        this.routerKey = path
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.topic-header
  position fixed
  width 100%
// .topic-section
.topic-info
  margin-bottom 20rem
  padding 120rem 20rem 20rem
  background #fff
  .top
    display flex
    margin-bottom 20rem
    .image
      margin-right 20rem
      width 150rem
      height 150rem
      border-radius 10rem
      background-size cover
      background-repeat no-repeat
      background-position 50%
    .info
      display flex
      flex-direction column
      justify-content space-between
      margin-right 20rem
      flex 1
      width 0
      .title
        font-size 40rem
        color #000
      .other
        display flex
        .stat
          display flex
          flex-direction column
          margin-right 50rem
          align-items center
          line-height 1.2
          font-size 25rem
          color $gray-text-color
          .num
            font-size 32rem
            color #000
    .btn-con
      align-self flex-end
  .center
    margin-bottom 20rem
    color $gray-text-color
    font-size 28rem
  .bottom
    .content
      display flex
      align-items center
      color $gray-text-color
      font-size 28rem
      .avatar-list
        display flex
        .avatar
          margin-right 10rem
          width 40rem
          height 40rem
          border-radius 50%
          background-size cover
          background-position 50%
          background-repeat no-repeat
.topic-nav-list
  background #fff
  /deep/ .nav-tab
    .nav-content, .nav-list
      width 100%
    .nav-item
      flex 1
      text-align center
</style>