<template>
  <div class="collection-con">
      <header ref="header" class="collection-header">
        <m-header :go-back="goBackAndRemoveKeepAlive" :title="collection.title || '掘金'"></m-header>
      </header>
      <scroll @scroll="scroll" :options="{bounce: {top: false}}">
        <section class="collection-section">
          <div class="collection-info" :style="{backgroundImage: `url(${collection.bgImg && collection.bgImg.url})`}">
            <swiper class="swiper" 
              :options="{
                pagination: {
                  el: '.swiper-pagination'
                }
              }"
            >
              <swiper-slide class="swiper-slide">
                <div class="basic">
                  <div class="user">
                    <div class="user-avatar" :style="{backgroundImage: `url(${user.avatarLarge || $store.state.defaultAvatar})`}"></div>
                    <div class="username">{{user.username}}</div>
                  </div>
                  <div class="title">
                    {{collection.title}}
                  </div>
                  <div class="other">
                    <span>{{collection.entryCount}}篇 · {{collection.followCount}}关注 · {{collection.updateTime | dateDis}}更新</span>
                    <div class="btn-con">
                      <div v-if="status===0" class="edit-btn btn">编辑</div>
                      <div @click="unFollow" v-if="status===1" class="followed-btn btn">已关注</div>
                      <div @click="follow" v-if="status===2" class="follow-btn btn">关注</div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide class="swiper-slide">
                <div class="desc">
                  {{collection.description}}
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="collection-content">
            <div class="article-list-con" v-if="entries.length">
              <ul class="article-list">
                <li class="article-item border-bottom-1px" v-for="item in entries" :key="item.objectId">
                  <router-link :to="`/post/${item.objectId}`">
                    <s-article-entry :article="item"/>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="empty" v-else>
              <div class="iconfont-con">
                <i class="iconfont icon-article"></i>
              </div>
              <span>这里空空什么都没有呢...</span>
            </div>
          </div>
        </section>
      </scroll>
    <!-- </div> -->
  </div>
</template>

<script>
import { getCollectionSetInfo, getCollectionSetEntries, followCollection, unFollowCollection } from '../../api/collection'
import { getEntryByIds } from '../../api/entry'
import { getMultiUser } from '../../api/user'
import MHeader from '../../components/m-header'
import Scroll from '../../components/scroll'
import SArticleEntry from '../../components/s-article-entry'
import { keepAliveMixin } from '../../mixins'
export default {
  mixins: [keepAliveMixin],
  name: 'collection',
  data() {
    return {
      collection:{},
      entries: [],
      user: {},
      scrollY: 0,
      translateY: 0,
      isScrollToTop: false
    }
  },
  components: {
    MHeader,
    Scroll,
    SArticleEntry
  },
  created() {
    this.init()
  },
  mounted() {
    
  },
  computed: {
    status() {
      if (this.collection.creator === this.$store.state.uid) {
        return 0
      }
      return this.collection.isFollowed ? 1 : 2
    }
  },
  methods: {
    scroll(pos) {
      
    },
    async unFollow() {
      let data = await unFollowCollection(this.collection.csId)
      if (data.s === 1) {
        this.collection.isFollowed = false
      }
    },
    async follow() {
      let data = await followCollection(this.collection.csId)
      if (data.s === 1) {
        this.collection.isFollowed = true
      }
    },
    init() {
      this.page = 0
      let { id } = this.$route.params
      this.getCollectionSetInfo(id)
      this.getEntries(id)
    },
    async getCollectionSetInfo(id) {
      let data = await getCollectionSetInfo(id)
      if (data.d.length) {
        let collection = data.d[0]
        this.collection = collection
        data = await getMultiUser(collection.creator)
        if (data.d) {
          this.user = data.d[collection.creator]
        }
      }
    },
    async getEntries(id) {
      let data = await getCollectionSetEntries(id, this.page)
      let entryIds = data.d.join('|')
      data = await getEntryByIds(entryIds)
      if (data.d.entrylist) {
        for (let item of data.d.entrylist) {
          this.entries.push(item)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.collection
  height 100%
.collection-header
  position fixed
  width 100%
  z-index 20
  .m-header
    color #fff
    background transparent
    
    
.collection-section
  height 100%
  .collection-info
    height 450*$unit
    background-size cover
    background-position 50%
    background-repeat no-repeat
    .swiper-container
      height 100%
      /deep/ .swiper-pagination-bullet
        background #ffffff
      .basic
        display flex
        flex-direction column
        justify-content space-between
        height 100%
        color #fff
        padding 150*$unit 35*$unit 40*$unit
        .user
          display flex
          align-items center
          .user-avatar
            margin-right 20*$unit
            width 80*$unit
            height 80*$unit
            border-radius 50%
            background-size cover
            background-position 50%
            background-repeat no-repeat
          .username
            font-size 28*$unit
        .title
          font-size 35*$unit
          font-weight 600
        .other
          display flex
          align-items center
          justify-content space-between
          font-size 25*$unit
          .btn
            font-size 25*$unit
            padding 15*$unit 50*$unit
            border 1px solid #fff
            color #fff
          .followed-btn
            background $primary-green-color
            border none
      .desc
        position relative
        height 100%
        display flex
        align-items center
        justify-content center
        padding  0 30*$unit
        font-size 28*$unit
        color #fff

    
  .collection-info
    .empty
      display flex
      flex-direction column
      align-items center
      justify-content center
      height 100%
      background #fff
      color $gray-text-color
      .iconfont-con
        margin-bottom 20*$unit
        .iconfont
          font-size 100*$unit

</style>