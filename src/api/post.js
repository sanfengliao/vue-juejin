import request from '../util/request'

export const getEntryView = (entryId) => {
  return request({
    method: 'GET',
    url: '/v1/post/getEntryView',
    params: {
      entryId,
      src: 'android'
    }
  }).then(res => {
    return res.data
  })
}

export const getEntryByEntryIds = (entryIds) => {
  return request({
    method: 'GET',
    url: '/v1/get_entry_by_ids',
    params: {
      entryIds,
      src: 'android'
    }
  }).then(res => res.data)
}

export const getRelatedEntry = (entryId, limit=4) => {
  return request({
    method: 'GET',
    url: '/v1/get_related_entry',
    params: {
      entryId,
      limit,
      src: 'android'
    }
  }).then(res => res.data)
}

export const getComments = (id, createdAt='', rankType='new') => {
  return request({
    method: 'GET',
    url: `/v2/comment/comments/entry/${id}`,
    params: {
      createdAt,
      rankType
    }
  }).then(res => res.data)
}