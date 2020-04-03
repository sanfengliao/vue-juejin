import store from './store'
import { HOME_ROUTE_KEY, PIN_ROUTE_KEY } from './const'

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


export let defaultPinsRoutes = [{
    path: '/pins/recommended',
    title: '推荐'
  },{
    path: '/pins/hot',
    title: '热门'
  }
]

export let pinsRoutes = store.get(PIN_ROUTE_KEY, [{
  path: '/pins/topic/5c09ea2b092dcb42c740fe73',
  title: '开源推荐',
  show: true
},{
  path: '/pins/topic/5abb61e1092dcb4620ca3322',
  title: '内推招聘',
  show: true,
},{
  path: '/pins/topic/5abcaa67092dcb4620ca335c',
  title: '掘金相亲',
  show: true,
},{
  path: '/pins/topic/5c106be9092dcb2cc5de7257',
  title: '上班摸鱼',
  show: true,
},{
  path: '/pins/topic/5b514af1092dcb61bd72800d',
  title: '应用安利',
  show: true,
}, {
  path: '/pins/topic/5abb67d2092dcb4620ca3324',
  title: '开发工具',
  show: true
}, {
  path: '/pins/topic/5c46a17f092dcb4737217152',
  title: 'New资讯',
  show: true
}]
) 

export const apiUrl = {
  ANDROID_HOME_REQUEST_URL: 'https://android-api.juejin.im/graphql',
  WEB_HOME_REQUEST_URL: 'https://web-api.juejin.im/query'
}

export const pinsRouteType = {
  RECOMMENDED: 'RECOMMENDED',
  HOT: 'HOT',
  TOPIC: 'TOPIC'
}

export const routeTypes = {
  HOME_CATEGORY: 'home_category',
  HOME_RECOMMEND: 'home_recommend',
  HOME_HOT: 'home_hot',
}

export const client_id = 'client_id'
export const device_id = 'client_id'