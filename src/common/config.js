import store from './store'
import { HOME_ROUTE_KEY } from './const'
export let defaultHomeRoutes = [{
    path: '/home/recommended',
    title: '推荐',
  },{
    path: '/home/hot',
    title: '热榜'
  }, 
]
export let homeRoutes = store.get(HOME_ROUTE_KEY, [{
    path: '/home/backend',
    title: '后端',
    show: false
  }, {
    path: '/home/frontend',
    title: '前端',
    show: false
  }, {
    path: '/home/android',
    title: 'Android',
    show: false
  }, {
    path: '/home/ios',
    title: 'IOS',
    show: false
  }, {
    path: '/home/ai',
    title: '人工智能',
    show: false
  }, {
    path: '/home/freebie',
    title: '开发工具',
    show: false
  }, {
    path: '/home/career',
    title: '代码人生',
    show: false
  }, {
    path: '/home/article',
    title: '阅读',
    show: false
  }
])

export const apiUrl = {
  ANDROID_HOME_REQUEST_URL: 'https://android-api.juejin.im/graphql',
  WEB_HOME_REQUEST_URL: 'https://web-api.juejin.im/query'
}

export const routeTypes = {
  HOME_CATEGORY: 'home_category',
  HOME_RECOMMEND: 'home_recommend',
  HOME_HOT: 'home_hot',

}