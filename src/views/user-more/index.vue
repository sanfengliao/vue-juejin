<template>
  <div class="user-more">
    <router-link :to="`/user/${id}/likes`">
      <div class="user-item border-bottom-1px">
        <span>赞过的文章</span>
        <span class="number">{{collectedEntriesCount}}</span>
      </div>
    </router-link>
    <router-link :to="`/user/${id}/tags`">

      <div class="user-item border-bottom-1px">
        <span>关注的标签</span>
        <span class="number">{{subscribedTagsCount}}</span>
      </div>
    </router-link>
    <router-link :to="`/user/${id}/collections`">
      <div class="user-item border-bottom-1px">
        <span>收藏集</span>
        <span class="number">{{collectionSetCount}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectedEntriesCount: 0,
      collectionSetCount: 0,
      subscribedTagsCount: 0,
      id: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let { collectedEntriesCount,collectionSetCount,subscribedTagsCount } = this.$route.params
      let { id } = this.$route.params
      this.collectedEntriesCount = collectedEntriesCount
      this.collectionSetCount = collectionSetCount
      this.subscribedTagsCount = subscribedTagsCount
      this.id = id
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-more
  padding-top 20rem
  .user-item 
    padding 20rem 30rem
    display flex
    justify-content space-between
    font-size 30rem
    background #fff
    .number
      color #909090
</style>