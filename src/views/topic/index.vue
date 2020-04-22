<template>
  <div class="topic">
    <header ref="header" class="topic-header">
      <d-header>
        <div v-show="showTitle" class="title">{{topic.title}}</div>
        <div slot="right">
          <i class="iconfont icon-fenxiang"></i>
        </div>
      </d-header>
    </header>
    <section class="topic-section">
      <native-scroll @scroll="scroll" @load="load" :loading="loading">
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
        <div ref="nav-con" class="topic-nav-con border-bottom-1px">
          <div :style="{position: navPosition}" class="topic-nav-list">
            <nav-tab :nav-list="navList" background-color="#fff" title-color="#333" active-title-color="#007fff" line-color="#007fff"></nav-tab>
          </div>
        </div>
        <div>
          <router-view ref="routerView" :key="routerKey"></router-view>
        </div>
      </native-scroll>
    </section>

  </div>
</template>

<script>
import DHeader from '../../components/d-header'
import FoldText from '../../components/fold-text'
import NavTab from '../../components/nav-tab'
import NativeScroll from '../../components/native-scroll'
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
      navList: null,
      showTitle: false,
      navPosition: 'static',
      loading: false
    }
  },
  components: {
    DHeader,
    FoldText,
    NavTab,
    NativeScroll
  },
  created() {
    this.init()
  },
  mounted() {
    this.headerHeight = this.$refs['header'].clientHeight
    this.$navCon = this.$refs['nav-con']
  },
  methods: {
    async load() {
      if (this.$refs['routerView'].load) {
        this.loading = true
        await this.$refs['routerView'].load()
        this.loading = false
      }
    },
    scroll(e) {
      let { scrollTop } = e.target
      if (scrollTop > this.headerHeight) {
        this.showTitle = true
      } else {
        this.showTitle = false
      }
      if (scrollTop >= this.$navCon.offsetTop - this.headerHeight) {
        this.navPosition = 'fixed'
      } else {
        this.navPosition = 'static'
      }
    },
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
  z-index 1
  .title
    color #000
.topic-section
  height 100%
.topic-info
  margin-bottom 20*$unit
  padding 120*$unit 20*$unit 20*$unit
  background #fff
  .top
    display flex
    margin-bottom 20*$unit
    .image
      margin-right 20*$unit
      width 150*$unit
      height 150*$unit
      border-radius 10*$unit
      background-size cover
      background-repeat no-repeat
      background-position 50%
    .info
      display flex
      flex-direction column
      justify-content space-between
      margin-right 20*$unit
      flex 1
      width 0
      .title
        font-size 40*$unit
        color #000
      .other
        display flex
        .stat
          display flex
          flex-direction column
          margin-right 50*$unit
          align-items center
          line-height 1.2
          font-size 25*$unit
          color $gray-text-color
          .num
            font-size 32*$unit
            color #000
    .btn-con
      align-self flex-end
  .center
    margin-bottom 20*$unit
    color $gray-text-color
    font-size 28*$unit
  .bottom
    .content
      display flex
      align-items center
      color $gray-text-color
      font-size 28*$unit
      .avatar-list
        display flex
        .avatar
          margin-right 10*$unit
          width 40*$unit
          height 40*$unit
          border-radius 50%
          background-size cover
          background-position 50%
          background-repeat no-repeat
.topic-nav-con
  height 80*$unit
  .topic-nav-list
    top 105*$unit
    height 80*$unit
    width 100%
    z-index 1
    background #fff
    /deep/ .nav-tab
      .nav-content, .nav-list
        width 100%
      .nav-item
        flex 1
        text-align center
</style>