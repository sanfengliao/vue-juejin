<template>
    <div class="wrapper">
      <transition v-on="$listeners" :name="transitionName">
        <slot></slot>
      </transition>
    </div>
</template>

<script>
import { ROUTE_INDEX } from './index'
import { transitionType, directionType } from './constant'
export default {
  props: {
    prefix: String,
    type: {
      type: String,
      default: transitionType.PUSH
    },
    direction: {
      type: String,
      default: directionType.RIGHT_TO_LEFT
    }
  },
  data() {
    return {
      transitionName: 'default'
    }
  },
  created() {
    this.pathStack = []
  },
  methods: {
    pushResolve(to, from) {
      let toPath = to.path
      let fromPath = from.path
      if (toPath.startsWith(this.prefix) && fromPath.startsWith(this.prefix) || !this.prefix) {
        let routeWeight = this.$routeWeight
        let toWeight, fromWeight
        if (routeWeight[toPath]) {
          toWeight = routeWeight[toPath][ROUTE_INDEX]
        } else {
          for (let item of to.matched)
          if (routeWeight[item.path]) {
            toWeight = routeWeight[item.path][ROUTE_INDEX]
          }
        }

        if (routeWeight[fromPath]) {
          fromWeight = routeWeight[fromPath][ROUTE_INDEX]
        } else {
          for (let item of from.matched){
            if (routeWeight[item.path]) {
              fromWeight = routeWeight[item.path][ROUTE_INDEX]
            }
          }
        }
        let { type, direction } = this
        if (toWeight >= fromWeight) {
          this.transitionName = `${type}-${direction}-slide-push`
        } else {
          this.transitionName = `${type}-${direction}-slide-back`
        }
      }
    },
    coverResolve(to, from) {
      let toPath = to.path
      let fromPath = from.path
      let { type, direction, pathStack } = this
      let lastPath = pathStack[pathStack.length - 1]
      if (lastPath && lastPath === toPath) {
        // back
        this.transitionName = `${type}-${direction}-slide-back`
        pathStack.pop()
      } else {
        // push
        this.transitionName = `${type}-${direction}-slide-push`
        pathStack.push(fromPath)
      }
    }
  },
  watch: {
    $route(to, from) {
      let { type } = this
      if (type === transitionType.PUSH) {
        this.pushResolve(to, from)
      } else if (type === transitionType.COVER) {
        this.coverResolve(to, from)
      }
      // console.log(this.$router)
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

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: inherit;
}

.wrapper > * {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: all .5s;
  /* background: inherit; */
}

.push-right-to-left-slide-push-enter, .push-right-to-left-slide-back-leave-to {
   -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0); 
}
 
.push-right-to-left-slide-push-leave-to, .push-right-to-left-slide-back-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}



.push-left-to-right-slide-push-enter, .push-left-to-right-slide-back-leave-to {
   -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0); 
}
 
.push-left-to-right-slide-push-leave-to, .push-left-to-right-slide-back-enter {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.push-top-to-bottom-slide-push-enter, .push-top-to-bottom-slide-back-leave-to {
   -webkit-transform: translateY(-100%);
  transform: translateY(-100%); 
}
 
.push-top-to-bottom-slide-push-leave-to, .push-top-to-bottom-slide-back-enter {
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
}

.push-bottom-to-top-slide-push-enter, .push-bottom-to-top-slide-back-leave-to {
   -webkit-transform: translateY(100%);
  transform: translateY(100%); 
}
 
.push-bottom-to-top-slide-push-leave-to, .push-bottom-to-top-slide-back-enter {
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
}



.cover-right-to-left-slide-push-enter-active, .cover-right-to-left-slide-back-leave-active,
.cover-left-to-right-slide-push-enter-active, .cover-left-to-right-slide-back-leave-active,
.cover-top-to-bottom-slide-push-enter-active, .cover-top-to-bottom-slide-back-leave-active,
.cover-bottom-to-top-slide-push-enter-active, .cover-bottom-to-top-slide-back-leave-active {
  z-index: 10000;
}

.cover-right-to-left-slide-push-enter {
   -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0); 
}
 
.cover-right-to-left-slide-back-leave-to {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.cover-left-to-right-slide-push-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0); 
}
 
.cover-left-to-right-slide-back-leave-to {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

.cover-top-to-bottom-slide-push-enter {
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%); 
}
 
.cover-top-to-bottom-slide-back-leave-to {
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
}

.cover-bottom-to-top-slide-push-enter {
  -webkit-transform: translateY(100%);
  transform: translateY(100%); 
}
 
.cover-bottom-to-top-slide-back-leave-to {
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
}

</style>