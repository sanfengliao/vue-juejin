<template>
  <div class="read-history-con">
    <header class="read-history-header">
      <s-header :go-back="goBackAndRemoveKeepAlive" title="阅读过的文章"/>
    </header>
    <section class="read-history-section">
      <scroll :refreshing="refreshing" :loading="loading" @load="loadMore" @refresh="refresh" :finished="loadFinish">
        <div class="article-list-con">
          <ul class="article-list">
            <li class="article-item" v-for="item in articleList" :key="item.objectId">
              <router-link :to="`/post/${item.objectId}`">
                <s-article-entry :article="item" />
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
import Scroll from '../../components/scroll'
import SArticleEntry from '../../components/s-article-entry'
import { getEntryBySelf } from '../../api/user'
import { keepAliveMixin } from '../../mixins'
export default {
  mixins: [keepAliveMixin],
  name: 'read-history',
  data() {
    return {
      refreshing: false,
      loading: false,
      loadFinish: false,
      articleList: [],
    }
  },
  components: {
    Scroll,
    SHeader,
    SArticleEntry
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.refresh()
    },
    async refresh() {
      this.refreshing = true
      let data = await this.getEntryBySelf()
      this.articleList = []
      for (let item of data) {
        this.articleList.push(item)
      }
      this.refreshing = false
    },
    async loadMore() {
      this.loading = true
      let { articleList } = this
      let before = articleList[articleList.length - 1].createdAt
      let data = await this.getEntryBySelf(before)
      for (let item of data) {
        this.articleList.push(item)
      }
      this.loadFinish = data.length === 0
      this.loading = false
    },
    async getEntryBySelf(before) {
      let { uid } = this.$store.state
      let data = await getEntryBySelf(uid, 'view', before)
      return data.d.entrylist
    },
  }
}
</script>

<style lang="stylus" scoped>
.read-history-con
  display flex
  flex-direction column
.read-history-section
  flex 1
  height 0
</style>