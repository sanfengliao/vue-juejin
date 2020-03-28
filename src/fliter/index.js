export const dateDis = date => {
  let stime = new Date(date).getTime()
  let etime = Date.now()
  let dtime = etime - stime
  let days = Math.floor(dtime / (24 * 3600 * 1000))
  if (days > 0) {
    return days + '天前'
  }
  let hours = Math.floor(dtime / (3600 * 1000))
  if (hours > 0) {
    return hours + '小时前'
  }
  let minutes = Math.floor(dtime / (60 * 1000))
  if (minutes > 5) {
    return minutes + '分钟前'
  }
  return '刚刚'
}

const backgroundImages = [
  'https://b-gold-cdn.xitu.io/v3/static/img/lv-1.636691c.svg',
  'https://b-gold-cdn.xitu.io/v3/static/img/lv-2.f597b88.svg',
  'https://b-gold-cdn.xitu.io/v3/static/img/lv-3.e108c68.svg',
  'https://b-gold-cdn.xitu.io/v3/static/img/lv-4.2c3fafd.svg',
  '',
  'https://b-gold-cdn.xitu.io/v3/static/img/lv-6.74bd93a.svg'
]

export const levelImage = index => {
  return backgroundImages[index - 1]
}