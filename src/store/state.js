import { homeRoutes,pinsRoutes, homeRouteIndex, pinRouteIndex } from '../common/config'
import { TOKEN_KEY, UID_KEY, IS_LOGIN_KEY } from '../common/const'

const state = {
  routeTransition: true,
  defaultAvatar: 'https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg',
  homeRoutes,
  pinsRoutes,
  homeRouteIndex,
  pinRouteIndex,
  token: localStorage.getItem(TOKEN_KEY) || '',
  uid: localStorage.getItem(UID_KEY) || '',
  isLogin: JSON.parse(localStorage.getItem(IS_LOGIN_KEY)) || false,
  keepAliveArr: ['layout'],
  query: ''
}

export default state