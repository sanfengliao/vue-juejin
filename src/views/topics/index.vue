<template>
  <div class="topics page-content">
    <header class="topics-header">
      <s-header :go-back="goBackAndRemoveKeepAlive" title="话题广场"></s-header>
    </header>
    <section class="page-section">
      <scroll @refresh="refresh" :refreshing="refreshing" @load="load" :loading="loading" :finished="finished" >
        <div class="topics-content">
          <div class="title border-bottom-1px">更多话题</div>
          <div class="topic-list-con">
            <ul class="topic-list">
              <li class="topic-item" v-for="item in topics" :key="item.objectId">
                <router-link :to="`/topic/${item.objectId}`">
                  <topic-item @follow="follow" :topic="item"/>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </section>
  </div>
</template>

<script>
import Scroll from '../../components/scroll'
import SHeader from '../../components/s-header'
import TopicItem from '../../components/topic-item'
import { getTopicList, followTopic} from '../../api/topic'
import { keepAliveMixin } from '../../mixins/index'
export default {
  name: 'topics',
  mixins: [keepAliveMixin],
  data() {
    return {
      topics: [],
      refreshing: false,
      loading: false,
      finished: false
    }
  },
  components: {
    SHeader,
    Scroll,
    TopicItem
  },
  created() {
    this.init()
  },
  methods: {
    follow(topic) {
      followTopic(topic.objectId)
    },
    init() {
      this.refresh()
    },
    async refresh() {
      this.finished = false
      this.page = 0
      this.refreshing = true
      this.topics = await this.getTopicList()
      this.refreshing = false
    },
    async load() {
      this.loading = true
      let list = await this.getTopicList()
      this.loading = false
      if (list.length == 0){
        this.finished = true
      }
      for (let item of list) {
        this.topics.push(item)
      }
    },
    async getTopicList() {
      let data = await getTopicList('new', this.page)
      if (data.s === 1) {
        this.page++
        return data.d.list
      } 
      return []
    }
  }
}
</script>

<style lang="stylus" scoped>
.topics-header
  margin-bottom 20*$unit
.topics-content
  .title
    padding 20*$unit
    color #000
    font-size 30*$unit
    background #fff
</style>