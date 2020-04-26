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
import BookEntryList from '../views/books/pages/book-entry-list'
import Book from '../views/book'
import SectionDetail from '../views/section-detail'
import Setting from '../views/setting'
import About from '../views/about'
import Feedback from '../views/feedback'
import SetPsd from '../views/set-psd'
import UserReadHistory from '../views/user-read-history'
import TagManage from '../views/tag-manage'
import MyLike from '../views/my-like'
import MyPurchasedBook from '../views/my-purchased-book'
import CollectionSet from '../views/collection-set'

import User from '../views/user'
import UserLike from '../views/user-like'
import UserTag from '../views/user-tag'


import Collection from '../views/collection'
import Search from '../views/search'
import SearchResult from '../views/search/pages/search-result'
import RecommendationAuthor from '../views/recommendation-author'
import RecommendedAuthorList from '../views/recommendation-author/pages/recommend-author-list'
import Topic from '../views/topic'
import TopicAttender from '../views/topic-attender'
import Topics from '../views/topics'


import { homeRoutes } from './home'
import { pinsRoutes } from './pins'
import { userRoutes } from './user'
import { topicRoutes } from './topic'

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
  }, {
    name: 'topics',
    path: '/topics',
    component: Topics
  },{
    name: 'post',
    path: '/post/:id',
    component: Post,
  },{
    name: 'pin',
    path: '/pin/:id',
    component: Pin,
  },{
    name: 'book-section',
    path: '/book/:bookId/section/:sectionId',
    component: SectionDetail,
  },{
    name: 'book',
    path: '/book/:id',
    component: Book,
  },{
    name: 'login',
    path: '/login',
    component: Login,
  },{
    name: 'setting',
    path: '/setting',
    component: Setting,
  },{
    name: 'feedback',
    path: '/feedback',
    component: Feedback,
  },{
    name: 'user-read-history',
    path: '/user-read-history',
    component: UserReadHistory,
    meta: {
      isAuth: true
    }
  },{
    name: 'tag-manage',
    path: '/tag-manage',
    component: TagManage,
    meta: {
      isAuth: true
    }
  },{
    name: 'my-like',
    path: '/my-like',
    component: MyLike,
    meta: {
      isAuth: true
    }
  },{
    name: 'my-purchased-book',
    path: '/my-purchased-book',
    component: MyPurchasedBook,
    meta: {
      isAuth: true
    }
  },{
    name: 'collection-set',
    path: '/user/:id/collections',
    component: CollectionSet,
  },{
    name: 'user-like',
    path: '/user/:id/likes',
    component: UserLike,
  },{
    name: 'user-tag',
    path: '/user/:id/tags',
    component: UserTag,
  },{
    name: 'user',
    path: '/user/:id',
    component: User,
    redirect: '/user/:id/activies',
    children: userRoutes
  },{
    name: 'collection',
    path: '/collection/:id',
    component: Collection,

  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },{
    name: 'set-psd',
    path: '/set-psd',
    component: SetPsd,
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
      component: RecommendedAuthorList
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
    children: topicRoutes
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
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
