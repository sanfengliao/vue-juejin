import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import './assets/css/normalize.css'
import './assets/css/common.css'
window.addEventListener('resize', () => {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 0.5 + 'px'
})
document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 0.5 + 'px'
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
