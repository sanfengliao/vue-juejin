import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home'
import User from '../views/user'
import Pin from '../views/pin'
import Search from '../views/search'
import Book from '../views/book'


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
      path: '/home',
      component: Home,
    }, {
      path: '/user',
      component: User,
    }, {
      path: '/search',
      component: Search,
    }, {
      path: '/books',
      component: Book,
    }, {
      path: '/pin',
      component: Pin
    }
  ]
})

export default router;
