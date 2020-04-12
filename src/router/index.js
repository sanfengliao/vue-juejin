import Vue from 'vue'
import VueRouter from 'vue-router'

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
import Collection from '../views/collection'
import UserActivity from '../views/user-activity'
import UserPost from '../views/user-post'
import UserPin from '../views/user-pin'
import UserShare from '../views/user-share'
import UserMore from '../views/user-more'
import UserLike from '../views/user-like'
import UserTag from '../views/user-tag'
import Search from '../views/search'
import SearchResult from '../views/search-result'

import { ROUTE_INDEX } from '../common/const'

import { homeRoutes } from './home'
import { pinsRoutes } from './pins'

VueRouter.prototype.goBack = function() {
  this.isBack = true
  this.go(-1)
}

VueRouter.prototype.jPush = function() {
  this.isPush = true,
  this.push(arguments)
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
    path: '/book/m/:bookId/section',
    component: SectionRead,
    children: [{
      name: 'book-section-id',
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
    }
  },{
    name: 'tag-manage',
    path: '/tag-manage',
    component: TagManage,
    meta: {
      [ROUTE_INDEX]: 110
    }
  },{
    name: 'my-like',
    path: '/my-like',
    component: MyLike,
    meta: {
      [ROUTE_INDEX]: 110
    }
  },{
    name: 'my-purchased-book',
    path: '/my-purchased-book',
    component: MyPurchasedBook,
    meta: {
      [ROUTE_INDEX]: 110
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
    children: [
      {
        name: 'user-activity',
        path: 'activies',
        component: UserActivity,
        meta: {
          [ROUTE_INDEX]: 151
        }
      },
      {
        name: 'user-post',
        path: 'posts',
        meta: {
          [ROUTE_INDEX]: 152
        },
        component: UserPost
      },
      {
        name: 'user-pin',
        path: 'pins',
        meta: {
          [ROUTE_INDEX]: 153
        },
        component: UserPin
      },
      {
        name: 'user-share',
        path: 'shares',
        meta: {
          [ROUTE_INDEX]: 154
        },
        component: UserShare,
      },
      {
        name: 'user-more',
        path: 'more',
        component: UserMore,
        meta: {
          [ROUTE_INDEX]: 155
        }
      },
    ]
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

export default router;
