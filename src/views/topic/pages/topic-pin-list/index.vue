<template>
  <div class="topic-pin-list">
    <ul class="pin-list">
      <li class="pin-item" v-for="item in pins" :key="item.objectId">
        <l-pin-entry :pin="item"/>
      </li>
    </ul>
  </div>
</template>

<script>
import LPinEntry  from '@/components/l-pin-entry'
import { getTopicPinList } from '@/api/topic'
export default {
  data() {
    return {
      pins: []
    }
  },
  components: {
    LPinEntry
  },
  created() {
    this.init()
  },
  methods: {
    async load() {
      await this.getTopicPinList()
    },
    init() {
      let { id, type } = this.$route.params
      this.id = id
      this.type = type
      this.page = 0
      this.getTopicPinList()
    },
    async getTopicPinList() {
      let data = await getTopicPinList(this.id, this.type, this.page)
      for (let item of data.d.list) {
        this.pins.push(item)
      }
      this.page += 1
    }
  }
}
</script>

<style lang="stylus" scoped>
.topic-pin-list
  .pin-list
    .pin-item
      margin-bottom 20rem
</style>