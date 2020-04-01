import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import routerTransition from './plugin/router-transition'
// import RouterTransition from './plugin/router-transition/index.vue'
import RouterTransition from './components/router-transition'

import './assets/css/normalize.css'
import './assets/css/common.css'
import { dateDis, levelImage } from './fliter'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
import 'swiper/css/swiper.css'
import './assets/css/article.styl'

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

Vue.use(routerTransition, {
  router
})

Vue.filter('dateDis', dateDis)
Vue.filter('levelImage', levelImage)

console.log(Vue.prototype.$routeWeight)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

