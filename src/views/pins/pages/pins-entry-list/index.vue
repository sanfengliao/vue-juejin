<template>
  <div class="pin-entry-list">
    <scroll @load="loadMore" @refresh="refresh" :refreshing="refreshing" :loading="loading">
      <div class="pins-con">
        <div v-if="recommendPins.length>0" class="recommend-pins-con">
          <swiper :options="swiperOptions">
            <swiper-slide v-for="item in recommendPins" :key="item.objectId">
              <router-link :to="`/pin/${item.objectId}`" class="s-pin-entry">
                <s-pin-entry :pin="item"></s-pin-entry>
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
        <div class="pin-entry-list-con">
          <ul class="pin-entry-list">
            <li class="pin-entry-item" v-for="item in pins" :key="item.id || item.objectId">
              <router-link :to="`/pin/${item.id || item.objectId}`">
                <l-pin-entry @like="likePin" @toggleFollow="toggleFollow" :pin="item"></l-pin-entry>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll'
import LPinEntry from '@/components/l-pin-entry'
import SPinEntry from '@/components/s-pin-entry'
import { getHotRecommendList, getTopicList, getPopularPinList, getRecommendedFeed, likePin, unlikePin } from '@/api/pins'
import { pinsRouteType } from '@/common/config'
import { followUser,unFollowUser } from '@/api/user'

export default {
  data() {
    return {
      recommendPins: [],
      pins: [],
      refreshing: false,
      swiperOptions: {
        slidesPerView: 1.1,
        centeredSlides: true,
        spaceBetween: 10
      },
      loading: false
    }
  },
  components: {
    Scroll,
    LPinEntry,
    SPinEntry
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let { type } = this.$route.meta
      if (type === pinsRouteType.RECOMMENDED) {
        this.getHotRecommendList()
      }
      this.refresh()
    },
    async toggleFollow(author) {
      if (author.viewerIsFollowing) {
        let data = await unFollowUser(author.id)
        if (data.s === 1) {
          author.viewerIsFollowing = false
        }
      } else {
        let data = await followUser(author.id)
        if (data.s === 1) {
          author.viewerIsFollowing = true
        }
      }
    },
    async likePin(pin) {
      if (pin.viewerHasLiked) {
        let data = await unlikePin(pin.id)
        if (data.s === 1) {
          pin.viewerHasLiked = false
          pin.likeCount -= 1
        }
      } else {
        let data = await likePin(pin.id)
        if (data.s === 1) {
          pin.viewerHasLiked = true
          pin.likeCount += 1
        }
      }
    },
    async refresh() {
      this.hasNextPage = true
      this.after = ''
      this.page = 0
      this.refreshing = true
      await this.query(true)
      this.refreshing = false
    },
    async loadMore() {
      this.loading = true
      await this.query()
      this.loading = false
    },
    async query(isRefresh) {
      const { type } = this.$route.meta
      let data = []
      if (type === pinsRouteType.RECOMMENDED) {
        data = await this.getRecommendedFeed()
      } else if (type === pinsRouteType.HOT) {
        data = await this.getPopularPinList()
      } else if (type === pinsRouteType.TOPIC) {
        let { id } = this.$route.params
        data = await this.getTopicList(id)
      }
      if (isRefresh) {
        this.pins = []
      }
      for(let item of data) {
        this.pins.push(item)
      }
    },
    async getRecommendedFeed() {
      let data = await getRecommendedFeed(this.after)
      data = data.data.recommendedActivityFeed.items
      this.after = data.pageInfo.endCursor
      this.hasNextPage = data.pageInfo.hasNextPage
      return data.userActivities.map(item => item.userActivity.pins[0])
    },
    async getPopularPinList () {
      let data = await getPopularPinList(this.after)
      data = data.data.popularPinList.items
      this.hasNextPage = data.pageInfo.hasNextPage
      this.after = data.pageInfo.endCursor
      return data.edges.map(item => item.node)
    },
    async getTopicList(id) {
      let data = await getTopicList(id, this.page)
      this.page += 1
      return data.d.list
    },
    async getHotRecommendList() {
      let data = await getHotRecommendList()
      this.recommendPins = data.d.list
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../../assets/css/variable.styl"
.pin-entry-list
  height 100%

.pins-con
  padding-top 20rem
  .abc
    height 10000rem
    background red

.recommend-pins-con
  margin-bottom 20rem
  width 100%
.recommend-pin-list
  display inline-flex
  margin-left 20rem

  .recommend-pin-item
    flex 1
    margin-right 10rem
    width 665rem
    height 210rem
    background #fff

.pin-entry-item
  margin-bottom 20rem
  background #fff

  

</style>