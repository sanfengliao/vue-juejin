import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home'
import User from '../views/user'
import Pin from '../views/pin'
import Search from '../views/search'
import Book from '../views/book'


import { homeRoutes } from './home'

Vue.use(VueRouter)

// const routes = [
 
// ]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/home',
  },{
    name: 'home',
    path: '/home',
    component: Home,
    redirect: '/home/recommended',
    children: homeRoutes
  }, {
    name: 'user',
    path: '/user',
    component: User,
  }, {
    name: 'search',
    path: '/search',
    component: Search,
  }, {
    name: 'books',
    path: '/books',
    component: Book,
  }, {
    name: 'pin',
    path: '/pin',
    component: Pin
  }]
})

export default router;
