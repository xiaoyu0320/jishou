/**
 * 内部android native桥接 有返回值的均用promise调用 无返回值的 直接调用
 * @author huang
 */
class Native {
  // 获取极光推送的registrationId
  getIdentity () {
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.getIdentity && typeof (window.WebViewJavascriptBridge.getIdentity) == 'function') {
      return window.WebViewJavascriptBridge.getIdentity('')
    }
  }
  // 检查版本更新
  checkVersion () {
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.checkVersion && typeof (window.WebViewJavascriptBridge.checkVersion) == 'function') {
      window.WebViewJavascriptBridge.checkVersion()
    }
  }
  // 扫码功能
  scan () {
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.scan && typeof (window.WebViewJavascriptBridge.scan) == 'function') {
      window.WebViewJavascriptBridge.scan()
    }
  }
  // 保存图片
  saveImage (base64) {
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.saveImage && typeof (window.WebViewJavascriptBridge.saveImage) == 'function') {
      window.WebViewJavascriptBridge.saveImage(base64)
    }
  }
  // 获取版本号
  getAppVersion () {
    return new Promise((resolve, reject) => {
      if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.getAppVersion && typeof (window.WebViewJavascriptBridge.getAppVersion) == 'function') {
        const data = window.WebViewJavascriptBridge.getAppVersion()
        resolve(data)
      } else {
        reject(new Error('获取版本号出错'))
      }
    })
  }
  // 下载app
  download () {
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.download && typeof (window.WebViewJavascriptBridge.download) == 'function') {
      window.WebViewJavascriptBridge.download()
    }
  }
  // setLanguage
  setLanguage (str) {
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.setLanguage && typeof (window.WebViewJavascriptBridge.setLanguage) == 'function') {
      window.WebViewJavascriptBridge.setLanguage(str)
    }
  }
  getLanguage () {
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.getLanguage && typeof (window.WebViewJavascriptBridge.getLanguage) == 'function') {
      return window.WebViewJavascriptBridge.getLanguage()
    } else {
      return 'zhCHS'
    }
  }
  // registerId
  reLaunch (url) {
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.reLaunch && typeof (window.WebViewJavascriptBridge.reLaunch) == 'function') {
      return window.WebViewJavascriptBridge.reLaunch(JSON.stringify({
        route: url
      }))
    }
  }
  // exitApp
  exitApp (url) {
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.exitApp && typeof (window.WebViewJavascriptBridge.exitApp) == 'function') {
      return window.WebViewJavascriptBridge.exitApp()
    }
  }
  // newWebTab
  newWebTab (url, num) {
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.newWebTab && typeof (window.WebViewJavascriptBridge.newWebTab) == 'function') {
      return window.WebViewJavascriptBridge.newWebTab(url, num)
    }
  }
}
export default new Native()
