import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/main/index.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    name: 'main',
    path: '/',
    component: Main,
    children: [
      {
        path: '/recommended',
        component: () => import('../pages/recommended/index.vue')
      }
    ]
  }]
})

export default router;