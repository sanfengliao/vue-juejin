<template>
  <div @scroll="scroll" class="book-section-con">
    <header class="book-section-header border-bottom-1px" :style="{transform: `translateY(${scrollToBottom ? '-100%': '0'})`}">
      <d-header :title="sectionTitles[currentSectionIndex] || '掘金'"></d-header>
    </header>
    <transition name="cata-slide">
      <aside v-show="showCataLog" v-if="book" class="book-section-aside">
        <div @click="closeBar" class="mask"></div>
        <div class="book-catalog-con">
          <div class="book-info border-bottom-1px">
            <div class="book-img" :style="{backgroundImage: `url(${book.img})`}"></div>
            <div class="book-desc">
              <div class="book-title">
                {{book.title}}
              </div>
              <div class="book-author">
                <span class="author-name">{{book.userData.username}}</span>
                <img class="author-level" v-if="book.userData.level" :src="book.userData.level | levelImage" alt="">
              </div>
            </div>
          </div>
          <div class="book-section-list-con">
            <ul class="book-section-list">
              <li @click="sectionClick" class="book-section-item border-bottom-1px" v-for="(item, index) in sections" :key="item._id">
                <router-link :to="`/book/m/${bookId || item.metaId}/section/${item._id}`">
                  <b-section :section="item" :index="index"></b-section>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </transition>
    <section class="book-section-content con">
      <keep-alive>
        <router-view :key="routeKey"></router-view>
      </keep-alive>
      <div class="need-to-buy-content">

      </div>
    </section>
    
    <footer class="book-section-footer border-top-1px" :style="{transform: `translateY(${scrollToBottom ? '100%': '0'})`}">
      <div v-if="book" class="button-buy">
        ￥{{book.price}}
      </div>
      <div class="footer-content">
        <div class="iconfont-con">
          <i v-if="currentSectionIndex <= 0" class="iconfont icon-fanhui1 disable"></i>
          <i @click="lastSection" v-else class="iconfont icon-fanhui1"></i>
        </div>
        <div class="iconfont-con"><i class="iconfont icon-mulu" @click="showBar"></i></div>
        <div class="iconfont-con">
          <i class="iconfont icon-pinglun1">
            <!-- <span class="count">{{18}}</span> -->
          </i>
        </div>
        <div class="iconfont-con">
          <i @click="nextSection" v-if="currentSectionIndex !== sectionIds.length - 1" class="iconfont icon-qianjin"></i>
          <i v-else class="iconfont icon-qianjin disable"></i>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { getBookDetail, getBookSections, getBooks } from '../../api/book'
import { throttle } from '../../util'
import DHeader from '../../components/d-header'
import BSection from '../../components/b-section'
export default {
  name: 'section-read',
  data() {
    return {
      sectionIds: [],
      sectionId: '',
      currentSectionIndex: '',
      sections: [],
      sectionTitles: [],
      book:null,
      scrollToBottom: false,
      showCataLog: false
    }
  },
  computed: {
    routeKey() {
      if (this.$route.path.startsWith('/book/m/')) {
        return this.$route.path
      }
    },
    routeShow() {
      return this.$route.path.startsWith('/book/m/')
    }
  },
  components: {
    DHeader,
    BSection
  },
  created() {
    this.init()
  },
  methods: {
    lastSection() {
      if (this.currentSectionIndex > 0) {
        this.currentSectionIndex--
        let sectionId = this.sectionIds[this.currentSectionIndex]
        this.$router.push(`/book/m/${this.bookId}/section/${sectionId}`)
      }
    },
    nextSection() {
      if (this.currentSectionIndex < this.sectionIds.length - 1) {
        this.currentSectionIndex++
        let sectionId = this.sectionIds[this.currentSectionIndex]
        this.$router.push(`/book/m/${this.bookId}/section/${sectionId}`)
      }
    },
    scroll(e) {
      throttle(() => {
        let { scrollTop } = e.target
        if (scrollTop > this.scrollTop) {
          this.scrollToBottom = true
        } else {
          this.scrollToBottom = false
        }
        this.scrollTop = scrollTop
      })()
    },
    showBar() {
      this.showCataLog = true
    },
    closeBar() {
      this.showCataLog = false
    },
    sectionClick() {
      this.closeBar()
    },
    async init() {
      let { bookId, sectionId } = this.$route.params
      this.bookId = bookId

      await Promise.all([this.getBookDetail(bookId),this.getBookSections(bookId)])

      if (this.book.isBuy) {
        this.sectionIds = this.book.section
        for (let item of this.sections) {
          this.sectionTitles.push(item.title)
        }
      } else {
        for (let item of this.sections) {
          if (item.isFree) {
            this.sectionIds.push(item._id)
            this.sectionTitles.push(item.title)
          }
        }
        this.scrollTop = 0
      }
      this.sectionIndex = {}
      this.sectionIds.forEach((item, index) => {
        this.sectionIndex[item] = index
      })
      this.currentSectionIndex = this.sectionIndex[sectionId]
    },
    async getBookDetail(bookId) {
      let data = await getBookDetail(bookId)
      this.book = data.d
    },
    async getBookSections(bookId) {
      let data = await getBookSections(bookId)
      for (let item of data.d) {
        this.sections.push(item)
      }
    }
  },
  watch: {
    $route() {
      let { sectionId } = this.$route.params
      if (sectionId in this.sectionIndex) {
        this.currentSectionIndex = this.sectionIndex[sectionId]
      } else {
        this.currentSectionIndex = -1
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.book-section-con
  background #fff
  overflow scroll
  &::-webkit-scrollbar
    width 0
    height 0
.book-section-header
  position fixed
  width 100%
  height 115rem
  z-index 10
  transition transform .4s
.book-section-aside
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 20
  transition .5s
  &.cata-slide-leave-to, &.cata-slide-enter
    .book-catalog-con
      transform translateX(-100%)
    .mask
      opacity 0
  .mask
    position absolute
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.5)
    z-index -1
    transition all .5s
  .book-catalog-con
    display flex
    flex-direction column
    width 630rem
    height 100%
    background #fff
    transition all .5s
    .book-info
      display flex
      flex 0 0 265rem
      padding 20rem
      .book-img
        margin-right 20rem
        width 125rem
        height 175rem
        background-size cover
        background-position 50%
        background-repeat no-repeat
      .book-desc
        .book-title
          font-size 30rem
          font-weight 600
          margin-bottom 20rem
        .book-author
          display flex
          align-items center
          height 30rem
          font-size 28rem
          .author-level
            height 23rem
    .book-section-list-con
      flex 1
      overflow scroll
      &::-webkit-scrollbar
        width 0
        height 0
.book-section-content
  margin-top 115rem
  padding-bottom 110rem
  background #fff
.button-buy
  display flex
  cursor pointer
  position fixed
  bottom 110rem
  left 50%
  transform translateX(-50%)
  z-index 10
  justify-content center
  align-items center
  font-size 28rem
  background-color #007fff
  color #fff
  user-select none
  box-shadow 0 8rem 20rem rgba(0,0,0,.15)
  width 340rem
  height 80rem
  border-radius 80rem
  margin-bottom env(safe-area-inset-bottom)
.book-section-footer
  position fixed
  bottom 0
  width 100%
  height 85rem
  background #fff
  transition transform .4s
  .footer-content
    display flex
    justify-content space-between
    align-items center
    height 100%
    font-size 40rem
    color #909090
    .iconfont-con
      flex 1
      display flex
      justify-content center
      align-items center
      height 100%
      text-align center
      border-radius 35rem
    .iconfont.disable
      color #ddd
  .icon-pinglun1
    position relative
    .count
      position absolute
      top -5rem
      margin-left 5rem
      font-size 20rem
</style>