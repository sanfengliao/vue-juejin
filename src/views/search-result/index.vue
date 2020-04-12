<template>
  <div class="search-result">
    <scroll :options="{bounce: {top: false}}">
      <div class="result">
        <ul class="result-list">
          <li class="result-item border-bottom-1px" v-for="(item, index) in result" :key="index">
            <router-link v-if="item.type === 'ArticleSearchResultItem'" :to="`/post/${item.entry.id}`">
              <s-article-entry :article="item.entry"/>
            </router-link>
            <router-link v-if="item.type === 'UserSearchResultItem'" :to="`/user/${item.user.id}`">
              <m-author :author="item.user" />
            </router-link>
            <router-link v-if="item.type === 'TagSearchResultItem'" :to="`/tag/${item.tag.id}`">
              <tag-item :tag="item.tag" />
            </router-link>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../components/scroll'
import TagItem from '../../components/tag-item'
import MAuthor from '../../components/m-author'
import SArticleEntry from '../../components/s-article-entry'
import { search } from '../../api/search'
export default {
  components: {
    Scroll,
    MAuthor,
    SArticleEntry,
    TagItem
  },
  data() {
    return {
      result: []
    }
  },
  computed: {
    query() {
      return this.$store.state.query
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let { type } = this.$route.params
      this.type = type
      this.refresh()
    },
    async refresh() {
      this.after = ''
      this.result = await this.getSearchResult()
      
    },
    async getSearchResult() {
      let data = await search(this.query, this.type, this.after)
      let {edges, pageInfo } = data.data.result
      this.after = pageInfo.endCursor
      return edges.map(item => item.node)
    }
  },
  watch: {
    query() {
      this.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>