<template>
  <div class="my-purchased-book-con">
    <header class="my-purchased-book-header">
      <s-header :go-back="goBackAndRemoveKeepAlive" title="已购小册" />
    </header>
    <section class="my-purchased-book-section">
      <scroll >
        <div class="book-entry-list">
          <ul class="book-list">
            <li class="book-item border-bottom-1px" v-for="item in books" :key="item.id">
              <router-link :to="`/book/${item.id}`">
                <book-entry :book="item"></book-entry>
              </router-link>
            </li>
          </ul>
        </div>
      </scroll>
    </section>
  </div>
</template>

<script>
import SHeader from '../../components/s-header'
import { getMyBooks } from '../../api/book'
import Scroll from '../../components/scroll'
import BookEntry from '../../components/book-entry'
import { keepAliveMixin } from '../../mixins'
export default {
  mixins:[keepAliveMixin],
  name: 'my-purchased-book',
  components: {
    SHeader,
    Scroll,
    BookEntry
  },
  data() {
    return {
      books: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getMyBooks()
    },
    async getMyBooks() {
      let data = await getMyBooks(this.page)
      for (let item of data.d) {
        item.isBuy = true
        this.books.push(item)
      }
    }, 
  }
}
</script>

<style lang="stylus" scoped>
.my-purchased-book-con
  display flex
  flex-direction column
  .my-purchased-book-section
    flex 1
    height 0
</style>