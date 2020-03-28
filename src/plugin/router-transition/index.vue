<template>
  <transition v-on="$listeners" :name="transitionName">
    <slot></slot>
  </transition>
</template>

<script>
import { ROUTE_WEIGHT } from './index'
export default {
  props: {
    prefix: String
  },
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  created() {
  },
  watch: {
    $route(to, from) {
      let toPath = to.path
      let fromPath = from.path
      if (toPath.startsWith(this.prefix) && fromPath.startsWith(this.prefix) || !this.prefix) {
        let routeWeight = this.$routeWeight
        let toWeight, fromWeight
        if (routeWeight[toPath]) {
          toWeight = routeWeight[toPath][ROUTE_WEIGHT]
        } else {
          for (let item of to.matched)
          if (routeWeight[item.path]) {
            toWeight = routeWeight[item.path][ROUTE_WEIGHT]
          }
        }

        if (routeWeight[fromPath]) {
          fromWeight = routeWeight[fromPath][ROUTE_WEIGHT]
        } else {
          for (let item of from.matched){
            if (routeWeight[item.path]) {
              fromWeight = routeWeight[item.path][ROUTE_WEIGHT]
            }
          }
        }
        if (this.$router.isBack) {
          this.transitionName = "slide-right"
          this.$router.isBack = false
        }
        else if (toWeight >= fromWeight  && !this.$route.meta.isGoBack) {
          this.transitionName = "slide-left"
        } else {
          this.transitionName = "slide-right"
        }
      } else {
        this.transitionName = 'default'
      }
    }
  }
}
</script>

<style lang="css" scoped>
/* .slide-left-enter, .slide-right-leave-active {
  -webkit-transform: translateY(100%);
  transform: translateY(100%,);
  transition: all .5s;
}
 
.slide-left-leave-active, .slide-right-enter {
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
  transition: all .5s;
} */

/* .slide-left-leave-active {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}


.slide-left-enter {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-enter-active {
  transform: translate(0, 0);
} */

.slide-left-enter, .slide-right-leave-active {
   -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
  
}
 
.slide-left-leave-active, .slide-right-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

</style>