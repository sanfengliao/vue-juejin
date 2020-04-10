<template>
  <div class="pin-con">
    <header class="pin-header border-bottom-1px">
      <d-header :go-back="goBackAndRemoveKeepAlive">
        <div class="pin-header-con" ref="header-con">
          <div class="pin-header-content" ref="header-content">
            <div class="author-con">
              <s-author :author="pin.user"></s-author>
            </div>
            <div class="pin-title-con">
              <h2 class="title">沸点详情</h2>
            </div>
          </div>
        </div>
      </d-header>
    </header>
    <section class="pin-section">
      <load-scroll @scroll="scroll" :load-more="loadMore" :load-finish="loadFinish" :is-loading="isLoading">
        <div class="main-con">
          <section class="pin-content-con con">
            <div class="pin-author-con">
              <author :author="pin.user"></author>
            </div>
            <div class="pin-content">
              <pin-info :pin="pin"></pin-info>
            </div>
          </section>
          <section v-if="recommendPins.length>0" class="recommend-pins-con">
            <router-link :to="``" class="recommend-title-con">
              <div class="recommend-title con">
                <span class="title">相关推荐</span>
                <i class="iconfont icon-go"></i>
              </div>
            </router-link>
            <div class="recommend-pin-list-con">
              <swiper :options="swiperOptions">
                <swiper-slide v-for="item in recommendPins" :key="item.objectId">
                  <router-link :to="`/pin/${item.objectId}`" class="s-pin-entry">
                    <s-pin-entry :pin="item"></s-pin-entry>
                  </router-link>
                </swiper-slide>
              </swiper>
            </div>
            <div class="line">

            </div>
          </section>
          <section class="comment-list-con con" v-if="comments.length>0">
            <ul v-if="pin.user && comments.length>0" class="pin-comment-list">
              <li v-for="item in comments" class="pin-comment-item border-bottom-1px" :key="item.id">
                <comment :authorId="pin.user.id" :comment="item"></comment>
              </li>
            </ul>
            <div v-else class="no-comment">
              <i class="iconfont icon-Comment"></i>
              <span>暂无评论</span>
            </div>
          </section>
        </div>
      </load-scroll>
    </section>
  </div>
</template>

<script>
import DHeader from '../../components/d-header'
import SAuthor from '../../components/s-author'
import Author from '../../components/m-author'
import LoadScroll from '../../components/load-scroll'
import PinInfo from '../../components/pin-info'
import Comment from '../../components/comment'
import SPinEntry from '../../components/s-pin-entry'
import { getPinById, getTopicList, getPinComments } from '../../api/pins'
import { keepAliveMixin } from '../../mixins'
export default {
  // mixins: [keepAliveMixin],
  name: 'pin',
  data() {
    return {
      pin: {},
      comments: [],
      recommendPins: [],
      loadFinish: true,
      isLoading: false,
      swiperOptions: {
        slidesPerView: 1.1,
        centeredSlides: true,
        spaceBetween: 10,
        loop: true
      }
    }
  },
  components: {
    DHeader,
    SAuthor,
    LoadScroll,
    Author,
    PinInfo,
    Comment,
    SPinEntry
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let { id } = this.$route.params
      this.page = 0
      this.getPinById(id)
      this.getPinComments(id)
    },
    scroll(e) {

    },
    loadMore() {
      let { id } = this.$route.params
      this.getPinComments(id)
    },
    async getPinById(id) {
      let data = await getPinById(id)
      this.pin = data.d
      if (this.pin.topicId) {
        this.getTopicList(this.pin.topicId)
      }
    },
    async getPinComments(id) {
      let data = await getPinComments(id, this.page)
      for (let item of data.d.comments) {
        this.comments.push(item)
      }
      console.log(this.comments)
    },
    async getTopicList(id) {
      let data = await getTopicList(id, 2, 6)
      for (let item of data.d.list) {
        this.recommendPins.push(item)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

.pin-header
  position fixed
  width 100%
  border-bottom: 1px solid #edeeef
  z-index 1
  .pin-header-con
    width 100%
    height 100%
    overflow hidden
  .pin-header-content
    width 100%
    height 200%
    transform translateY(-50%)
    transform all .5s
    .author-con
      display flex
      align-items center
      width 100%
      height 50%
    .pin-title-con
      display flex
      align-items center
      width 100%
      height 50%
.pin-section
  height 100%
 
  .main-con
    padding-top 105rem
  .pin-content-con
    margin-bottom 20rem
    padding 20rem 20rem
    background #fff
    .pin-author-con
      margin-bottom 20rem

.pin-content
  .content
    margin-bottom 30rem
    font-size 30rem
.recommend-pins-con
  margin-bottom 20rem
  .recommend-title-con
    margin-bottom 8rem
    display block
  .recommend-pin-list-con
    margin-bottom 8rem
    .s-pin-entry
      display block
      // margin 0 10rem
      height 210rem
      background #fff
  .recommend-title
    height 80rem
    display flex
    align-items center
    justify-content space-between
    font-size 30rem
    background #fff
    .iconfont
      color #909090
      font-size 25rem
  
  .line
    height 22rem
    background #fff
.comment-list-con
  background #fff
  .no-comment
    height 300rem
    background: #fff
    display flex
    flex-direction column
    justify-content center
    align-items center
    font-size 30rem
    color #909090
    .iconfont
      font-size 70rem
</style>