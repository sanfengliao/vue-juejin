import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Layout from '../layout'

import Home from '../views/home'
import Me from '../views/me'
import Pins from '../views/pins'
import Sousou from '../views/sousou'
import Books from '../views/books'
import Post from '../views/post'
import Pin from '../views/pin'
import Login from '../views/login'
import SpecialShowEdit from '../views/special-show-edit'
import BookEntryList from '../views/book-entry-list'
import Book from '../views/book'
import SectionRead from '../views/section-read'
import SectionContent from '../views/section-content'
import Setting from '../views/setting'
import About from '../views/about'
import Feedback from '../views/feedback'
import SetPsd from '../views/set-psd'
import ReadHistory from '../views/read-history'
import TagManage from '../views/tag-manage'
import MyLike from '../views/my-like'
import MyPurchasedBook from '../views/my-purchased-book'
import CollectionSet from '../views/collection-set'

import User from '../views/user'
import UserLike from '../views/user-like'
import UserTag from '../views/user-tag'


import Collection from '../views/collection'
import Search from '../views/search'
import SearchResult from '../views/search-result'
import RecommendationAuthor from '../views/recommendation-author'
import AuthorList from '../views/author-list'
import Topic from '../views/topic'
import TopicAttender from '../views/topic-attender'

import { ROUTE_INDEX } from '../common/const'

import { homeRoutes } from './home'
import { pinsRoutes } from './pins'
import { userRoutes } from './user'

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
      [ROUTE_INDEX]: 120,
      isFirstLevel: true
    },
  }, {
    name: 'post',
    path: '/post/:id',
    component: Post,
    meta: {
      [ROUTE_INDEX]: 200,
      isFirstLevel: true
    }
  },{
    name: 'pin',
    path: '/pin/:id',
    component: Pin,
    meta: {
      [ROUTE_INDEX]: 200
    }
  },{
    name: 'book-section',
    path: '/book/:bookId/section',
    component: SectionRead,
    children: [{
      name: 'book-section-detail',
      path: ':sectionId',
      component: SectionContent
    }],
    meta: {
      [ROUTE_INDEX]: 160
    }
  },{
    name: 'book',
    path: '/book/:id',
    component: Book,
    meta: {
      [ROUTE_INDEX]: 150,
    }
  },{
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      [ROUTE_INDEX]: 1000
    }
  },{
    name: 'setting',
    path: '/setting',
    component: Setting,
    meta: {
      [ROUTE_INDEX]: 110,
    }
  },{
    name: 'feedback',
    path: '/feedback',
    component: Feedback,
    meta: {
      [ROUTE_INDEX]: 110
    }
  },{
    name: 'read-history',
    path: '/read-history',
    component: ReadHistory,
    meta: {
      [ROUTE_INDEX]: 110,
      isAuth: true
    }
  },{
    name: 'tag-manage',
    path: '/tag-manage',
    component: TagManage,
    meta: {
      [ROUTE_INDEX]: 110,
      isAuth: true
    }
  },{
    name: 'my-like',
    path: '/my-like',
    component: MyLike,
    meta: {
      [ROUTE_INDEX]: 110,
      isAuth: true
    }
  },{
    name: 'my-purchased-book',
    path: '/my-purchased-book',
    component: MyPurchasedBook,
    meta: {
      [ROUTE_INDEX]: 110,
      isAuth: true
    }
  },{
    name: 'collection-set',
    path: '/user/:id/collections',
    component: CollectionSet,
    meta: {
      [ROUTE_INDEX]: 110,
    }
  },{
    name: 'user-like',
    path: '/user/:id/likes',
    component: UserLike,
    meta: {
      [ROUTE_INDEX]: 160
    }
  },{
    name: 'user-tag',
    path: '/user/:id/tags',
    component: UserTag,
    meta: {
      [ROUTE_INDEX]: 160
    }
  },{
    name: 'user',
    path: '/user/:id',
    component: User,
    redirect: '/user/:id/activies',
    meta: {
      [ROUTE_INDEX]: 150
    },
    children: userRoutes
  },{
    name: 'collection',
    path: '/collection/:id',
    component: Collection,
    meta: {
      [ROUTE_INDEX]: 120
    }
  },
  {
    name: 'about',
    path: '/about',
    component: About,
    meta: {
      [ROUTE_INDEX]: 120,
    }
  },{
    name: 'set-psd',
    path: '/set-psd',
    component: SetPsd,
    meta: {
      [ROUTE_INDEX]: 120
    }
  },{
    name: 'search',
    path: '/search',
    component: Search,
    redirect: '/search/all',
    children:[{
      path: ':type',
      component: SearchResult
    }]
  },{
    name: 'recommendation-author',
    path: '/recommendation/authors',
    component: RecommendationAuthor,
    redirect: '/recommendation/authors/recommended',
    children: [{
      name: 'author-channel',
      path: ':channel',
      component: AuthorList
    }]
  },{
    name: 'topic-attender',
    path: '/topic/:id/attenders',
    component: TopicAttender
  },{
    name: 'topic',
    path: '/topic/:id',
    component: Topic,
    redirect: '/topic/:id/rank',
    children: [{
      name: 'topic-pin-list',
      path: ':type',
    }]
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
      redirect: '/home/recommended',
      children: homeRoutes,
    }, {
      name: 'pins',
      path: '/pins',
      component: Pins,
      redirect: '/pins/recommended',
      children: pinsRoutes
    },{
      name: 'sousou',
      path: '/sousou',
      component: Sousou,
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
      name: 'me',
      path: '/me',
      component: Me,
    }, ]
  }]
})


router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (store.state.isLogin) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          from: to.path
        }
      })
    }
  } else {
    next()
  }
})

export default router;
