<template>
  <div id="app">
    <router-transition name="slide" @before-enter="beforeEnter" @after-enter="afterEnter">
      <keep-alive :include="['layout']">
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
      }
    }
  },
  methods: {
    beforeEnter() {
      this.$store.dispatch('setRouteTransition', false)
    },
    afterEnter() {
      this.$store.dispatch('setRouteTransition', true)
    }
  }
}
</script>

<style lang="stylus">
@import "./assets/css/variable.styl"
html,body,#app
  width 100%
  height 100%
  background $gray-color
  overflow hidden
#app
  position relative
.router {
  left 0
  right 0
  top 0
  bottom 0
  position absolute
  transition: all .5s;
}

</style>