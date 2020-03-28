import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../layout'

import Home from '../views/home'
import User from '../views/user'
import Pin from '../views/pin'
import Search from '../views/search'
import Book from '../views/book'
import Post from '../views/post'
import SpecialShowEdit from '../views/special-show-edit'

import { ROUTE_WEIGHT } from '../common/const'

import { homeRoutes } from './home'

VueRouter.prototype.goBack = function() {
  this.isBack = true
  this.go(-1)
}

Vue.use(VueRouter)


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
    name: 'specialShowEdit',
    path: '/specialShowEdit',
    component: SpecialShowEdit,
    meta: {
      [ROUTE_WEIGHT]: 120,
      isFirstLevel: true
    },
  }, {
    name: 'post',
    path: '/post/:id',
    component: Post,
    meta: {
      [ROUTE_WEIGHT]: 130,
      isFirstLevel: true
    }
  },
  
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      isFirstLevel: true
    },
    children: [{
      name: 'home',
      path: '/home',
      component: Home,
      children: homeRoutes,
    }, {
      name: 'pin',
      path: '/pin',
      component: Pin,
    },{
      name: 'search',
      path: '/search',
      component: Search,
    }, {
      name: 'books',
      path: '/books',
      component: Book,
    }, {
      name: 'user',
      path: '/user',
      component: User,
    }, ]
  }]
})

export default router;
