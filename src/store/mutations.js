import * as types from './mutation-types'
const mutations = {
  [types.SET_ROUTE_TRANSITION](state, routeTransition) {
    state.routeTransition = routeTransition
  },
  [types.SET_HOME_ROUTES](state, homeRoutes) {
    state.homeRoutes = homeRoutes
  },
  [types.SET_PINS_ROUTES](state, pinsRoutes) {
    state.pinsRoutes = pinsRoutes
  },
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.SET_UID](state, uid) {
    state.uid = uid
  }
}

export default mutations