const cache = {
  /**
   * 
   * @param {string} key 
   * @param {any} value 
   */
  set(key, value) {
    cache[key] = value
  },
  /**
   * 
   * @param {string} key 
   * @param {any} value 
   */
  get(key) {
    return cache[key]
  }
}

export default cache