import setting from '@/utils/native'
import routers from '@/router/index'
/**
 *  判断是不是一个空对象
 *  @param {Object} e 对象 数组和object都可以
 *  @return {Boolean} true表示是一个空数组
 */
const isEmptyObject = e => {
  // 如果不是对象类型
  for (let t in e) {
    return false
  }
  return true
}
/**
 *  深度遍历指定对象key
 * @param {Object} item 对象内容
 * @param {String} _key 键值
 */
const deepKeys = function (item, _key) {
  // todo 单纯为了遍历是否本来就有这个值 防止遍历太深
  for (const iterator in item) {
    if (iterator == _key) {
      return item[_key]
    }
  }
  for (const iterator in item) {
    if (typeof item[iterator] != 'object' || item[iterator] == null) {
      // 如果不是对象的话就直接遍历属性 还要对null的情况做额外处理
      if (iterator == _key) {
        return item[_key]
      }
    } else {
      // 如果不是空数组的话 就递归
      if (!isEmptyObject(item[iterator])) {
        return deepKeys(item[iterator], _key)
      }
    }
  }
}
// 地址隐藏
export const maskAddress = (addr) => {
  if (addr.length > 8) {
    return addr.substr(0, 8) + '...' + addr.substr(-8)
  } else {
    return addr
  }
}
// 数组去重
export const UniqueArr = (arr, _key) => {
  // 如果是一个空数组的话 直接把空数组return回去
  if (arr.length == 0) {
    return arr
  }
  const newArr = [] // 用一个新数组用来存放
  newArr.push(arr[0])
  for (var i = 0; i < arr.length; i++) {
    let repeat = false
    // 深度遍历
    for (var k = 0; k < newArr.length; k++) {
      // 如果两个相同的话 则表示是有重复 有重复开关就打开 不进行赋值
      if (deepKeys(newArr[k], _key) == deepKeys(arr[i], _key)) {
        repeat = true
        break
      }
    }
    if (!repeat) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

// 数组去重
export const ascUniqueArr = arr => {
  if (arr.length == 0) {
    return arr
  }
  const newArr = [] // 用一个新数组用来存放
  newArr.push(arr[0])
  for (var i = 0; i < arr.length; i++) {
    // 深度遍历
    for (var k = 0; k < newArr.length; k++) {
      if (newArr[k].action_trace.trx_id != arr[i].action_trace.trx_id) {
        newArr.push(arr[i])
        break
      }
    }
  }
  return newArr
}
// 判断ios和安卓
export const judgeTerminal = () => {
  const useragent = navigator.userAgent
  if (useragent.indexOf('Android') > -1 || useragent.indexOf('Linux') > -1) {
    return 'Android'
  }
  if (useragent.indexOf('iPhone' > -1)) {
    return 'Ios'
  }
}
// 判断是否是微信端
export const isWeiXin = () => {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true // 是微信端
  } else {
    return false
  }
}

// 扫码
/**
 * 返回需要返回的扫码内容
 * @return Obj {name:'',content:''} content为接收内容
 */

// ethereum:0x6Dd23EbDeC30040731E71a5981931d17DA817E8b?decimal=18&value=100000000000000000000'

export const returnValue = str => {
  if (!str) return
  let obj = {}
  if (str.indexOf('?') != -1) {
    let prefix = str.split('?')
    let regDecimal = '(^|&)decimal=([^&]*)(&|$)'
    let regValue = '(^|&)value=([^&]*)(&|$)'
    let prefixKey = prefix[0].split(':') // 取得分号前后的内容
    if (prefixKey[1].slice(0, 2).indexOf('0x') == -1) {
      prefixKey[1] = '0x' + prefixKey[1]
    }
    obj.name = prefixKey[0]
    obj.content = prefixKey[1]
    obj.decimal = prefix[1].match(regDecimal)[2]
    obj.value = prefix[1].match(regValue)[2]
  } else {
    if (str.slice(0, 2).indexOf('0x') == -1) {
      if (str.length > 12) {
        obj.content = '0x' + str
      } else {
        obj.content = str
      }
    } else {
      obj.content = str
    }
  }
  return obj
}

export const decodeStr = str => {
  // let str = 'ethereum:0x27A8a05dC7b24e5B44c4341b899593751E2461f3?contractAddress=0xb9feb10ec48f1377e3232504c8d55d8b829e7925&decimal=18&value=100000000000000000000'
  // // let str = '0x27A8a05dC7b24e5B44c4341b899593751E2461f3'
  // // let str= 'eos:ascchainston?contractAddress=EOS%40eosio.token&decimal=0&value=123'
  str = decodeURI(str)
  let res = {}
  if (str.indexOf('?') != -1) {
    let strArr = str.split('?')
    let coinType = strArr[0].split(':')[0]
    let addr = strArr[0].split(':')[1]
    if (addr.slice(0, 2).indexOf('0x') == -1 && coinType == 'ethereum') {
      addr = '0x' + addr
    }
    let paramArr = urlInfo(strArr[1])
    paramArr['addr'] = addr
    paramArr['coinType'] = coinType
    paramArr['money'] = paramArr['value'] / Math.pow(10, paramArr['decimal'])
    res = paramArr
  } else {
    if (str.length == 40 && str.slice(0, 2).indexOf('0x') == -1) {
      str = '0x' + str
      res.addr = str
    } else {
      res.addr = str
    }
  }

  return res
}

export const urlInfo = (str) => {
  if (str == undefined) {
    return
  }
  let arr = str.split('&')
  let obj = {}
  let newArr = []
  arr.map(value => {
    newArr = value.split('=')
    if (newArr[0] != undefined) {
      obj[newArr[0]] = newArr[1]
    }
  })
  return obj
}

export const isWallEtApp = () => {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.indexOf('app_ezoo') > -1) {
    return true
  } else {
    return false
  }
}

// 判断是否有小数点
export const isDot = (num) => {
  var result = (num.toString()).indexOf('.')
  if (result != -1) {
    return true
  } else {
    return false
  }
}

// 是否存在与app
// export const isapp = (fn) => {
//   if (window.navigator.userAgent.indexOf ('app_ezoo') != -1) {
//     fn()
//   }
// }
// deepClone
export const deepClone = (source) => {
  const targetObj = source.constructor === Array ? [] : {} // 判断复制的目标是数组还是对象
  for (let keys in source) { // 遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else { // 如果不是，就直接赋值
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

export const golinks = (item) => {
  if (window.navigator.userAgent.indexOf('app_ezoo') != -1) {
    setting.reLaunch(item.link)
  } else {
    routers.push({
      path: item.link
    })
  }
}
// json object translate & Splicing
export const urlEncode = function (param, key, encode) {
  if (param == null) return ''
  var paramStr = ''
  var t = typeof (param)
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}
// for base64
export const encode = function (str) {
  // Encoding strings
  var encode = encodeURI(str)
  // translate base64
  var base64 = btoa(encode)
  return base64
}
// 小数点保留位数
export const formatDecimal = function (num, decimal) {
  let re = /^[0-9]*[1-9][0-9]*$/
  if (!re.test(Number(num))) {
    num = num.toString()
    let index = num.indexOf('.')
    if (index !== -1) {
      num = num.substring(0, decimal + index + 1)
    } else {
      num = num.substring(0)
    }
    return parseFloat(num).toFixed(decimal)
  } else {
    return num
  }
}

// 本地存储
export const Save = {
  // 设置值
  set: function (key, value) {
    if (typeof (value) == 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  },
  // 取出值
  get: function (key) {
    let value = localStorage.getItem(key) || ''
    try {
      JSON.parse(value)
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  },
  // 取出值
  remove: function (key) {
    return localStorage.removeItem(key)
  },
  // 清除本地存储
  clear: function () {
    localStorage.clear()
  }

}
/**
 * 函数防抖
 */
export function debounce (fn, delay) {
  // 记录上一次的延时器
  let timer = null
  delay = delay || 200
  return function () {
    let args = arguments
    let that = this
    // 清除上一次延时器
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}
