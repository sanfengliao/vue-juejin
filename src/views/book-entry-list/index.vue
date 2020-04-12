<template>
  <div class="book-entry-list-con">
    <scroll @refresh="refresh" :refreshing="refreshing" @load="loadMore" :loading="loading">
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
  </div>
</template>

<script>
import { getBooks, getMyBooks } from '../../api/book'
import Scroll from '../../components/scroll'
import BookEntry from '../../components/book-entry'
export default {
  data() {
    return {
      books: [],
      refreshing: false,
      loading: false
    }
  },
  created() {
    this.init()
    console.log(this.$options.name)
  },
  components: {
    BookEntry,
    Scroll
  },
  methods: {
    init() {
      this.page = 1
      this.query(true)
    },
    async refresh() {
      this.page = 1
      this.refreshing = true
      await this.query(true)
      this.refreshing = false
    },
    async loadMore() {
      this.loading = true
      this.page += 1
      await this.query()
      this.loading = false
    },
    async query(isRefresh) {
      let data = []
      if (this.$route.path==='/books/all') {
        data = await this.getBooks()
      } else {
        data = await this.getMyBooks()
      }
      if (isRefresh) {
        this.books = []
      }
      for(let item of data) {
        this.books.push(item)
      }
    },
    async getBooks() {
      let data = await getBooks(this.page)
      return data.d
    },
    async getMyBooks() {
      let data = await getMyBooks(this.page)
      data.d.forEach(item => item.isBuy = true)
      return data.d
    }, 
  }
}
</script>

<style lang="stylus" scoped>
.book-entry-list-con
  height 100%

</style>