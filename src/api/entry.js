import request from '../util/request'
import { commonParams } from './common'
import store from '../store'
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