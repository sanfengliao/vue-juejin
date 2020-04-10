<template>
  <transition v-on="$listeners" :name="transitionName">
    <slot></slot>
  </transition>
</template>

<script>
import { ROUTE_INDEX } from '../../common/const'
let comIndex = 1
export default {
  props: {
    routeKey: String,
  },
  data() {
    return {
      transitionName: ''
    }
  },
  created() {
    
  },
  watch: {
    $route(to, from) {
      if (to.meta[ROUTE_INDEX] > from.meta[ROUTE_INDEX]) {
          this.transitionName = `slide-left`
      } else {
          this.transitionName = `slide-right`
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