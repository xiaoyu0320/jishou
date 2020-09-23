export function changeTime (str) {
  str = str.replace(/-/gi, '/')
  let createTime = new Date(str)
  let endTime = new Date()
  let middleTime = parseInt((endTime - createTime) / 1000)
  let date = parseInt(middleTime / (60 * 60 * 24))
  if (date > 0) {
    return date + '天前'
  }
  let h = parseInt((middleTime - date * 60 * 60 * 24) / (60 * 60))
  if (h > 0) {
    return h + '小时前'
  }
  let m =
    parseInt((middleTime - date * 60 * 60 * 24 - h * 60 * 60) / 60) + '分'
  return `${m}前`
}
export function formatT (str) {
  str = str + '000'
  str = parseInt(str)
  let time = new Date(str)
  let Y = time.getFullYear()
  let M =
    parseInt(time.getMonth()) + 1 > 9
      ? parseInt(time.getMonth()) + 1
      : '0' + (parseInt(time.getMonth()) + 1)
  let D = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
  let t = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
  let m = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
  let s = time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds()
  return `${Y}-${M}-${D} ${t}:${m}:${s}`
}
export function formatTime (str) {
  str = str + '000'
  str = parseInt(str)
  let time = new Date(str)
  let Y = time.getFullYear()
  let M =
    parseInt(time.getMonth()) + 1 > 9
      ? parseInt(time.getMonth()) + 1
      : '0' + (parseInt(time.getMonth()) + 1)
  let D = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
  return `${Y}/${M}/${D}`
}
export function formatHour (str) {
  str = str + '000'
  str = parseInt(str)
  let time = new Date(str)
  let t = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
  let m = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
  return `${t}:${m}`
}

export function dateFtt (fmt, date) {
  // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
