<template>
  <div class="user-pin">
    <ul class="user-pin-list">
      <li class="pin-item" v-for="item in pins" :key="item.objectId">
        <router-link :to="`/pin/${item.objectId}`">
          <l-pin-entry :pin="item" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getUserPinList } from '@/api/user'
import LPinEntry from '@/components/l-pin-entry'
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
    console.log('cre')
    this.init()
  },
  methods: {
    init() {
      this.getUserPinList()
    },
    async getUserPinList(before) {
      let { id } = this.$route.params
      let data = await getUserPinList(id, before)
      for (let item of data.d.list) {
        this.pins.push(item)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.pin-item
  margin-bottom 20rem
</style>