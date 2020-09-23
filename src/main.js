import '@babel/polyfill'
import VueI18n from 'vue-i18n'
import LangEn from './assets/lang/en'
import LangZhCHS from './assets/lang/zhCHS'
import {
  getCookie,
  judgeLanguage
} from '@/utils/auth'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueLazyload from 'vue-lazyload'
import '@/utils/permission'
import native from '@/utils/native'
import { XMplayer } from '@xmly-fem/web-jssdk'
import xss from 'xss'
import mixins from './mixins'
/**
 * @example v-html="$xss(content)"
 */
Object.defineProperty(Vue.prototype, '$xss', {
  value: xss
})
Vue.use(Vant)
Vue.use(VueI18n)
Vue.mixin(mixins)
Vue.config.productionTip = false
Vue.prototype.$getCookie = getCookie
Vue.prototype.XMplayer = XMplayer
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: './loading.gif',
  attempt: 1,
  listenEvents: ['scroll']
})
let i18n = ''
judgeLanguage()
let langChoice = ''
if (window.navigator.userAgent.indexOf('app_ezoo') != -1) {
  LanguageFun(native.getLanguage())
} else {
  langChoice = getCookie('lang') ? getCookie('lang') : 'zhCHS'
  LanguageFun(langChoice)
}
function LanguageFun (langChoice) {
  i18n = new VueI18n({
    locale: langChoice,
    messages: {
      en: LangEn,
      zhCHS: LangZhCHS
    },
    silentTranslationWarn: true
  })
}

new Vue({
  i18n,
  router,
  Vant,
  store,
  data: {
    bus: new Vue()
  },
  render: h => h(App)
}).$mount('#app')
