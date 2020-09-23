import axios from 'axios'
import { stringify } from 'qs'
import { Base64 } from 'js-base64'
import md5 from 'js-md5'
import CryptoJS from 'crypto-js'
import { getUrl } from './server'

export function getData (url, data) {
  localStorage.setItem('_bb_date', '1')
  return axios.post(url, stringify(data)).then(res => {
    return Promise.resolve(res.data)
  })
}

export function gettime () {
  const url = getUrl() + 'user/gettime'
  const data = {}
  return getData(url, data)
}

export function encode () {
  return gettime().then(res => {
    let serverTime = res + '000'
    let str = getTimeToken(serverTime)
    let mid = Base64.encode(str)
    let front = makeid(7)
    let key = md5(str)
    if (typeof localStorage['_shop_token'] == 'undefined') {
      localStorage['_linkb_isright'] = false
      return false
    }
    key = getAesString(
      key,
      localStorage['_shop_token'],
      localStorage['_shop_token']
    )
    let end = Base64.encode(makeid2(1) + key + '=')
    let token = front + mid + end
    return Promise.resolve(token)
  })
}

function getTimeToken (str) {
  let date = new Date(parseInt(str))
  let Y = date.getFullYear()
  let H =
    date.getMonth() + 1 >= 10
      ? date.getMonth() + 1
      : '0' + (date.getMonth() + 1)
  let D = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
  let h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  let m = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  let s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  date = Y + '-' + H + '-' + D + ' ' + h + ':' + m + ':' + s
  return localStorage['_shop_token'] + date
}

function makeid (num) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  for (var i = 0; i < num; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
function makeid2 (num) {
  var text = ''
  var possible = 'abcdefghijklmnopqrstuvwxyz'

  for (var i = 0; i < num; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function getAesString (data, key, iv) {
  let keys = CryptoJS.enc.Hex.parse(key)
  let ivs = CryptoJS.enc.Hex.parse(iv)
  let encrypted = CryptoJS.AES.encrypt(data, keys, {
    iv: ivs,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return encrypted.toString()
}
