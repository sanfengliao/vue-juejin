import UserActivity from '../views/user/pages/user-activity'
import UserPost from '../views/user/pages/user-post'
import UserPin from '../views/user/pages/user-pin'
import UserShare from '../views/user/pages/user-share'
import UserMore from '../views/user/pages/user-more'
import { ROUTE_INDEX } from '../common/const'
export const userRoutes = [
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