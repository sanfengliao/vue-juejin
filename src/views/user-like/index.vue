<template>
  <div class="user-like">
    <header class="user-like-header">
      <s-header :go-back="goBackAndRemoveKeepAlive" title="点赞的文章"/>
    </header>
    <section class="user-like-section">
      <scroll :options="{bounce: {top: false}}">
        <div class="content">
          <ul class="user-like-article-list">
            <li class="user-like-article-item border-bottom-1px" v-for="item in articles" :key="item.objectId">
              <router-link :to="`/post/${item.objectId}`">

                <s-article-entry :article="item"/>
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
import { getUserLikeArticles } from '../../api/user'
import { keepAliveMixin } from '../../mixins'
export default {
  mixins: [keepAliveMixin],
  name: 'user-like',
  data() {
    return {
      articles: []
    }
  },
  components: {
    SHeader,
    Scroll,
    SArticleEntry
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let { id } = this.$route.params
      this.getUserLikeArticles(id)
    },
    async getUserLikeArticles(id) {
      let data = await getUserLikeArticles(id)
      for (let item of data.d.entryList) {
        this.articles.push(item)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-like
  display flex
  flex-direction column
  .user-like-section
    flex 1
    height 0
</style>