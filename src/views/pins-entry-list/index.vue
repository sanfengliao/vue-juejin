<template>
  <div class="pin-entry-list">
    <scroll :on-pulling-up="loadMore" :on-pulling-down="refresh" :refreshing="refreshing">
      <div class="pins-con">
        <div v-if="recommendPins.length>0" class="recommend-pins-con">
          <swiper :options="swiperOptions">
            <swiper-slide v-for="item in recommendPins" :key="item.objectId">
              <router-link :to="`/pin/${item.objectId}`" class="pin-s-entry">
                <pin-s-entry :pin="item"></pin-s-entry>
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
        <div class="pin-entry-list-con">
          <ul class="pin-entry-list">
            <li class="pin-entry-item" v-for="item in pins" :key="item.id || item.objectId">
              <router-link :to="`/pin/${item.id || item.objectId}`">
                <pin-entry :pin="item"></pin-entry>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../components/scroll'
import PinEntry from '../../components/pin-entry'
import PinSEntry from '../../components/pin-s-entry'
import { getHotRecommendList, getTopicList, getPopularPinList, getRecommendedFeed } from '../../api/pins'
import { pinsRouteType } from '../../common/config'

export default {
  data() {
    return {
      recommendPins: [],
      pins: [],
      refreshing: false,
      swiperOptions: {
        slidesPerView: 1.1,
        centeredSlides: true,
        spaceBetween: 10,
        loop: true
      }
    }
  },
  components: {
    Scroll,
    PinEntry,
    PinSEntry
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
    async refresh() {
      this.hasNextPage = true
      this.after = ''
      this.page = 0
      this.refreshing = true
      await this.query(true)
      this.refreshing = false
    },
    loadMore() {
      this.query()
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
      console.log(this.pins)
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
@import "../../assets/css/variable.styl"
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
  padding-top 20rem

  margin-bottom 20rem
  background #fff

  

</style>