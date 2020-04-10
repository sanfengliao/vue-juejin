<template>
  <div class="collection-con">
    <!-- <div class="collection"> -->
      <header ref="header" class="collection-header">
        <d-header :go-back="goBackAndRemoveKeepAlive" :title="collection.title || '掘金'"></d-header>
      </header>
      <div class="mask"></div>
      <div ref="info" class="collection-info" :style="{backgroundImage: `url(${collection.bgImg && collection.bgImg.url})`, transform: `translateY(${translateY}px)`}">
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
      <section class="collection-section">
          <div class="scroll-con">
            <scroll @scroll="scroll" :probe-type="2" :options="{bounce:{top: false}}" v-if="entries.length">
              <div class="article-list-con">
                <ul class="article-list">
                  <li class="article-item border-bottom-1px" v-for="item in entries" :key="item.objectId">
                    <router-link :to="`/post/${item.objectId}`">
                      <s-article-entry :article="item"/>
                    </router-link>
                  </li>
                </ul>
              </div>
            </scroll>
            <div class="empty" v-else>
              <div class="iconfont-con">
                <i class="iconfont icon-article"></i>
              </div>
              <span>这里空空什么都没有呢...</span>
            </div>
          </div>
      </section>
    <!-- </div> -->
  </div>
</template>

<script>
import { getCollectionSetInfo, getCollectionSetEntries, followCollection, unFollowCollection } from '../../api/collection'
import { getEntryByIds } from '../../api/entry'
import { getMultiUser } from '../../api/user'
import DHeader from '../../components/d-header'
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
    DHeader,
    Scroll,
    SArticleEntry
  },
  created() {
    this.init()
  },
  mounted() {
    this.minY = -this.$refs['info'].clientHeight + this.$refs['header'].clientHeight
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
      let { y } = pos
      if (y <= this.minY) {
        this.translateY = this.minY * 0.68
        this.isScrollToTop = true
      } else {
        this.translateY = y * 0.68
        this.isScrollToTop = false
      }
    },
    async unFollow() {
      console.log('unfflow')
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
  .d-header
    color #fff
    background rgba(255, 255, 255, 0.1)
    // background transparent
.mask
  position fixed
  z-index 15
  height 103rem
  width 100%
  &::after
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
.collection-info
  position absolute
  width 100%
  height 450rem
  background-size cover
  background-position 50%
  background-repeat no-repeat
  background-color #000
  z-index 2
  .swiper-container
    height 100%
  .basic
    display flex
    flex-direction column
    justify-content space-between
    height 100%
    color #fff
    padding 150rem 35rem 40rem
    .user
      display flex
      align-items center
      .user-avatar
        margin-right 20rem
        width 80rem
        height 80rem
        border-radius 50%
        background-size cover
        background-position 50%
        background-repeat no-repeat
      .username
        font-size 28rem
    .title
      font-size 35rem
      font-weight 600
    .other
      display flex
      align-items center
      justify-content space-between
      font-size 25rem
      .btn
        font-size 25rem
        padding 15rem 50rem
        border 1px solid #fff
      .followed-btn
        background $primary-green-color
        border none
  .desc
    height 100%
    display flex
    align-items center
    justify-content center
    padding  0 30rem
    font-size 28rem
    color #fff
.collection-section
  position absolute
  top 115rem
  bottom 0
  width 100%
  // height 100%
  overflow hidden
  .scroll-con
    position fixed
    bottom 0
    top 455rem
    width 100%
    z-index 10
    .scroll-wrapper
      overflow visible
    .article-list
      z-index 10
    .empty
      display flex
      flex-direction column
      align-items center
      justify-content center
      height 100%
      background #fff
      color $gray-text-color
      .iconfont-con
        margin-bottom 20rem
        .iconfont
          font-size 100rem

</style>