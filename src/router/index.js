import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../layout'

import Home from '../views/home'
import Me from '../views/me'
import Pins from '../views/pins'
import Search from '../views/search'
import Books from '../views/books'
import Post from '../views/post'
import Pin from '../views/pin'
import SpecialShowEdit from '../views/special-show-edit'
import BookEntryList from '../views/book-entry-list'
import Book from '../views/book'
import BookSection from '../views/book-section'
import SectionContent from '../views/section-content'

import { ROUTE_WEIGHT } from '../common/const'

import { homeRoutes } from './home'
import { pinsRoutes } from './pins'

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
  },{
    name: 'pin',
    path: '/pin/:id',
    component: Pin,
    meta: {
      [ROUTE_WEIGHT]: 140
    }
  },{
    name: 'book-section',
    path: '/book/m/:bookId/section',
    component: BookSection,
    children: [{
      name: 'book-section',
      path: ':sectionId',
      component: SectionContent
    }],
    meta: {
      [ROUTE_WEIGHT]: 160
    }
  },{
    name: 'book',
    path: '/book/:id',
    component: Book,
    meta: {
      [ROUTE_WEIGHT]: 150,
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
      name: 'pins',
      path: '/pins',
      component: Pins,
      children: pinsRoutes
    },{
      name: 'search',
      path: '/search',
      component: Search,
    }, {
      name: 'books',
      path: '/books',
      component: Books,
      redirect: '/books/all',
      children: [{
        path: '/books/all',
        component: BookEntryList
      }, {
        path: '/books/my',
        component: BookEntryList
      }]
    }, {
      name: 'user',
      path: '/me',
      component: Me,
    }, ]
  }]
})

export default router;
