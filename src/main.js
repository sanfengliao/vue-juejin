import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import routerTransition from './plugin/router-transition'
// import RouterTransition from './plugin/router-transition/index.vue'
import RouterTransition from './components/router-transition'

import './assets/css/normalize.css'
import './assets/css/common.css'
window.addEventListener('resize', () => {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 0.5 + 'px'
})
document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 0.5 + 'px'
Vue.config.productionTip = false

Vue.use(routerTransition, {
  router
})

console.log(Vue.prototype.$routeWeight)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

