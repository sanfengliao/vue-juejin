import PinsEntryList from '../views/pins/pages/pins-entry-list'
import PinFollowing from '../views/pins/pages/pin-following'
import { pinsRouteType } from '../common/config'

export const pinsRoutes = [{
  name: 'pins-following',
  path: '/pins/following',
  component: PinFollowing
},{
  name: 'pins-recommended',
  path: '/pins/recommended',
  component: PinsEntryList,
  meta: {
    type: pinsRouteType.RECOMMENDED
  }
}, {
  name: 'pins-hot',
  path: '/pins/hot',
  component: PinsEntryList,
  meta: {
    type: pinsRouteType.HOT,
  }
},{
  path: '/pins/topic/:id',
  component: PinsEntryList,
  meta: {
    type: pinsRouteType.TOPIC
  }
}]