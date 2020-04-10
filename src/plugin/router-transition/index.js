import RouterTransition from './index.vue'
let routeW  = 1
export const ROUTE_INDEX = '$$RouteIndex$$'
export default {
  /**
   * 
   * @param {Vue} Vue 
   * @param {{router: Object, routeWeight?: Object}} options 
   */
  install(Vue, options) {
    if (!options.router) {
      console.warn('router must be provided')
      return 
    }
    Vue.component('router-transition', RouterTransition)
    Vue.prototype.$isGoBack = false
    let routes = options.router.options.routes
    let routeWeight = options.routeWeight || {}
    let $routeWeight = Vue.prototype.$routeWeight = {}
    this.attachWeightToRoute(routes, routeWeight, $routeWeight)
  },
  attachWeightToRoute(routes, routeWeight, $routeWeight) {
    for (let route of routes) {
      let path = route.path
      $routeWeight[path] = {
        [ROUTE_INDEX]: routeW++
      }
      if (typeof route.meta === 'object' && typeof route.meta[ROUTE_INDEX] === 'number') {
        $routeWeight[path][ROUTE_INDEX] = route.meta[ROUTE_INDEX]
      }
      if (typeof routeWeight[path] === 'number') {
        $routeWeight[path][ROUTE_INDEX] = routeWeight[ROUTE_INDEX]
      }
      if (Array.isArray(route.children) && route.children.length > 0) {
        this.attachWeightToRoute(route.children, routeWeight, $routeWeight)
      }
    }
  }
}