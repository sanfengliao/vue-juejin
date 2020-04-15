import * as types from './mutation-types'

import store from '../common/store'
import { HOME_ROUTE_KEY, PIN_ROUTE_KEY, TOKEN_KEY, UID_KEY, IS_LOGIN_KEY } from '../common/const'
import { login } from '../api/auth'

import Message from '../components/message'

export const setRouteTransition = ({commit}, value) => {
  commit(types.SET_ROUTE_TRANSITION, value)
}

export const setHomeRoutes = ({commit}, value) => {
  commit(types.SET_HOME_ROUTES, value)
  store.set(HOME_ROUTE_KEY, value)
}

export const setPinsRoutes = ({commit}, value) => {
  commit(types.SET_PINS_ROUTES, value)
  store.set(PIN_ROUTE_KEY, value)
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

export const setQuery = ({ commit }, query) => {
  commit(types.SET_QUERY, query)
}

export const setCurrentHomeRoute = ({ commit }, path) => {
  commit(types.SET_CURRENT_HOME_ROUTE, path)
}

export const setCurrentPinsRoute = ({ commit }, path) => {
  commit(types.SET_CURRENT_PINS_ROUTE, path)
}
