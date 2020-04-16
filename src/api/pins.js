import request from '../util/request'
import { apiUrl } from '../common/config'
import store from '../store'
import { commonParams } from './common'

const state = store.state

/**
 * 获取沸点推荐
 */
export const getHotRecommendList = () => {
  return request({
    method: 'GET',
    url: '/short-msg/v1/getHotRecommendList',
    params: {
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => {
    return res.data
  })
}

/**
 * 获取主题
 * @param {string} topicId 
 * @param {number} page 
 * @param {number} pageSize 
 * @param {string} sortType 
 */
export const getTopicList = (topicId, page=0, pageSize=20, sortType='rank') => {
  return request({
    method: 'GET',
    url: '/short-msg/v1/pinList/topic',
    params: {
      topicId,
      page,
      pageSize,
      sortType,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => {
    return res.data
  })
}

/**
 * 获取沸点推荐列表
 * @param {string} after 
 */
export const getRecommendedFeed = (after='') => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, {
    "variables": {
      after,
      "afterPosition": ""
    },
    "extensions": {
      "query": {
        "id": "e3e03965a15cf246cf7cc3944086843b"
      }
    }
  }).then(res => res.data)
}

/**
 * 获取热门列表
 * @param {string} after 
 */
export const getPopularPinList = (after='') => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, {
    "variables": {
      after,
      "first": 20
    },
    "extensions": {
      "query": {
        "id": "1b6b07b2ffcdc06c43114d79ca131afa"
      }
    }
  }).then(res => res.data)
}

/**
 * 获取沸点评论
 * @param {string} id 
 * @param {number} pageNum 
 * @param {number} pageSize 
 * @param {string} rankType 
 */
export const getPinComments = (id, pageNum=0, pageSize=20, rankType='new') => {
  return request({
    method: 'GET',
    url: `/hot-topic-comment-wrapper/v1/comments/${id}`,
    params: {
      pageNum,
      pageSize,
      rankType,
      token: state.token,
      uid: state.uid,
      ...commonParams
      
    }
  }).then(res => res.data)
}

// TODO 请求参数加上token
/**
 * 
 * @param {string} id 
 */
export const getPinById = (id) => {
  return request({
    method: 'GET',
    url: '/short-msg/v1/getByID',
    params: {
      msgId: id,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => res.data)
}

export const getFollowingUserActivities = (after) => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, {
    variables: {
      after,
      feedType: "MAIN"
    },
    extensions: {
      query: {
        id: "05d2b2b04536aceb593531ec832d6b22"
      }
    }
  }).then(res => res.data)
}

/**
 * 
 * @param {string[]} exclude 
 */
export const getRecommendedUser = (exclude=[], limit=8) => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, {
    variables: {
      excluded: JSON.stringify(exclude),
      limit,
    },
    extensions: {
      query: {
        id: "038909ed3577b0925031b01b445819a0"
      }
    }
  }).then(res => res.data)
}

export const likePin = (msgId) => {
  return request({
    method: 'GET',
    url: '/short-msg/v1/like',
    params: {
      msgId,
      uid: store.state.uid,
      token: store.state.token,
      ...commonParams
    }
  }).then(res => res.data)
}

export const unlikePin = (msgId) => {
  return request({
    method: 'GET',
    url: '/short-msg/v1/unlike',
    params: {
      msgId,
      uid: store.state.uid,
      token: store.state.token,
      ...commonParams
    }
  }).then(res => res.data)
}