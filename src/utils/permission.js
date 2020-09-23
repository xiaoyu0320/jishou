import router from '@/router/index'
import store from '@/store/index'
import {
  Toast
} from 'vant'
// import NProgress from 'nprogress' // 页面加载进度条
// import 'nprogress/nprogress.css' // 页面加载进度条样式
import getPageTitle from './get-page-title'

// 实例化nprogress配置
// NProgress.configure({ showSpinner: false })
// 配置白名单
const whiteList = ['/login', '/register', '/my/modifyPassword', '/forgetpassword', '/argeement', '/download']
router.beforeEach(async (to, from, next) => {
  // start progress bar
  // NProgress.start()
  // 设置标题
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否登录
  const token = localStorage['_shop_token']
  // 携带token
  if (token) {
    if (to.path == '/login') {
      // 如果已经登陆过的 直接跳到首页
      next()
      // NProgress.done()
    } else {
      const hasGetUsermobile = store.getters.mobile
      if (hasGetUsermobile) {
        // 如果有用户信息的话就直接走下一步
        next()
      } else {
        // 如果没有用户信息
        try {
          await store.dispatch('getInfo')
          // await store.dispatch('setunit')
          next()
        } catch (error) {
          console.log(error)
          // 删除token且跳转到登陆页重新登录
          await store.dispatch('user/resetToken')
          Toast.fail('登录出错')
          localStorage.clear()
          location.reload()
          next(`/login`)
          // NProgress.done()
        }
      }
    }
  } else {
    // 如果没有token
    if (whiteList.indexOf(to.path) != -1) {
      // 在白名单中直接进入
      next()
    } else {
      // 没有权限的情况下 强制跳回首页 登录后可以跳回原本页面
      next(`/login`)
      // NProgress.done()
    }
  }
})
// router.afterEach(() => {
//   // 完成态 清除顶部进度
//   NProgress.done()
// })
