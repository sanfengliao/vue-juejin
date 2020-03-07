import axios from 'axios'

const service = axios.create({
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    config.headers['X-Agent'] = 'Juejin/Android'
    return config
  }
)

service.interceptors.response.use(
  res => {
    let code = res.status
    if (/^20\d+/.test(code) || code === 304) {
      return res.data
    }
  }
)

export default service