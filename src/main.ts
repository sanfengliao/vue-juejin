import { createApp } from 'vue'
import router from './router'
import store, { GET_CATEGORY_LIST } from './store';
import App from './App.vue'

(async () => {
  const app = createApp(App)
  app.use(router)
  app.use(store);
  await Promise.all([
    store.dispatch(GET_CATEGORY_LIST),
  ])
  app.mount('#app')
})()
