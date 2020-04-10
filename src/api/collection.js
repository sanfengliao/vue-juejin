import request from '../util/request'
import { commonParams } from './common'
import store from '../store'
const state = store.state

/**
 * 
 * @param {string} targetUserId 
 * @param {number} page 
 */
export const getUserCollectionSet = (targetUserId, page=0) => {
  return request({
    method: 'GET',
    url: '/collection-set/v1/getUserCollectionSet',
    params: {
      src: commonParams.src,
      clientId: commonParams.client_id,
      token: state.token,
      userId: state.uid,
      targetUserId,
      page
    }
  }).then(res => res.data)
}

export const getFollowedCollectionSet = (targetUserId, page=0, pageSize=30) => {
  return request({
    method: 'GET',
    url: '/collection-set/v1/getFollowedCollectionSet',
    params: {
      src: commonParams.src,
      clientId: commonParams.client_id,
      token: state.token,
      userId: state.uid,
      targetUserId,
      page,
      pageSize
    }
  }).then(res => res.data)
}

export const getCollectionSetInfo = (csId) => {
  return request({
    method: 'GET',
    url: '/collection-set/v1/getCollectionSetInfo',
    params: {
      csId,
      src: commonParams.src,
      clientId: commonParams.client_id,
      userId: state.uid,
      token: state.token
    }
  }).then(res => res.data)
}

export const getCollectionSetEntries = (csId, page, rankType='new') => {
  return request({
    method:'GET',
    url: '/collection-set/v1/getCollectionSetEntries',
    params: {
      page,
      csId,
      rankType,
      src: commonParams.src,
      clientId: commonParams.client_id,
      userId: state.uid,
      token: state.token
    }
  }).then(res => res.data)
}

export const followCollection = (csId) => {
  return request({
    method: 'GET',
    url: '/collection-set/v1/follow',
    params: {
      csId,
      userId: state.uid,
      token: state.token,
      clientId: commonParams.client_id,
      src: commonParams.src
    }
  }).then(res => res.data)
}

export const unFollowCollection = (csId) => {
  return request({
    method: 'GET',
    url: '/collection-set/v1/unfollow',
    params: {
      csId,
      userId: state.uid,
      token: state.token,
      clientId: commonParams.client_id,
      src: commonParams.src
    }
  }).then(res => res.data)
}