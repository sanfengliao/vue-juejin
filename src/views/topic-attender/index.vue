<template>
  <div class="topic-attender page-content">
    <header class="topic-attender-header">
      <s-header :go-back="goBackAndRemoveKeepAlive" title="参加人列表"/>
    </header>
    <section class="topic-section page-section">
      <scroll :options="options" :loading="loading" @load="load">
        <ul class="user-list">
          <li class="user-item border-bottom-1px" v-for="item in users" :key="item.objectId">
            <router-link :to="`/user/${item.objectId}`">

              <m-author :author="item" @toggleFollow="toggleFollow" />
            </router-link>
          </li>
        </ul>
      </scroll>
    </section>
  </div>
</template>

<script>
import SHeader from '../../components/s-header'
import { keepAliveMixin } from '../../mixins'
import { getTopicAttender } from '../../api/topic'
import { followUser, unFollowUser } from '../../api/user'
import Scroll from '../../components/scroll'
import MAuthor from '../../components/m-author'
export default {
  name: 'topic-attender',
  mixins: [keepAliveMixin],
  data() {
    return {
      users: [],
      loading: false,
      options: {
        bounce: {
          top: false
        }
      }
    }
  },
  components: {
    SHeader,
    Scroll,
    MAuthor
  },
  created() {
    this.init()
  },
  methods: {
    async toggleFollow(author) {
      let data = {}
      if (author.currentUserFollowed) {
        data = await unFollowUser(author.objectId)
      } else {
        data = await followUser(author.objectId)
      }
      if (data.s === 1) {
        author.currentUserFollowed = !author.currentUserFollowed
      }
    },
    async load() {
      this.loading = true
      await this.getTopicAttender()
      this.loading = false
    }, 
    init() {
      this.topicId = this.$route.params.id
      this.getTopicAttender()
    },
    async getTopicAttender() {
      let data = await getTopicAttender(this.topicId)
      for (let item of data.d.list) {
        this.users.push(item)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>