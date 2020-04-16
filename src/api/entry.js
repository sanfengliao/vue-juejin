import request from '../util/request'
import { commonParams } from './common'
import store from '../store'
import qs from 'qs'
const state = store.state

export const getEntryByIds = (entryIds) => {
  return request({
    method: 'GET',
    url: '/timeline-merger/v1/get_entry_by_ids',
    params: {
      entryIds,
      ...commonParams,
      token: state.token
    }
  }).then(res => res.data)
}

export const likeEntry = (entryId) => {
  return request.put(`/user-like/v1/user/like/entry/${entryId}`, qs.stringify({
    uid: store.state.uid,
    token: store.state.token,
    device_id: commonParams.device_id,
    src: commonParams.src
  }),{
    headers: {
      'X-Juejin-Client': commonParams.client_id,
      'X-Juejin-Src': 'web',
      'X-Juejin-Token': store.state.token,
      'X-Juejin-Uid': store.state.uid,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => res.data)
  // return request({
  //   method: 'PUT',
  //   url: `/user-like/v1/user/like/entry/${entryId}`,
  //   headers: {
  //     'X-Juejin-Client': commonParams.client_id,
  //     'X-Juejin-Src': 'web',
  //     'X-Juejin-Token': store.state.token,
  //     'X-Juejin-Uid': store.state.uid
  //   }
  // }).then(res => res.data)
}