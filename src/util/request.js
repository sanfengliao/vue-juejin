import axios from 'axios'

const service = axios.create({
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    config.headers['X-Agent'] = 'Juejin/xiaomi/Redmi Note 7 Pro Android/9 Juejin/Android/5.9.3',
    config.headers['X-Juejin-Src'] = 'android'
    return config
  }
)

service.interceptors.response.use(
  res => {
    let code = res.status
    if (/^20\d+/.test(code) || code === 304) {
      return res
    }
  }
)


export default service