import HomeArticleList from '../views/home-article-list'
import { homeRoutes as _homeRoutes, routeTypes} from '../common/config'
const routeMap = {
  '/home/backend': {
    props: {
      queryId: '242a289e6ba916aa4f3ceae00a4225d3',
      categoryId: '5562b419e4b00c57d9b94ae2',
      hasTags: true
    },
    path: '/home/backend',
    name: '后端',
    component: HomeArticleList,
    meta: {
      routeType: routeTypes.HOME_CATEGORY 
    }
  },
  '/home/frontend': {
    props: {
      queryId: '242a289e6ba916aa4f3ceae00a4225d3',
      categoryId: '5562b415e4b00c57d9b94ac8',
      hasTags: true
    },
    path: '/home/frontend',
    name: '前端',
    component: HomeArticleList,
    meta: {
      routeType: routeTypes.HOME_CATEGORY 
    }
  }, 
  '/home/android': {
    props: {
      queryId: '242a289e6ba916aa4f3ceae00a4225d3',
      categoryId: '5562b410e4b00c57d9b94a92',
      hasTags: true
    },
    path: '/home/android',
    name: 'Android',
    component: HomeArticleList,
    meta: {
      routeType: routeTypes.HOME_CATEGORY 
    }
  }, 
  '/home/ios': {
    props: {
      queryId: '242a289e6ba916aa4f3ceae00a4225d3',
      categoryId: '5562b405e4b00c57d9b94a41',
      hasTags: true
    },
    path: '/home/ios',
    name: 'IOS',
    component: HomeArticleList,
    meta: {
      routeType: routeTypes.HOME_CATEGORY 
    }
  }, 
  '/home/ai': {
    props: {
      queryId: '242a289e6ba916aa4f3ceae00a4225d3',
      categoryId: '57be7c18128fe1005fa902de',
      hasTags: true
    },
    path: '/home/ai',
    name: '人工智能',
    component: HomeArticleList,
    meta: {
      routeType: routeTypes.HOME_CATEGORY 
    }
  }, 
  '/home/freebie': {
    props: {
      queryId: '242a289e6ba916aa4f3ceae00a4225d3',
      categoryId: '5562b422e4b00c57d9b94b53',
      hasTags: true
    },
    path: '/home/freebie',
    name: '开发工具',
    component: HomeArticleList,
    meta: {
      routeType: routeTypes.HOME_CATEGORY 
    }
  }, 
  '/home/career': {
    props: {
      queryId: '242a289e6ba916aa4f3ceae00a4225d3',
      categoryId: '5c9c7cca1b117f3c60fee548',
      hasTags: true
    },
    path: '/home/career',
    name: '代码人生',
    component: HomeArticleList,
    meta: {
      routeType: routeTypes.HOME_CATEGORY 
    }
  }, 
  '/home/article': {
    props: {
      queryId: '242a289e6ba916aa4f3ceae00a4225d3',
      categoryId: '5562b428e4b00c57d9b94b9d',
      hasTags: true
    },
    path: '/home/article',
    name: '阅读',
    component: HomeArticleList,
    meta: {
      routeType: routeTypes.HOME_CATEGORY 
    }
  }
}

export const homeRoutes = [{
  name: '关注',
  path: '/home/following'
},
  {
    props: {
      queryId: 'f948b4528c56f0d2ceaff0be67b0809d'
    },
    name: '推荐',
    path: '/home/recommended',
    component: HomeArticleList,
    meta: {
      routeType: routeTypes.HOME_RECOMMEND 
    }
  },{
    props: {
      queryId: 'f30157ca93f83fc7ff860ed0fb45599e',
      sort: 'THREE_DAYS_HOTTEST',
      sortTags:[{
        tagId: 'THREE_DAYS_HOTTEST',
        title: '三天内'
      }, {
        tagId: 'WEEKLY_HOTTEST',
        title: '七天内'
      }, {
        tagId: 'MONTHLY_HOTTEST',
        title: '30天内'
      }, {
        tagId: 'HOTTEST',
        title: '全部'
      }]
    },
    name: '热榜',
    path: '/home/hot',
    component: HomeArticleList,
    meta: {
      routeType: routeTypes.HOME_HOT 
    }
  }
]

for (let item of _homeRoutes) {
  homeRoutes.push(routeMap[item.path])
}
