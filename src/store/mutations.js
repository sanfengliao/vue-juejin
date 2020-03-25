import * as types from './mutation-types'
const mutations = {
  [types.SET_ROUTE_TRANSITION](state, routeTransition) {
    state.routeTransition = routeTransition
  },
  [types.SET_HOME_ROUTES](state, homeRoutes) {
    state.homeRoutes = homeRoutes
  }
}

export default mutations