import request from '../util/request'
import store from '../store'
import { client_id, device_id } from '../common/config'

/**
 * 登录功能
 * @param {string} username 
 * @param {string} password 
 * @param {string} loginType 
 */
export const login = (username, password, loginType) => {
  console.log('login')
  let data = `user=${username}&psd=${password}&src=android&login_type=${loginType}&client_id=${client_id}&device_id=${device_id}&state=state&token=${store.state.token}`
  return request.post('/auth-center/v1/login',data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => res.data)
}

