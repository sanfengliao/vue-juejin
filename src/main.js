import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import routerTransition from './plugin/router-transition'
// import RouterTransition from './plugin/router-transition/index.vue'
// import RouterTransition from './components/router-transition'
import Message from './components/message'

import './assets/css/normalize.styl'
import './assets/css/common.styl'
import { dateDis, levelImage } from './fliter'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
import 'swiper/css/swiper.css'
import './assets/css/article.styl'

// function resize() {
//   let clientWidth = document.documentElement.clientWidth
//   let fontSize = 16 * clientWidth / 375
//   document.documentElement.style.fontSize = fontSize + 'px'
// }

console.log(navigator.userAgent)


Vue.use(VueAwesomeSwiper)
Vue.use(Message)
Vue.config.productionTip = false

Vue.use(routerTransition, {
  router
})

Vue.filter('dateDis', dateDis)
Vue.filter('levelImage', levelImage)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

