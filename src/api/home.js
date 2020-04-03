import request from '../util/request'
import { apiUrl, } from '../common/config'

import { commonParams } from './common'
import store from '../store'
const state = store.state

/**
 * 获取文章列表
 * @param {object} data 
 */
export const query = (data) => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, data).then(res => {
    return res.data
  })
}

/**
 * 获取标签
 * @param {string} category 
 */
export const queryTag = (category) => {
  return request.post(apiUrl.WEB_HOME_REQUEST_URL, {
    operationName: "",
    query: "",
    variables: {category, limit: 15},
    extensions: {query: {id: "801e22bdc908798e1c828ba6b71a9fd9"}}
  }).then(res => {
    return res.data
  })
}

/**
 * 获取首页文章列表
 * @param {string} after 
 */
export const getRecommendedArticle = (after='') => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, {
    variables: {
      after,
      platformCode: '2',
      positionCodes: [2, 3],
      tags: []
    },
    extensions: {
      query: {
        id: 'f948b4528c56f0d2ceaff0be67b0809d'
      }
    }
  }).then(res => {
    return res.data
  })
}

/**
 * 获取热门文章列表
 * @param {string} after 
 * @param {string} order
 */
export const getHotArticle = (after='', order='THREE_DAYS_HOTTEST') => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, {
    variables: {
      after,
      order,
      "first": 30
    },
    "extensions": {
      "query": {
        "id": "f30157ca93f83fc7ff860ed0fb45599e"
      }
    }
  }).then(res => {
    return res.data
  })
}
/**
 * 获取文章列表
 * @param {string} category
 * @param {string[]} tags
 * @param {string} before 
 * @param {number} limit 
 */
export const getEntryByTimeline = (category, tags=[], after='', limit=20) => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, {
    variables: {
      after,
      category,
      tags,
    },
    extensions: {
      query: {
        id: '242a289e6ba916aa4f3ceae00a4225d3'
      }
    }
  }).then(res => {
    return res.data
  })
}

/**
 * 
 * @param {string} category 
 * @param {number} limit 
 * @param {string} period 
 */
export const getEntryByPeriod = (category, limit=20, period='3day') => {
  return request({
    method: 'get',
    url: '/timeline-merger/v1/get_entry_by_period',
    params: {
      category,
      limit,
      period,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => {
      return res.data
  })
}
