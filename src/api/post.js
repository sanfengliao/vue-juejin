import request from '../util/request'
import store from '../store'

import { commonParams } from './common'
const state = store.state

export const getEntryView = (entryId) => {
  return request({
    method: 'GET',
    url: '/entry-view/v1/getEntryView',
    params: {
      entryId,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => {
    return res.data
  })
}

export const getEntryByEntryIds = (entryIds) => {
  return request({
    method: 'GET',
    url: '/timeline-merger/v1/get_entry_by_ids',
    params: {
      entryIds,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => res.data)
}

export const getRelatedEntry = (entryId, limit=4) => {
  return request({
    method: 'GET',
    url: '/timeline-merger/v1/get_related_entry',
    params: {
      entryId,
      limit,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => res.data)
}

export const getComments = (id, createdAt='', rankType='new') => {
  return request({
    method: 'GET',
    url: `/comment-wrapper-ms/v2/comments/entry/${id}`,
    params: {
      createdAt,
      rankType,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => res.data)
}