import request from '../util/request'
/**
 * 获取小册
 * @param {number} pageNum 
 */
export const getBooks = (pageNum=1) => {
  // TODO 添加token
  return request({
    method: 'GET',
    url: '/v1/xiaoce/getListByLastTime',
    params: {
      pageNum,
      src: 'android'
    }
  }).then(res => res.data)
}
/**
 * 
 * @param {number} pageNum 
 */
export const getMyBooks = (pageNum=1) => {
  // TODO 添加token
  return request({
    method: 'GET',
    url: '/v1/xiaoce/cache/userBuyList',
    params: {
      pageNum,
      src: 'android',
      token: 'eyJhY2Nlc3NfdG9rZW4iOiIzUGNjT2dpSkRDdXpGZ0tOIiwicmVmcmVzaF90b2tlbiI6Ilkzb3NRZFJZcE9mVjV5ODIiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
      uid: '5ca9749d51882543bc78b0f4'
    }
  }).then(res => res.data)
}


export const getBookDetail = (id) => {
  // TODO 添加token
  return request({
    method: 'GET',
    url: '/v1/xiaoce/cache/get',
    params: {
      id,
      src: 'android'
    }
  }).then(res => res.data)
}

/**
 *  
 * @param {string} id 
 */
// export const getBookDetail = (id) => {
//   // TODO 添加token
//   return request({
//     method: 'GET',
//     url: '/v1/xiaoce/get',
//     params: {
//       id,
//       src: 'android'
//     }
//   }).then(res => res.data)
// }

/**
 *  
 * @param {string} id 
 */
export const getBookSections = (id) => {
  // TODO 添加token
  return request({
    method: 'GET',
    url: '/v1/xiaoce/cache/getListSection',
    params: {
      uid: 'unlogin',
      id,
      src: 'android'
    }
  }).then(res => res.data)
}
/**
 * 
 * @param {string} id 
 * @param {number} pageNum 
 * @param {number} pageSize 
 */
export const getListBuy = (id, pageNum=1, pageSize=20) => {
  // TODO 添加token
  return request({
    method: 'GET',
    url: '/v1/xiaoce/cache/getListBuy',
    params: {
      id,
      src: 'android',
      pageNum,
      pageSize
    }
  }).then(res => res.data)
}