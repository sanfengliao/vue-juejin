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
}

export default mutations