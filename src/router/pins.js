import PinsEntryList from '../views/pins-entry-list'
import { pinsRouteType } from '../common/config'

export const pinsRoutes = [{
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