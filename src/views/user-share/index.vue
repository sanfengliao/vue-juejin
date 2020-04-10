<template>
  <div class="user-post">
    <ul class="user-post-list">
      <li class="post-item border-bottom-1px" v-for="item in articles" :key="item.objectId">
        <router-link :to="`/post/${item.objectId}`">
          <s-article-entry :article="item" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getEntryBySelf } from '../../api/user'
import SArticleEntry from '../../components/s-article-entry'
export default {
  data() {
   return {
     articles: []
   }
  },
  components: {
    SArticleEntry
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getEntryBySelf()
    },
    async getEntryBySelf(before) {
      let { id } = this.$route.params
      let data = await getEntryBySelf(id, 'article', before)
      for (let item of data.d.entrylist) {
        this.articles.push(item)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>