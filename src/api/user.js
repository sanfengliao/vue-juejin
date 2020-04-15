import request from '../util/request'
import { commonParams } from './common'
import { apiUrl } from '../common/config'
import store from '../store'
const state = store.state

export const getUserInfo = (uid=state.uid) => {
  return request({
    method: 'GET',
    url: '/user-storage/v1/getUserInfo',
    params: {
      uid,
      token: state.token,
      current_uid: state.uid,
      ...commonParams
    }
  }).then(res => res.data)
}

export const changePassword = (oldPsd, newPsd) => {
  let data = `uid=${state.uid}&token=${state.token}&src=android&device_id=${commonParams.device_id}&new_password=${newPsd}&old_password=${oldPsd}`
  return request.post('/user-storage/v1/changePassword', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => res.data)
}

export const getEntryBySelf = (targetUid=state.uid, type='view',before='') => {
  return request({
    method: 'GET',
    url: '/timeline-merger/v1/get_entry_by_self',
    params: {
      targetUid,
      type,
      before,
      order: 'createdAt',
      uid: state.uid,
      token: state.token,
      limit: 20,
      ...commonParams
    }
  }).then(res => res.data)
}

/**
 * 获取用户关注的标签
 * @param {string} userId 
 */
export const getUserSubscribeTag = (userId) => {
  return request({
    method: 'GET',
    url: `/gold-tag/v1/user/${userId}/subscribe`,
    headers: {
      'X-Juejin-Uid': state.uid,
      'X-Juejin-Client': commonParams.client_id,
      'X-Juejin-Token': state.token,
      'X-token': state.token
    }
  }).then(res => res.data)
}

export const getSuggestTag = (page=1, pageSize=100) => {
  return request({
    method: 'GET',
    url: `/gold-tag/v1/tags/type/hot/suggest/tag/page/${page}/pageSize/${pageSize}`,
    headers: {
      'X-Juejin-Uid': state.uid,
      'X-Juejin-Client': commonParams.client_id,
      'X-Juejin-Token': state.token,
      'X-token': state.token
    }
  }).then(res => res.data)
}

export const getRecommendTag = (page=1, pageSize=100) => {
  return request({
    method: 'GET',
    url: `/gold-tag/v1/tags/type/hot/suggest/category/page/${page}/pageSize/${pageSize}`,
    headers: {
      'X-Juejin-Uid': state.uid,
      'X-Juejin-Client': commonParams.client_id,
      'X-Juejin-Token': state.token,
      'X-token': state.token
    }
  }).then(res => res.data)
}

/**
 * 
 * @param {string} uid 
 * @param {number} page 
 * @param {number} pageSize 
 */
export const getUserLikePins = (uid, page=0, pageSize=20) => {
  return request({
    method: 'GET',
    url: '/short-msg/v1/getUserLikedList',
    params: {
      uid,
      page,
      pageSize,
      ...commonParams
    }
  }).then(res => res.data)
}

/**
 * 
 * @param {string} uid 
 * @param {number} page 
 * @param {number} pageSize 
 */
export const getUserLikeArticles = (uid, page=0, pageSize=20) => {
  return request({
    method: 'GET',
    url: `/user-like/v1/user/${uid}/like/entry`,
    params: {
      page,
      pageSize
    }
  }).then(res => res.data)
}

export const getMultiUser = (ids) => {
  return request({
    method: 'GET',
    url: '/lccro/v1/get_multi_user?',
    params: {
      ids,
      uid: state.uid,
      token: state.token,
      cols: 'viewedEntriesCount|role|totalCollectionsCount|allowNotification|subscribedTagsCount|appliedEditorAt|email|followersCount|postedEntriesCount|latestCollectionUserNotification|commentedEntriesCount|weeklyEmail|collectedEntriesCount|postedPostsCount|username|latestLoginedInAt|totalHotIndex|blogAddress|selfDescription|latestCheckedNotificationAt|emailVerified|totalCommentsCount|installation|blacklist|weiboId|mobilePhoneNumber|apply|followeesCount|deviceType|editorType|jobTitle|company|latestVoteLikeUserNotification|authData|avatarLarge|mobilePhoneVerified|objectId|createdAt|updatedAt',
      ...commonParams
    }
  }).then(res => res.data)
}

export const followUser = (followee) => {
  return request({
    method: 'GET',
    url: '/follow-api/v1/follow',
    params: {
      follower: state.uid,
      followee,
      token: state.token,
      ...commonParams
    }
  }).then(res => res.data)
}

export const unFollowUser = (followee) => {
  return request({
    method: 'GET',
    url: '/follow-api/v1/unfollow',
    params: {
      follower: state.uid,
      followee,
      token: state.token,
      ...commonParams
    }
  }).then(res => res.data)
}

export const isCurrentUserFollowed = (targetUids, currentUid=state.uid) => {
  return request({
    method: 'GET',
    url: '/follow-api/v1/isCurrentUserFollowed',
    params: {
      targetUids,
      currentUid,
      src: 'android'
    }
  }).then(res => res.data)
}

/**
 * 
 * @param {string} ownerId 
 * @param {string} after 
 */
export const getUserActivity = (ownerId, after) => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, {
    "variables": {
      ownerId,
      after
    },
    "extensions": {
      "query": {
        "id": "97625453207145724a2023a871be76d6"
      }
    }
  }).then(res => res.data)
}

export const getUserPinList = (uid, before, limit=20) => {
  return request({
    method: 'GET',
    url: '/short-msg/v1/getUserList',
    params: {
      ...commonParams,
      uid,
      token: state.token,
      currentUid: state.uid,
      before,
      limit
    }
  }).then(res => res.data)
}

export const getRecommendedAuthorChannel = () => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, {
    extensions: {
      query: {
        id: "b79c9f44967e3b78ed8cd35e8567cd73"
      }
    }
  }).then(res => res.data)
}

/**
 * 
 * @param {string} channel 
 * @param {string} after 
 */
export const getRecommendedAuthorByChannel = (channel='recommended', after='') => {
  return request.post(apiUrl.ANDROID_HOME_REQUEST_URL, {
    variables: {
      channel,
      first: 20,
      after
    },
    extensions: {
      query: {
        id: "71f4b77bd5fe68aadfd9eb7c65319afe"
      }
    }
  }).then(res => res.data)
}