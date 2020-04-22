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
    component: UserActivity
  },
  {
    name: 'user-post',
    path: 'posts',
    component: UserPost
  },
  {
    name: 'user-pin',
    path: 'pins',
    component: UserPin
  },
  {
    name: 'user-share',
    path: 'shares',
    component: UserShare,
  },
  {
    name: 'user-more',
    path: 'more',
    component: UserMore,
  },
]