import HomeArticleList from '../views/home-article-list'
import { ROUTE_WEIGHT } from '../common/const'
export const homeRoutes = [{
    props: {
      queryId: '21207e9ddb1de777adeaca7a2fb38030'
    },
    text: '推荐',
    path: '/home/recommended',
    component: HomeArticleList,
  },{
    props: {
      queryId: '21207e9ddb1de777adeaca7a2fb38030',
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
    text: '热榜',
    path: '/home/hot',
    component: HomeArticleList,
    
  },{
    props: {
      queryId: '653b587c5c7c8a00ddf67fc66f989d42',
      categoryId: '5562b419e4b00c57d9b94ae2',
      hasTags: true
    },
    path: '/home/backend',
    text: '后端',
    component: HomeArticleList,
    
  },{
    props: {
      queryId: '653b587c5c7c8a00ddf67fc66f989d42',
      categoryId: '5562b415e4b00c57d9b94ac8',
      hasTags: true
    },
    path: '/home/frontend',
    text: '前端',
    component: HomeArticleList,
    
  }, {
    props: {
      queryId: '653b587c5c7c8a00ddf67fc66f989d42',
      categoryId: '5562b410e4b00c57d9b94a92',
      hasTags: true
    },
    path: '/home/android',
    text: 'Android',
    component: HomeArticleList,
    
  }, {
    props: {
      queryId: '653b587c5c7c8a00ddf67fc66f989d42',
      categoryId: '5562b405e4b00c57d9b94a41',
      hasTags: true
    },
    path: '/home/ios',
    text: 'IOS',
    component: HomeArticleList,
    
  }, {
    props: {
      queryId: '653b587c5c7c8a00ddf67fc66f989d42',
      categoryId: '57be7c18128fe1005fa902de',
      hasTags: true
    },
    path: '/home/ai',
    text: '人工智能',
    component: HomeArticleList,
    
  }, {
    props: {
      queryId: '653b587c5c7c8a00ddf67fc66f989d42',
      categoryId: '5562b422e4b00c57d9b94b53',
      hasTags: true
    },
    path: '/home/freebie',
    text: '开发工具',
    component: HomeArticleList,
    
  }, {
    props: {
      queryId: '653b587c5c7c8a00ddf67fc66f989d42',
      categoryId: '5c9c7cca1b117f3c60fee548',
      hasTags: true
    },
    path: '/home/career',
    text: '代码人生',
    component: HomeArticleList,
    
  }, {
    props: {
      queryId: '653b587c5c7c8a00ddf67fc66f989d42',
      categoryId: '5562b428e4b00c57d9b94b9d',
      hasTags: true
    },
    path: '/home/article',
    text: '阅读',
    component: HomeArticleList,
    
  }
]
