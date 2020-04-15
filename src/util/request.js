import axios from 'axios'
import store from '../store'
import { device_id, client_id } from '../common/config'


const service = axios.create({
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    config.headers['X-Agent'] = 'Juejin/xiaomi/Redmi Note 7 Pro Android/9 Juejin/Android/5.9.3',
    config.headers['X-Juejin-Src'] = 'android'
    // let { token, uid } = store.state
    // config.headers['X-Juejin-Uid'] = state.uid
    // config.headers['X-Juejin-Token'] = state.token
    // config.headers['X-Token'] = state.token
    const state = store.state
    config.headers['X-Legacy-Token'] = state.token
    config.headers['X-Legacy-Uid'] = state.uid
    config.headers['X-Juejin-Client'] = client_id
    config.headers['X-Legacy-Device-Id'] = device_id
    return config
  }
)
service.interceptors.response.use(res=>{
  return res
}, err=> {
  return err.response
})

export default service