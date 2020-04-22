import * as types from './mutation-types'

import { HOME_ROUTE_KEY, PIN_ROUTE_KEY, TOKEN_KEY, UID_KEY, IS_LOGIN_KEY } from '../common/const'
import { login } from '../api/auth'

import Message from '../components/message'
import store from '../common/store'

export const setRouteTransition = ({commit}, value) => {
  commit(types.SET_ROUTE_TRANSITION, value)
}

export const userLogin = async ({ commit },{username, password, loginType}) => {
  let data = await login(username, password, loginType)
  
  if (data.s !== 1) {
    Message.message(data.m)
    return false
  }
  let { token , user_id } = data.d
  commit(types.SET_TOKEN, token)
  commit(types.SET_UID, user_id)
  commit(types.SET_IS_LOGIN, true)
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(UID_KEY, user_id)
  localStorage.setItem(IS_LOGIN_KEY, true)
  return true
}

export const userLogout = ({ commit }) => {
  commit(types.SET_IS_LOGIN, false)
  localStorage.setItem(IS_LOGIN_KEY, false)
}

export const addKeepAlive = ({commit,state}, componentName) => {
  let { keepAliveArr } = state
  if (keepAliveArr.indexOf(componentName) === -1) {
    keepAliveArr.push(componentName)
    commit(types.SET_KEEP_ALIVE_ARR, keepAliveArr)
  }
}

export const removeKeepAlive = ({commit, state}, componentName) => {
  let { keepAliveArr } = state
  let index = keepAliveArr.indexOf(componentName)
  if (index !== -1) {
    keepAliveArr.splice(index, 1)
    commit(types.SET_KEEP_ALIVE_ARR, keepAliveArr)
  }
}


export const setHomeRoutes = ({commit}, homeRoutes) => {
  store.set(HOME_ROUTE_KEY, homeRoutes)
  commit(types.SET_HOME_ROUTES, homeRoutes)
}


export const setPinRoutes = ({commit}, pinRoutes) => {
  store.set(PIN_ROUTE_KEY, pinRoutes)
  commit(types.SET_PINS_ROUTES, pinRoutes)
}

export const setQuery = ({ commit }, query) => {
  commit(types.SET_QUERY, query)
}


export const setHomeRouteIndex = ({commit, state}, routeIndex) => {
  let { homeRouteIndex } = state
  homeRouteIndex = Object.assign(homeRouteIndex, routeIndex)
  commit(types.SET_HOME_ROUTE_INDEX, homeRouteIndex)
}

export const setPinRouteIndex = ({commit, state}, routeIndex) => {
  let { pinRouteIndex } = state
  pinRouteIndex = Object.assign(pinRouteIndex, routeIndex)
  commit(types.SET_PIN_ROUTE_INDEX, pinRouteIndex)
}

