import request from '../util/request'
import {  commonParams } from './common'
import store from '../store'
const state = store.state
/**
 * 获取小册
 * @param {number} pageNum 
 */
export const getBooks = (pageNum=1) => {
  // TODO 添加token
  return request({
    method: 'GET',
    url: '/xiaoce-timeline/v1/getListByLastTime',
    params: {
      pageNum,
      token: state.token,
      uid: state.uid,
      ...commonParams,
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
    url: '/xiaoce-cache/v1/userBuyList',
    params: {
      pageNum,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => res.data)
}


export const getBookDetail = (id) => {
  return request({
    method: 'GET',
    url: '/xiaoce-cache/v1/get',
    params: {
      id,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => res.data)
}

/**
 *  
 * @param {string} id 
 */
export const getBookSectionDetail = (sectionId) => {
  // TODO 添加token
  return request({
    method: 'GET',
    url: '/xiaoce-cache/v1/getSection',
    params: {
      sectionId,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => res.data)
}

/**
 *  
 * @param {string} id 
 */
export const getBookSections = (id) => {
  // TODO 添加token
  return request({
    method: 'GET',
    url: '/xiaoce-cache/v1/getListSection',
    params: {
      id,
      token: state.token,
      uid: token.uid,
      ...commonParams
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
    url: '/xiaoce-cache/v1/getListBuy',
    params: {
      id,
      pageNum,
      pageSize,
      token: state.token,
      uid: state.uid,
      ...commonParams
    }
  }).then(res => res.data)
}