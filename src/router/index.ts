import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/main/index.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    name: 'main',
    path: '/',
    component: Main
  }]
})

export default router;