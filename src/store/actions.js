import * as types from './mutation-types'

import store from '../common/store'
import { HOME_ROUTE_KEY, PIN_ROUTE_KEY, TOKEN_KEY, UID_KEY } from '../common/const'
import { login } from '../api/user'

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
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(UID_KEY, user_id)
  return true
}