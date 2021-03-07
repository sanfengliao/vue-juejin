<template>
  <div class="main">
    <div class="main-section">
      <router-view></router-view>
    </div>
    <div class="main-footer">
      <Footer />
    </div>
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
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: @gray-bg-color;
  &-section {
    flex: 1;
  }
  &-footer {
    flex-shrink: 0;
    flex-grow: 0;
  }
}
</style>