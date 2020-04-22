import RouterTransition from './index.vue'
export default {
  /**
   * 
   * @param {Vue} Vue 
   * @param {} options 
   */
  install(Vue, options) {
    let { routeIndex } = options
    Vue.prototype.$routeIndex = routeIndex
    Vue.component('router-transition', RouterTransition)
    
  },
}