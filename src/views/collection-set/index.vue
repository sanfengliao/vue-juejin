<template>
  <div class="collection-set-con">
    <header class="collection-set-header">
      <s-header :goBack="goBackAndRemoveKeepAlive" title="收藏集" />
    </header>
    <section class="collection-set-section">
      <tab @onItemClick="tabItemClick" :current-index="index" :tabs="['创建的', '关注的']" />
      <div class="collection-set-content">
        <swiper ref="swiper" class="swiper" :options="options()">
          <swiper-slide class="swiper-slide">
            <scroll :options="{bounce:{top: false}}">
              <div class="collection">
                <ul class="collection-list">
                  <li class="collection-item border-bottom-1px" v-for="item in createdCollections" :key="item.csId">
                    <router-link :to="`/collection/${item.csId}`">
                      <collection-item :collection="item" />
                    </router-link>
                  </li>
                </ul>
              </div>
            </scroll>
          </swiper-slide>
          <swiper-slide>
            <scroll :options="{bounce:{top: false}}">
              <div class="collection-list-con">
                <ul class="collection-list">
                  <li class="collection-item border-bottom-1px" v-for="item in followCollections" :key="item.csId">
                    <router-link :to="`/collection/${item.csId}`">
                     <collection-item :collection="item" />
                    </router-link>
                  </li>
                </ul>
              </div>
            </scroll>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </div>
</template>

<script>
import SHeader from '../../components/s-header'
import Tab from '../../components/tab'
import Scroll from '../../components/scroll'
import CollectionItem from '../../components/collection-item'
import { getUserCollectionSet, getFollowedCollectionSet } from '../../api/collection'
import { getMultiUser } from '../../api/user'
import { keepAliveMixin } from '../../mixins'
export default {
  mixins: [keepAliveMixin],
  name: 'collection-set',
  data() {
    return {
      index: 0,
      createdCollections:[],
      followCollections:[]
    }
  },
  components: {
    SHeader,
    Tab,
    Scroll,
    CollectionItem
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let { id } = this.$route.params
      this.getUserCollectionSet(id)
      this.getFollowedCollectionSet(id)
    },
    async getUserCollectionSet(id) {
      let data = await getUserCollectionSet(id)
      let { collectionSets } = data.d
      let ids = collectionSets.map(item => item.creator).join('|')
      let users = await this.getMultiUser(ids)
      for (let item of collectionSets) {
        item.user = users[item.creator]
        this.createdCollections.push(item)
      }
    },
    async getFollowedCollectionSet(id) {
      let data = await getFollowedCollectionSet(id)
      let { collectionSets } = data.d
      let ids = collectionSets.map(item => item.creator).join('|')
      let users = await this.getMultiUser(ids)

      for (let item of collectionSets) {
        item.user = users[item.creator]
        this.followCollections.push(item)
      }
    },
    async getMultiUser(ids) {
      let data = await getMultiUser(ids)
      return data.d
    },
    tabItemClick(item, index) {
      this.$refs['swiper'].$swiper.slideTo(index)
    },
    options() {
      const vm = this
      return {
        on: {
          slideChange: function() {
            vm.index = this.activeIndex
          }
        }
      }
    },  
  }
}
</script>

<style lang="stylus" scoped>
.collection-set-con
  display flex
  flex-direction column
  .collection-set-section
    flex 1
    height 0
    display flex
    flex-direction column
    .collection-set-content
      flex 1
      height 0
      .swiper, .swiper-slide
        height 100%

</style>