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