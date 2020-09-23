<template>
  <div class="bill common-bg1"
       ref="bodyHeight"
       @touchstart="touchStart($event)"
       @touchmove="touchMove($event)"
       @touchend="touchEnd($event)"
     >

    <van-nav-bar  class="share-bar trbg"
                title="邀请好友"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="download" />
    <div class="container bindbox">
    <div class="avater">
      <van-image width="60" height="60" :src="userinfo.avatar.small_pic" />
    </div>
    <div class="name">{{returnName(userinfo)}} </div>
   <div class="codema" v-if="userinfo.invite_code">邀请码：<label>{{userinfo.invite_code}}</label>
       <span class="copybutton"  @click="getCopy"
        :data-clipboard-text="userinfo.invite_code">复制</span>
      </div>
    <div class="code-position">
      <qrcode-vue v-if="qrcodestatus"
                  :value="invite_url"></qrcode-vue>
    </div>
      <div class="bill__opearte">
      <div class="bill__btn copybutton" size="large" @click="getCopy" :data-clipboard-text="invite_url">{{ $t("message.CopyLink") }}</div>
    </div>
   </div>

  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import Clipboard from 'clipboard'
import { Toast } from 'vant'
import { judgeTerminal } from '@/utils/utils'
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    QrcodeVue
  },
  data () {
    // 这里存放数据
    return {
      timeOutEvent: null,
      account: '',
      invite: false,
      code: this.$route.query.code,
      invite_url: '',
      qrcodestatus: true,
      popupFlag: false,
      dataURL: '',
      actions: [
        {
          name: '保存相册',
          type: 1
        }
      ]
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
    returnName (info) {
      if (info.nickname != '' && info.nickname != null) {
        return info.nickname
      } else {
        return info.mobile_hide
      }
    },
    // 复制
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
    download () {
      let _canvas = this.$refs.bodyHeight // 截图区域
      const width = _canvas.offsetWidth
      const height = _canvas.offsetHeight
      const canvas2 = document.createElement('canvas')
      const scale = 1
      canvas2.width = width
      canvas2.height = height
      // const context1 = canvas2.getContext("2d");
      const opts = {
        scale,
        canvas: canvas2,
        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width,
        height,
        useCORS: true
      }
      window.html2canvas(_canvas, opts).then(canvas => {
        this.dataURL = canvas.toDataURL('image/png')

        if (judgeTerminal() == 'Android') {
          // 安卓情况
          if (window.WebViewJavascriptBridge) {
            window.WebViewJavascriptBridge.saveImage(this.dataURL)
          } else {
            this.popupFlag = false
            Toast.fail('保存失败')
          }
        }
        if (judgeTerminal() == 'Ios') {
          // ios 情况
          if (window.webkit) {
            window.webkit.messageHandlers.saveImage.postMessage({
              content: this.dataURL
            })
          } else {
            this.popupFlag = false
            Toast.fail('保存失败')
          }
        }
      })
    },
    touchStart (e) {
      this.timeOutEvent = setTimeout(() => {
        this.popupFlag = true
        e.preventDefault()
      }, 500)
    },
    touchMove () {
      clearTimeout(this.timeOutEvent)
      this.timeOutEvent = 0
      // e.preventDefault();
    },
    touchEnd () {
      clearTimeout(this.timeOutEvent)
      if (this.timeOutEvent != 0) {
        return false
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    store.dispatch('setBottomType', 0)
    this.invite_url = 'http://lottery.sbaas.shop/#/register?ref=' + this.userinfo.invite_code
  }
}
</script>
<style lang="scss" scoped>
.container {
  margin:0 auto ;
  background: url('~@s/down/bill-bg.png') no-repeat center;
  background-size: cover;
  width: 6.15rem;
  height: 10rem;
  border-radius: .3rem;
  overflow: hidden;
  .avater {
    padding-top: 1rem;
}
  .avater {
    ::v-deep .van-image {
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .name {
    font-size: .28rem;
    font-weight: bold;
    color: #fff;
    margin-top: .2rem;
  }
  .yq_code {
    font-size: .28rem;
    color: #fff;
    font-weight: bold;
    margin-top: .2rem;
    span {
      padding: 2px .1rem;
      border:1px solid #364087 ;
      color: #364087;
      font-size: .24rem;
    }
  }
}
.zone h3 {
  font-family: PingFang-SC-Medium;
  font-size: 0.32rem;
  margin-top: 5px;
  font-weight: normal;
  font-stretch: normal;
  color: #fefefe;
}
.zone p {
  font-family: PingFang-SC-Bold;
  font-size: 0.2rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #0af9fd;
}
.share_title {
  font-family: PingFang-SC-Heavy;
  font-size: 0.96rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #0bf7fd;
  margin-top: 0.45rem;
}
.bill {
  position: relative;
  height: 100vh;
  overflow: auto;
  text-align: center;
}
.bill img {
  max-width: 90%;
  display: block;
  margin: 0 auto;
}
.bill__log {
  text-align: center;
}
.code-position {
  margin: 0.3rem auto 0;
  border-radius: 10px;
}

.code-opeate {
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
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
.item-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: auto;
  z-index: 2500;
}
.item-wrap .item {
  background: #fff;
  width: 100%;
}
.bill__opearte {
  text-align: center;
  color: #fff;
  width: 90%;
  margin: .5rem auto 0;

}
.bill__opearte p {
  font-size: 12px;
}
.share-txt {
  width: 3rem;
  height: 0.5rem;
  line-height: 0.5rem;
  font-family: Alibaba-PuHuiTi-R;
  font-weight: normal;
  font-stretch: normal;
  font-size: 12px;
  letter-spacing: 0px;
  color: #ffffff;
  background-color: #364087;
  border-radius: 0.19rem;
  margin: 0.5rem auto 0;
}
.codema {
  font-size: .24rem;
  color: #fff;
  text-align: center;
  width: 3.18rem;
  height: .62rem;
  line-height: .62rem;
  border-radius: .3rem;
  margin:.3rem auto .5rem;
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
<style>
.code-position canvas {
  width:60% !important;
  height: 60% !important;
  background: #fff;
  border-radius: 3px;
  padding: 0.15rem;
}
</style>
