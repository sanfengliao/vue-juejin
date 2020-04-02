<template>
  <div class="book-con">
    <div v-if="book" class="book-content">
      <header class="book-header">
        <d-header :title="book.title"></d-header>
      </header>
      <section class="book-section">
        <div class="book-info border-bottom-1px">
          <div class="poster">
            <img class="img" :src="book.img" alt="" width="100%">
          </div>
          <div class="info">
            <div class="book-title">{{book.title}}</div>
            <div class="book-desc">{{book.desc}}</div>
            <div class="author">
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
            <book-section-list :book-id="bookId" :book-sections="bookSections"></book-section-list>
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
import BookSectionList from '../../components/book-section-list'
import { getBookDetail, getListBuy, getBookSections } from '../../api/book'
export default {
  data() {
    return {
      bookId: '',
      book: null,
      buyUsers: [],
      bookSections: []
    }
  },
  components: {
    DHeader,
    BookSectionList
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
          this.$router.push(`/book/m/${this.bookId}/section/${item._id}`)
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
  top 105rem
  bottom 100rem
  width 100%
  overflow scroll
.book-info
  padding 25rem
  min-height 255rem
  display flex
  align-items center
  background #fff
  .poster
    margin-right 20rem
    flex 0 0 165rem
    height 230rem
  .info
    flex 1
    width 0
    .book-title
      margin-bottom 20rem
      font-size 33rem
      font-weight bold
    .book-desc
      font-size 25rem
      line-height 40rem
      color #71777c
    .author
      display flex
      align-items center
      justify-content space-between
      .author-info
        display flex
        align-items center
        .avatar
          margin-right 10rem
          width 50rem
          height 50rem
          border-radius 50%
          background-size cover
          background-repeat no-repeat
          background-position 50%
        .username
          display flex
          align-items center
          font-size 25rem
          .name
            margin-right 5rem
          .level
            height 25rem
      .wechat-info
        .iconfont
          font-size 40rem
          color #71777c
.book-bought
  display flex
  align-items center
  justify-content space-between
  padding 16rem 25rem
  background #fff
  .bought-num
    display flex
    align-items center
    font-size 28rem
    color $gray-text-color
  .users
    display flex
    .user
      width 50rem
      height 50rem
      border-radius 50%
      background-size cover
      background-position 50%
      background-repeat no-repeat
      margin-right 8rem
.book-sections-con
  margin-bottom 20rem
  background #fff
.book-sections-head
  padding 20rem 30rem
  font-size 40rem
  color #333
  font-weight 600
.book-sections-content
  padding-left 10rem

.book-summary-con
  padding 20rem
  background #fff

.book-footer
  position fixed
  bottom 0
  width 100%
  height 100rem
  background #fff
  .operate
    padding 0 8rem
    height 100%
    display flex
    align-items center
    justify-content space-between
    .btn
      height 80rem
      line-height 80rem
      text-align center
      border-radius 10rem
      font-size 27rem
      font-weight bold
    .button-read
      width 240rem
      border 1px solid #007fff
      color  #007fff
      background  #fff
    .button-buy
      width 480rem
</style>