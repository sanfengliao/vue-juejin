/**
 * 从数组中随机抽取n个
 * @param {Array} arr 
 * @param {number} n 
 * @returns 
 */
export const randomSelect = (arr, n) => {
  let _arr = arr.slice()
  let result = []
  if (n >= _arr.length) {
    return _arr
  }
  let len = _arr.length
  for (let i = 0; i < n; ++i) {
    let index = Math.floor(Math.random() * (len - i))
    result.push(_arr[index])
    let temp = _arr[index]
    _arr[index] = _arr[len - 1 - i]
    _arr[len - 1 - i] = temp
  }
  return result
}

/**
 * 
 * @param {string} url 
 */
export const getUrlParams = (url) => {
  let queryString = url.split('?')[1]
  if (queryString) {
    let kvs = queryString.split('&')
    if (kvs.length > 0) {
      let params = {}
      for (let item of kvs) {
        let [k, v] = item.split('=')
        params[k] = v
      }
      return params
    }
  }
  
}

/**
 * 
 * @param {Function} fn 
 * @param {number} delay 
 */
export const throttle = function(fn, delay=500) {
  let last = 0
  return function(...args) {
    if (Date.now() - last >= delay) {
      fn.apply(this, args)
      last = Date.now()
    }
  }
}

export function generateDeviceId() {
  let deviceId = localStorage.getItem('_device_id_')
  if (!deviceId) {
    deviceId = Math.random().toString().slice(2, 6)
    let deviceId = localStorage.setItem('_device_id_', deviceId)
  }
  return deviceId
}