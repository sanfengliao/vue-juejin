import request from '../util/request'
import { apiUrl } from '../common/config'
import { commonParams } from './common'
import store from '../store'
const state = store.state


// TODO 添加token
/**
 * 获取banner
 */
export const getEventBanner = () => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, {
    "variables": {
      "platformCode": 2,
      "positionCodes": [4]
    },
    "extensions": {
      "query": {
        "id": "1623ab25980fadf6bae12e10fc0af1e8"
      }
    }
  }).then(res => res.data)
}

// TODO 添加uid和token
/**
 * 
 * @param {string} before 
 */
export const getEntryByRank = (before) => {
  return request({
    method: 'GET',
    url: '/timeline-merger/v1/get_entry_by_rank',
    params: {
      before,
      limit: 30,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => res.data)
}