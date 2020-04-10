<template>
  <div class="user-tag">
    <header class="user-tag-header">
      <s-header :go-back="goBackAndRemoveKeepAlive" title="关注标签"/>
    </header>
    <section class="user-tag-section">
      <scroll>
        <div class="content">
          <ul class="user-tag-list">
            <li class="user-tag-item border-bottom-1px" v-for="item in tags" :key="item.objectId">
              <router-link :to="`/tag/${item.id}`">

                <tag-item :tag="item"/>
              </router-link>
            </li>
          </ul>
        </div>
      </scroll>
    </section>
  </div>
</template>

<script>
import SHeader from '../../components/s-header'
import Scroll from '../../components/scroll'
import TagItem from '../../components/tag-item'
import { getUserSubscribeTag } from '../../api/user'
import { keepAliveMixin } from '../../mixins'
export default {
  mixins: [keepAliveMixin],
  data() {
    return {
      tags: []
    }
  },
  components: {
    SHeader,
    Scroll,
    TagItem
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let { id } = this.$route.params
      this.getUserSubscribeTag(id)
    },
    async getUserSubscribeTag(id) {
      let data = await getUserSubscribeTag(id)
      for (let item of data.d.tagList) {
        this.tags.push(item)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-tag
  display flex
  flex-direction column
  .user-tag-section
    flex 1
    height 0
</style>