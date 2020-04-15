<template>
  <div class="user-post">
    <ul class="user-post-list">
      <li class="post-item" v-for="item in articles" :key="item.objectId">
        <router-link :to="`/post/${item.objectId}`">

          <m-article-entry :article="item" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getEntryBySelf } from '@/api/user'
import MArticleEntry from '@/components/m-article-entry'
export default {
  data() {
   return {
     articles: []
   }
  },
  components: {
    MArticleEntry
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
      let data = await getEntryBySelf(id, 'post', before)
      for (let item of data.d.entrylist) {
        this.articles.push(item)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.post-item
  margin-bottom 20rem
</style>