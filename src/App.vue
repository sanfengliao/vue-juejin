<template>
  <div id="app">
    <router-transition type="cover" direction="bottom-to-top" @before-enter="beforeEnter" @after-enter="afterEnter">
      <keep-alive :include="keepAliveArr">
        <router-view :key="routeKey" class="router"></router-view>
      </keep-alive>
    </router-transition>
   
  </div>
</template>

<script>
export default {
  created() {
    
  },
  computed: {
    routeKey() {
      if (this.$route.name === 'post') {
        return this.$route.path
      } else if (this.$route.name === 'pin') {
        return this.$route.path
      } else if (this.$route.name === 'book') {
        return this.$route.path
      } else if (this.$route.name === 'user') {
        return this.$route.path
      }
    },
    keepAliveArr() {
      return this.$store.state.keepAliveArr
    }
  },
  methods: {
    beforeEnter() {
      // this.$store.dispatch('setRouteTransition', false)
    },
    afterEnter() {
      // this.$store.dispatch('setRouteTransition', true)
    }
  }
}
</script>

<style lang="stylus">
@import "./assets/css/variable.styl"
#app
  width 100%
  height 100%
  background $gray-color
  overflow hidden
.router
  background  $gray-color
  height 100%
  width 100%
</style>