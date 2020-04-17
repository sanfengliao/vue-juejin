<template>
  <div class="book-con">
    <div class="book-content">
      <header class="book-header">
        <d-header :go-back="goBackAndRemoveKeepAlive" :title="book.title || '掘金'"></d-header>
      </header>
      <section class="book-section">
        <div class="book-info border-bottom-1px">
          <div class="poster">
            <img class="img" :src="book.img" alt="" width="100%">
          </div>
          <div class="info">
            <div class="book-title">{{book.title}}</div>
            <div class="book-desc">{{book.desc}}</div>
            <div class="author" v-if="book.userData">
              <router-link class="author-info" :to="`/user/${book.userData.uid}`">
                <div class="avatar" :style="{backgroundImage: `url(${book.userData.avatarLarge})`}"></div>
                <div class="username">
                  <span class="name">{{book.userData.username}}</span>
                  <img v-if="book.userData.level" class="level" :src="book.userData.level | levelImage" alt="">
                </div>
              </router-link>
              <div v-if="book.wechatImg" class="wechat-info">
                <i class="iconfont icon-tianjiaqunzu"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="book-bought border-bottom-1px">
          <div class="bought-num">
            <img src="https://b-gold-cdn.xitu.io/v3/static/img/buy-icon.1323aad.svg" alt="">
            <span>{{book.buyCount}}人已购买</span>
          </div>
          <div class="users">
            <div class="user" v-for="item in boughtUsers" :style="{backgroundImage: `url(${item.avatarLarge || $store.state.defaultAvatar})`}" :key="item.key"></div>
          </div>
        </div>
        <div class="book-sections-con">
          <div class="book-sections-head">小册内容</div>
          <div class="book-sections-content">
            <ul class="book-section-list">
              <li class="book-section-item border-bottom-1px" v-for="(item, index) in bookSections" :key="item._id">
                <router-link :to="`/book/${bookId || item.metaId}/section/${item._id}`">
                  <b-section :isBuy="book.isBuy" :section="item" :index="index"></b-section>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="book-summary-con">
          <div class="article-content" v-html="book.summaryHtml">

          </div>
        </div>
      </section>
      <footer class="book-footer border-top-1px">
        <div class="operate">
          <button class="btn button-read" @click="toRead">试读</button>
          <button class="btn button-buy">购买 ￥{{book.price}}</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import DHeader from '../../components/d-header'
import BSection from '../../components/b-section'
import { getBookDetail, getListBuy, getBookSections } from '../../api/book'
import { keepAliveMixin } from '../../mixins/index'
export default {
  name: 'book',
  mixins: [keepAliveMixin],
  data() {
    return {
      bookId: '',
      book: {},
      buyUsers: [],
      bookSections: []
    }
  },
  components: {
    DHeader,
    BSection
  },
  computed: {
    boughtUsers() {
      return this.buyUsers.slice(0, 6)
    }
  },
  created() {
    console.log(this.$options.name)
    this.init()
  },
  methods: {
    init() {
      let { id } = this.$route.params
      this.bookId = id
      this.getBookDetail(id)
      this.getBuyUsers(id)
      this.getBookSections(id)
    },
    toRead() {
      for (let item of this.bookSections) {
        if (item.isFree) {
          this.$router.push(`/book/${this.bookId}/section/${item._id}`)
          return
        }
      }
    },
    async getBookDetail(id) {
      let data = await getBookDetail(id)
      this.book = data.d
    },
    async getBuyUsers(id) {
      let data = await getListBuy(id)
      for (let item of data.d) {
        this.buyUsers.push(item)
      }
    },
    async getBookSections(id) {
      let data = await getBookSections(id)
      for (let item of data.d) {
        this.bookSections.push(item)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl";
.book-content
  position relative
  height 100%
.book-header
  position absolute
  width 100%
  .d-header
    background #0180ff
    color #fff
.book-section
  position absolute
  top 105*$unit
  bottom 100*$unit
  width 100%
  overflow scroll
.book-info
  padding 25*$unit
  min-height 255*$unit
  display flex
  align-items center
  background #fff
  .poster
    margin-right 20*$unit
    flex 0 0 165*$unit
    height 230*$unit
  .info
    flex 1
    width 0
    .book-title
      margin-bottom 20*$unit
      font-size 33*$unit
      font-weight bold
    .book-desc
      font-size 25*$unit
      line-height 40*$unit
      color #71777c
    .author
      display flex
      align-items center
      justify-content space-between
      .author-info
        display flex
        align-items center
        .avatar
          margin-right 10*$unit
          width 50*$unit
          height 50*$unit
          border-radius 50%
          background-size cover
          background-repeat no-repeat
          background-position 50%
        .username
          display flex
          align-items center
          font-size 25*$unit
          .name
            margin-right 5*$unit
          .level
            height 25*$unit
      .wechat-info
        .iconfont
          font-size 40*$unit
          color #71777c
.book-bought
  display flex
  align-items center
  justify-content space-between
  padding 16*$unit 25*$unit
  background #fff
  .bought-num
    display flex
    align-items center
    font-size 28*$unit
    color $gray-text-color
  .users
    display flex
    .user
      width 50*$unit
      height 50*$unit
      border-radius 50%
      background-size cover
      background-position 50%
      background-repeat no-repeat
      margin-right 8*$unit
.book-sections-con
  margin-bottom 20*$unit
  background #fff
.book-sections-head
  padding 20*$unit 30*$unit
  font-size 40*$unit
  color #333
  font-weight 600
.book-sections-content
  padding-left 10*$unit

.book-summary-con
  padding 20*$unit
  background #fff

.book-footer
  position fixed
  bottom 0
  width 100%
  height 100*$unit
  background #fff
  .operate
    padding 0 8*$unit
    height 100%
    display flex
    align-items center
    justify-content space-between
    .btn
      height 80*$unit
      line-height 80*$unit
      text-align center
      border-radius 10*$unit
      font-size 27*$unit
      font-weight bold
    .button-read
      width 240*$unit
      border 1px solid #007fff
      color  #007fff
      background  #fff
    .button-buy
      width 480*$unit
</style>