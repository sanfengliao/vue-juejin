<template>
  <div class="author-list">
    <scroll>
      <div class="author-list-con">
        <ul class="authors">
          <li class="author-item border-bottom-1px" v-for="item in authors" :key="item.id">
            <router-link :to="`/user/${item.id}`">
              <m-author @toggleFollow="toggleFollow" :author="item" />
            </router-link>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll'
import MAuthor from '@/components/m-author'
import { getRecommendedAuthorByChannel, followUser, unFollowUser } from '@/api/user'
export default {
  data() {
    return {
      authors: []
    }
  },
  components: {
    Scroll,
    MAuthor
  },
  created() {
    this.init()
  },
  methods: {
    async toggleFollow(author) {
      let data = {}
      if (author.viewerIsFollowing) {
        data = await unFollowUser(author.id)
      } else {
        data = await followUser(author.id)
      }
      if (data.s === 1) {
        author.viewerIsFollowing = !author.viewerIsFollowing
      }
    },
    init() {
     
      let { channel } = this.$route.params
      this.channel = channel
      this.refresh()
    },
    async refresh() {
       this.after = ''
       this.authors = await this.getRecommendedAuthorByChannel()
    },
    async getRecommendedAuthorByChannel() {
      let data = await getRecommendedAuthorByChannel(this.channel, this.after)
      let { edges, pageInfo } = data.data.articleAuthorRecommendationList.items
      this.after = pageInfo.endCursor
      return edges.map(item => {
        let { author, description } = item.node
        author.description = description
        return author
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.author-list
  height 100%
  .authors
    .author-item
      background #ffffff
      .description
        padding-left 120*$unit
        font-size 20*$unit
        color #909090
</style>