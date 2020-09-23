import axios from 'axios'
import {
  stringify
} from 'qs'
import {
  Toast
} from 'vant'
import store from '@/store'
import router from '@/router/index'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.crossDomain = true
// axios.defaults.withCredentials = true

axios.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code == 200) {
      return res
    } else {
      // 错误信息
      if ((res.code && res.code == 400) || (res.status && res.status == 400) || (res.code && res.code == 500) || (res.status && res.status == 500)) {
        Toast.fail(res.msg)
        return Promise.reject(res)
      }
    }
    if (res.msg) {
      if (res.msg.indexOf('重新登录') > -1) {
        resetlogin()
      }
    }
    return response
  }, error => {
    setTimeout(() => {
      Toast.clear()
    }, 1500)
    Toast.fail('网络缓慢请求中！')
    return Promise.reject(error)
  }
)
export function getData (url, data) {
  // 走token的接口
  if (data.uid || data.user_id) {
    data.token = localStorage['_shop_token']
    localStorage.setItem('_shop_ftoken', data.token)
    return axios.post(url, stringify(data)).then(res => {
      return Promise.resolve(res)
    })
  } else {
    // 不走token的接口
    // data.uid ='d4f0670b8926ffa8761a23534cc11876'
    data.uid = localStorage['_shop_userId']
    data.token = localStorage['_shop_token']
    return axios.post(url, stringify(data)).then(res => {
      return Promise.resolve(res)
    })
  }
}
export function axiosGet (url, data) {
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}
export function gettData (url, data) {
  // 走token的接口
  return axios.post(url, stringify(data)).then(res => {
    return Promise.resolve(res.data)
  })
}
export function resetlogin () {
  // window.location.href = 'https://wallet.ascchain.com/#/login' + '?time=' + ((new Date()).getTime())
  Toast.clear()
  localStorage.clear()
  store.dispatch('logout')
  location.reload()
  router.push({
    path: '/login'
  })
}
export const getUrl = () => {
  return window.g.apiurl
}
export function get (urls, obj) {
  const url = getUrl() + urls
  const data = obj
  return getData(url, data)
}
export function getAdanos (url) {
  const urls = window.g.apiASC + url
  return axiosGet(urls)
}
export function gett (urls, obj) {
  const url = getUrl() + urls
  const data = obj
  return gettData(url, data)
}
