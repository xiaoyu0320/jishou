<template>
  <div class="down" ref="bodyHeight"  >
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #right>
         <span @click="goresiter" v-if="info.invite_code">立刻注册账号</span>
      </template>
     </van-nav-bar>
    <div>

    <div class="main">
      <div class="logo">
        <div class="avaer down__logo" v-if="info.avatar.small_pic">
            <van-image  :src="info.avatar.small_pic" />
        </div>
        <div class="down__logo" v-else>
          <img src="@s/login/logo.png" />
        </div>
      </div>
      <div class="codema" v-if="info.invite_code">邀请码：<label>{{info.invite_code}}</label> <span class="copybutton"  @click="getCopy" :data-clipboard-text="info.invite_code">复制</span></div>
      <div class="down__btn--box">
        <button class="down__btn IOS"
                style="margin-top:1.2rem"
                @click="ios()">
          <img src="@s/down/down-iphone.png" />
          {{ $t("message.IOSDownload") }}
        </button>
        <button class="down__btn"
                @click="down()"
                style="margin-top:25px;border-color:#fff;color:#fff">
          <img src="@s/down/down-az.png" />
          {{ $t("message.AndroidDownload") }}
        </button>
      </div>
      <div class="bill__opearte">
        <van-button class="linear-button bill__btn bill__copy--btn copybutton"
                    size="small"
                    @click="getCopy"
                    :data-clipboard-text="copyUrl">{{ $t("message.Copydownloadaddress") }}</van-button>
      </div>
    </div>
      <div class="lead"
           v-if="wxStatus"
           @click="wxStatus = false"></div>
      <div class="mask"
           v-if="wxStatus"
           @click="wxStatus = false"></div>
      <van-popup v-model="show" position="top" :style="{ height: '100%' }" >
        <iosleader @callback="close"></iosleader>
      </van-popup>

    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import { judgeTerminal, isWeiXin } from '@/utils/utils.js'
import { Toast } from 'vant'
import store from '@/store'
import { mapGetters } from 'vuex'
import iosleader from '@c/iosleader'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iosleader },
  data () {
    // 这里存放数据
    return {
      copyUrl: '',
      wxStatus: false,
      code: this.$route.query.code,
      show: false,
      info: {
        avatar: {
          small_pic: ''
        },
        invite_code: ''
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['userinfo'])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    goresiter () {
      this.$router.push({
        path: '/register',
        query: {
          ref: this.info.invite_code
        }
      })
    },
    close (val) {
      this.show = val
    },
    _isMobile () {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    },
    onClickLeft () {
      this.$router.back()
    },
    getCopy () {
      let clipboard = new Clipboard('.copybutton')

      clipboard.on('success', () => {
        Toast.success('已复制')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        // 不支持复制
        Toast.fail('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    down () {
      if (this._isMobile()) {
        this.wxStatus = isWeiXin()
        if (!this.wxStatus) {
          if (judgeTerminal() == 'Android') {
            if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.downloadApk && typeof (window.WebViewJavascriptBridge.downloadApk) == 'function') {
              window.WebViewJavascriptBridge.downloadApk('http://lottery.sbaas.shop/download/app.apk')
            } else {
              window.location.href =
                // 'https://wallet.ascchain.com/download/ascwallet.apk'
                'http://lottery.sbaas.shop/download/app.apk'
            }
          } else {
            Toast('该手机不支持安卓下载')
          }
        }
      } else {
        window.location.href = 'http://lottery.sbaas.shop/download/app.apk'
        // window.location.href = 'https://wallet.ascchain.com/download/ascwallet.apk'
      }
    },
    adddom () {
      var dw = document.createElement('script')
      dw.src = 'https://sc.dierna.com/ipm.js?436394834907889664'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(dw, s)
    },
    ios () {
      if (this._isMobile()) {
        this.wxStatus = isWeiXin()
        if (!this.wxStatus) {
          if (judgeTerminal() == 'Ios') {
            this.show = true
          } else {
            Toast('该手机不支持ios下载')
          }
        }
      } else {
        window.location.href = '/download/app.mobileconfig'
      }
    }
  },
  created () {
    if (this.userinfo.invite_code) {
      this.info = this.userinfo
    }
    this.adddom()
    store.dispatch('setBottomType', 0)
    this.copyUrl = 'http://lottery.sbaas.shop/#/download?code=' + this.code
  },
  mounted () {
    this.$refs.bodyHeight.height = window.innerHeight + 'px'
  }
}
</script>
<style lang="scss" scoped>
.main {
  background: url('~@s/down/bg.png') no-repeat center;
  background-size:cover ;
  margin: 8%;
  height: 11.26rem;
  border-radius: .2rem;
}

.mask {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.logo {
  padding-top: 30%;
}
.lead {
  position: absolute;
  z-index: 99;
  top: 0;
  display: flex;
  justify-content: flex-end;
}
.lead img {
  width: 60%;
}
.down {
  height: 100vh;
}
.down__logo {
  width: 2rem;
  padding: 20px 0;
  margin: 0 auto ;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0px 8px 32px 0px rgba(46, 78, 148, 0.18);
}
.down__logo img {
  width: 1.18rem;
  margin: 0 auto;
  display: block;
}
.avaer {
  box-shadow: none;
  background: none;
  width: 1.67rem;
  height: 1.68rem;
   border-radius: 50%;
   overflow: hidden;
   padding: 0;
  ::v-deep .van-image {
    width: 100%;
    height: 100%;
  }
}
.down__btn {
  color: #fff;
  border-radius: .18rem;
  padding: 10px 20px;
  border: 1px solid #fff;
  background: transparent;
  display: block;
  width:3.75rem;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  font-size: 0.28rem;
}
.down__btn img {
  margin-right: 10px;
  width: 20px;
}
.IOS {
  background: #fff;
  color: #1775e1;
  border: 0;
}
.share-bar {
  background: transparent;
}
.share-bar .van-nav-bar__title,
.share-bar .van-nav-bar__text {
  color: #fff;
}
.van-nav-bar .van-icon {
  color: #fff !important;
}
.van-hairline--bottom::after {
  border-width: 0;
}
.bill__opearte {
  text-align: center;
  margin-top: 10%;
  color: #fff;
}
.bill__copy--btn {
  padding: 0px 20px !important;
  border: 0px;
  color: #fff !important;
  background: none;
  font-size: .24rem;
}
.lead {
  background: url(../../assets/down/lead.png) no-repeat top right;
  background-size: 60% 50%;
  width: 100%;
  height: 100%;
}
.codema {
  font-size: .24rem;
  color: #fff;
  text-align: center;
  width: 3.18rem;
  height: .62rem;
  line-height: .62rem;
  border-radius: .3rem;
  margin:.3rem auto 0;
  border:1px solid #fe8f38;
  position: relative;
  overflow: hidden;
  padding-right: 1rem;
  label {
     font-weight: bold;
  }
  span {
   width: 1rem;
    height: 100%;
    font-size: 0.24rem;
    position: absolute;
    right: 0;
    text-align: center;
    background: #fe8f38;
  }
}
</style>
