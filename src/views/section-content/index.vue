<template>
  <div class="section-content-con">
    <div class="article-content" v-html="contentHtml">

    </div>
  </div>
</template>

<script>
import { getBookSectionDetail } from '../../api/book'
export default {
  data() {
    return {
      contentHtml: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      console.log(this.$options)
      let { sectionId } = this.$route.params
      let data = await getBookSectionDetail(sectionId)
      this.contentHtml = data.d.html
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>