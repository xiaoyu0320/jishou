<template>
  <div class="register" >
     <div class="logo-style-title">
        欢迎注册
     </div>
    <div class="login-content">
          <div style="margin-top:.5rem"  >
             <label>
                <img src="@s/login/shouji.png" style="width:.4rem" />
              </label>
            <input type="text" v-model="mobile" @input="onIpunt" placeholder="请输入手机号"  />
          </div>
          <div class="po-ref" >
             <label>
              <img src="@s/login/mima.png" style="width:.4rem" />
            </label>
            <input type="password" v-model="password"  placeholder="请输入密码"  />
          <!-- 校验 -->
             <label class="proof" v-show="showFlag">

                <label class="proof-state" style="color:#70bde9;padding-right:.1rem">{{levelTxt}}</label>
                <label class="proof-color" v-html="passwordPower()">
                  <!--1  -->
                </label>
             </label>
          <!-- 校验 -->

          </div>
            <!-- <P class="signtxt">{{signTxt}}</P> -->
          <div>
              <label>
                  <img src="@s/login/mima.png" style="width:.4rem" />
              </label>
              <input type="password" v-model="repassword" placeholder="请再次确认密码"/>
          </div>
          <div>
             <label>
                  <img src="@s/login/yanzhengma.png" style="width:.4rem" />
            </label>
            <input
              type="text"
              v-model="code"
              placeholder="请输入验证码"
            /><van-button
              :disabled="disabled"
              size="small"
              :class="{ disabled: disabled }"
              class="code"
              @click="send()"
              style="margin-top: 0;"
              > {{codeName}}</van-button></div>
          <div>
              <label>
                  <img src="@s/login/yaoqingma.png" style="width:.4rem" />
              </label>
              <input type="text" v-model="ref" placeholder="请输入邀请码"/>
          </div>
          <p v-show ="activeIndex == 1" style="color: #70bde9;font-size: .24rem;margin-top:.2rem">{{$t("message.notes")}}</p>

    </div>
    <div class="login-bottom">
      <!-- <div :class="checked ? 'btn-enable linear-button' : 'btn'" @click="save">
        {{ $t("message.Register") }}</div
      > -->
       <div class="agreements" >

        <van-checkbox v-model="checkeds" shape="square" checked-color="#2fa0ff">我已阅读并了解 <label @click.stop="xieyi">《注册协议》</label> </van-checkbox>
      </div>
      <div class="btn pintuan-btn" @click="save"> 注册</div>

      <div class="agreement" ><a @click="login('/login')">已有账号登录</a>  </div>
      <!-- <a style="padding-left:.2rem" @click="login('/download')">下载App</a> -->
    </div>
  </div>
</template>

<script>
// import { encode } from '@/api/password'
import international from '@/assets/lang/international'
import { register, sendsms, sendisms, sendMailCode } from '@/api/wallet'
import { urlInfo, isWallEtApp, judgeTerminal } from '@/utils/utils'
import { Toast } from 'vant'
import { mapGetters } from 'vuex'
import { setCookie } from '@/common/auth'
export default {
  data () {
    return {
      mobile: '',
      password: '',
      code: '',
      ref: '',
      repassword: '',
      disabled: true,
      codeName: '获取验证码',
      areaList: international,
      showSelect: false,
      areaCode: '+86',
      urlInfos: null,
      tabs: [{
        name: '手机',
        index: 0
      }, {
        name: '邮箱',
        index: 1
      }],
      activeIndex: 0,
      email: '',
      dataList: [ {
        name: '简体中文',
        index: 0,
        lang: 'zhCHS'
      },
      {
        name: 'English',
        index: 1,
        lang: 'en'
      }],
      level: 0,
      levelTxt: '弱',
      signTxt: '至少6位且由字母、数字、符号任意两种组合',
      showFlag: false,
      checkeds: true
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ]),
    checked () {
      if (this.mobile && this.password && this.code && this.ref) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    password (newValue, oldValue) {
      this.showFlag = true
      this.checkStrong(newValue)
    }
  },
  methods: {
    xieyi () {
      this.$router.push({
        path: '/argeement'
      })
    },
    passwordPower () {
      // const light = `<label class='proof-line proof-light'></label>`
      // const grey = `<label class='proof-line proof-grey'></label>`
      // if (this.level == 0) {
      //   return grey + grey + grey + grey
      // }
      // if (this.level == 1) {
      //   return grey + grey + grey + light
      // }
      // if (this.level == 2) {
      //   return grey + grey + light + light
      // }
      // if (this.level == 3) {
      //   return grey + light + light + light
      // }
      // if (this.level == 4) {
      //   return light + light + light + light
      // }
    },
    checkStrong (sValue) {
      var modes = 0
      // 正则表达式验证符合要求的
      this.signTxt = sValue.length + '位字符'
      if (sValue.length <= 0) {
        this.showFlag = false
      }
      if (sValue.length < 6) {
        this.level = 0
        return
      }
      if (/\d/.test(sValue)) modes++ // 数字
      if (/[a-z]/.test(sValue)) modes++ // 小写
      if (/[A-Z]/.test(sValue)) modes++ // 大写
      if (/\W/.test(sValue)) modes++ // 特殊字符
      // 逻辑处理
      switch (modes) {
        case 1:
          this.level = 1
          this.levelTxt = '弱'
          break
        case 2:
          this.level = 2
          this.levelTxt = '中'
          break
        case 3:
          this.level = 3
          this.levelTxt = '强'
          break
        case 4:
          this.level = 4
          this.levelTxt = '强'
          break
          // return sValue.length < 10 ? 3 : 4
      }
      this.passwordPower()
    },
    onDpChange (event) {
      setCookie('lang', event.value.lang)
      this.$i18n.locale = event.value.lang
      // judgeLanguage()
    },
    emailInput (value) {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (reg.test(this.email)) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    changeActive (index) {
      this.activeIndex = index
    },
    onConfirm (value) {
      this.areaCode = value.key
      if (this.mobile.length >= 7) {
        this.disabled = false
      } else {
        this.disabled = true
      }
      this.showSelect = false
    },
    goback () {
      this.$router.back()
    },
    save () {
      // let reg = /^[A-Za-z0-9]{6,32}$/
      // let flag = reg.test(this.password)
      // if (!flag) {
      //   Toast('请输入6-32位密码')
      // }
      let obj = {}
      obj.password = this.password
      obj.code = this.code
      obj.ref = this.ref
      obj.account = this.mobile
      obj.repassword = this.repassword
      register(obj).then(res => {
        if (this.$getCookie('lang') == 'en') {
          Toast.success('login was successful')
        } else {
          Toast.success('注册成功')
        }
        this.$store.commit('SET_INFO', res)
        localStorage['_shop_token'] = res.token
        localStorage['_shop_userId'] = res.uid
        if (!isWallEtApp() && judgeTerminal() == 'Android') {
          this.$router.push({
            path: '/download',
            query: {
              code: res.invite_code
            }
          })
        } else {
          this.$router.push({
            path: '/wallet/index'
          })
        }
      })
      // this.mobile = ''
      // this.code = ''
      // this.password = ''
      if (!this.ref) {
        this.ref = localStorage['ref']
      }
    },
    getEmailCode () {
      let obj = {}
      obj.email = this.email
      this.disabled = true
      sendMailCode(obj).then(res => {
        Toast.success('发送成功')
        let s = 60
        let timer = setInterval(() => {
          this.codeName = s + '秒后重发'
          s--
          if (s <= 0) {
            clearInterval(timer)
            this.codeName = '获取验证码'
            this.disabled = false
          }
        }, 1000)
      })
    },
    getNowtime () {
      var date = new Date()
      var year = date.getFullYear() // 获取当前年份
      var mon = date.getMonth() + 1 // 获取当前月份
      var da = date.getDate() // 获取当前日
      var day = date.getDay() // 获取当前星期几
      var h = date.getHours() // 获取小时
      var m = date.getMinutes() // 获取分钟
      var s = date.getSeconds() // 获取秒
      return (
        year + '/' + mon + '/' + da + '/' + day + ' ' + h + ':' + m + ':' + s
      )
    },
    send () {
      var t = new Date()
      if (this.disabled) return
      let Base64 = require('js-base64').Base64
      let d = new Date()
      let tokens = Base64.encode(d.getHours() + '' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()))
      let tbase64 = Base64.encode(t.getTime())
      this.disabled = true
      if (this.areaCode != '+86') {
        this._sendisms(tokens)
      }
      sendsms({
        mobile: this.mobile,
        tokens: tokens,
        t: tbase64
      }).then(res => {
        Toast.success('发送成功')
      })
      let time = 60
      let timer1 = setInterval(() => {
        time--
        let times = time + 's'
        this.codeName = times
        if (time <= 0) {
          let reg = /^[1][0-9]{10}$/
          let mobile = this.mobile
          if (reg.test(mobile)) {
            this.codeName = '获取验证码'
            this.disabled = false
          } else {
            this.codeName = '获取验证码'
            this.disabled = false
          }

          clearInterval(timer1)
        }
      }, 1000)
    },
    _sendisms (tokens) {
      let mobile = this.areaCode + this.mobile
      sendisms({ mobile: mobile, tokens: tokens }).then(res => {
        Toast.success(res.msg)
      })
      let time = 60
      let timer1 = setInterval(() => {
        time--
        let times = time + 's'
        this.codeName = times
        if (time <= 0) {
          let reg = /^[1][0-9]{10}$/
          let mobile = this.mobile
          if (reg.test(mobile)) {
            this.codeName = 'getcode'
            this.disabled = false
          } else {
            this.codeName = 'getcode'
            this.disabled = false
          }
          clearInterval(timer1)
        }
      }, 1000)
    },
    login (url) {
      this.$router.push({
        path: url
      })
    },
    onIpunt (event) {
      let reg = /^[1][0-9]{10}$/
      let mobile = this.mobile
      if (this.areaCode == '+86') {
        if (reg.test(mobile)) {
          this.disabled = false
          this.mobile = mobile
        } else {
          this.disabled = true
          this.mobile = mobile
        }
      } else {
        if (mobile.length >= 7) {
          this.disabled = false
        } else {
          this.disabled = true
          this.mobile = mobile
        }
      }
    },
    goagree () {
      this.$router.push({
        path: '/argeement'
      })
    }
  },
  created () {
    if (location.href.indexOf('?') != -1) {
      let url = location.href.split('?')[1]
      this.urlInfos = urlInfo(url)
      this.ref = this.urlInfos.ref
    }
  }
}
</script>
<style scoped lang="scss">
.agreements {
 margin-left: 25px;
 margin-top: 25px;
 ::v-deep .van-checkbox__label {
   color: #333;
   label {
     color: #ff8916;
   }
 }
}
.register {
  height: 100vh;
  font-size: 13px;
  overflow: hidden;
  overflow-y: auto;
 .logo-style-title {
   color: #2d2f32;
    font-size: .58rem;
    margin:10% 25px 5%;
  }
  .title-label{
    flex: 1;
    justify-content: center;
    font-size: .34rem;
    color: #fff;
    padding-left: 1rem
  }
  .heard {
    display: flex;
    align-items: center;
    height: 44px;
    label {
      &:first-child {
        height: 100%;
        padding: 0 3%;
        display: flex;
        align-items: center;
      }
    }
  }
  .title {
    margin-top: 20px;
    text-align: left;
    padding-left: 15px;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .login-content {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 0 25px;
    div {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      margin-top: .3rem;
      label {
        img {
          width: 100%;
        }
      }
      .code {
        font-size: .28rem;
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 6px 0;
        border-radius: 12px;
        border: 0;
        text-align: right;
        color: #364087;
        opacity: 1;
      }
    }
    input {
      border: none;
      outline: none;
      width: 100%;
      padding: 15px;
    }
  }
  .login-bottom {
    display: flex;
    flex-direction: column;
    margin-top:.25rem;
    .btn {
      color: #fff;
      font-size:.3rem;
      height: .9rem;
      line-height: .9rem;
      border-radius:.16rem;
      width: 90%;
      margin: 10% auto 0;
      text-align: center;
    }
    .agreement {
      margin-top: 18px;
      margin-left: 25px;
      a {
        font-size: .28rem;
        color: #0d5bc4;
        text-align: left;
      }
      label {
        width: 18px;
        height: 12px;
        padding: 2px;
        margin-right: 10px;
        img {
          width: 100%;
        }
      }
      div {
        color: #3b7eff;
      }
    }
  }
}
.btn-enable {
  color: #fff;
  font-size: 15px;
  padding: 12px 0;
  border-radius: 50px;
  width: 73.5%;
  margin: 0 auto;
}
html {
  font-size: 20px;
}
.register {
  .login-content {
    h4 {
      font-weight: normal;
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
.login-tabs {
    display: flex;
    justify-content: space-between;
    .login-item {
    /* display: flex; */
    flex: 1;
    align-items: center;
    text-align: center;
    font-size: .34rem;
    &:first-child {
       border-right:1px solid #eee
    }
  }
  .active {
    color: #fff
  }
  .proof-state {
    color: #70bde9
  }

}
 .signtxt {
    color: #70bde9;
    font-size: .24rem;
    text-align: right;
    margin-top:2px
  }
  .register .login-content .van-button__content {
    margin-top: 0;
    border-bottom: 0;
  }
</style>
