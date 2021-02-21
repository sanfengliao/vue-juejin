<template>
  <div class="main">
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Footer from './components/footer/index.vue'

export default defineComponent({
  components: {
    Footer,
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang="less">
</style>