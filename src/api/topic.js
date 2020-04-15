import request from '../util/request'
import { apiUrl } from '../common/config'
import { commonParams } from './common'
import store from '../store'
import qs from 'qs'

export const getTopicInfo = (topicId) => {
  return request({
    method: 'GET',
    url: `/short-msg/v1/topic/${topicId}`,
    params: {
      uid: store.state.uid,
      token: store.state.token,
      src: commonParams.src,
      device_id: commonParams.device_id
    }
  }).then(res => res.data)
}

export const getTopicPinList = (topicId, sortType='rank', page=0, pageSize=20) => {
  return request({
    method: 'GET',
    url: `/short-msg/v1/pinList/topic`,
    params: {
      topicId,
      sortType,
      page,
      pageSize,
      uid: store.state.uid,
      token: store.state.token,
      ...commonParams
    }
  }).then(res => res.data)
}

export const getTopicAttender = (topicId, page=0, pageSize=20) => {
  return request({
    method: 'GET',
    url: '/short-msg/v1/topic/attenders',
    params: {
      topicId,
      page,
      pageSize,
      uid: store.state.uid,
      token: store.state.token,
      ...commonParams
    }
  }).then(res => res.data)
}

/**
 * 
 * @param {string} sortType 
 * @param {number} page 
 * @param {number} pageSize 
 */
export const getTopicList = (sortType='hot', page=0, pageSize=20) => {
  return request({
    method: 'GET',
    url: '/short-msg/v1/topicList',
    params: {
      ...commonParams,
      uid: store.state.uid,
      token: store.state.token,
      sortType,
      page,
      pageSize
    }
  }).then( res => res.data)
}

/**
 * 
 * @param {string} topicIds 
 */
export const followTopic = (topicIds) => {
  return request.post('/short-msg/v1/topic/follow',qs.stringify({
    topicIds,
    ...commonParams,
    uid: store.state.uid,
    token: store.state.token
  }), {
    headers: {
      'Content-Type':' application/x-www-form-urlencoded'
    }
  }).then(res => res.data)
}