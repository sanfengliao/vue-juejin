import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/main/index.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    name: 'main',
    path: '/',
    component: Main,
    redirect: '/recommended',
    children: [
      {
        path: '/recommended',
        component: () => import('../pages/main/pages/recommended/index.vue')
      }
    ]
  }]
})

export default router;