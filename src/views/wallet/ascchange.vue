<template>
  <div class="bindphone" style="overflow-y: auto;">
    <van-nav-bar title="epc转币" left-arrow @click-left="goback" />

    <!-- <template #right>

      </template> -->
    <div class="bindbox">
      <div class="hint"> 请认真核实对方登录账号，否则资产会丢失 </div>
      <div class="login-content" style="padding-bottom:15px">
        <div>
          <p class="title">对方登录账号</p>
        </div>
        <div class="line" >
          <!-- <van-field
          v-model="pa"
          :border="false"
          type="text"
          placeholder="输入登录手机号"
          @input="input"

        /> -->
          <input  type="text" @input="input"  @blur="changename" placeholder="输入登录手机号" v-model="pa"
             />
            <label class="scan dw" v-if="name">{{name}}</label>
          <!-- <img class="scan" src="@s/wallet/icon_scan@2x.png" width="100%" @click="goscan" v-show="show" /> -->
        </div>

        <div>
          <p class="title"> 转币数量 </p>
          <p class="assets-c1 ">余额 <span class="price">{{yue}}epc</span> <span class="all" @click="all">全部</span></p>
        </div>
        <div class="line bule"><input v-model="money" @input="changeinput" type="number" :placeholder="'最小转币数量1'" /><label class="dw">epc</label>
        </div>
           <div class="info" v-if="fezz!=0">其中已冻结拼团数额{{fezz}}epc</div>
        <!--
        <div><input type="number" placeholder="请输入验证码" v-model="code" />
          <van-button :disabled="disabled" size="small" :class="{ disabled: disabled }" class="code" @click="send()"
            style="margin-top: 0;padding:0">{{ codeName }}</van-button>
        </div> -->

      </div>
      <div class="login-code">
        <div class="login"></div>
      </div>
      <div class="login-content ">
        <div>
          <p class="title">交易密码</p>
        </div>
        <div class="line"><input type="password" placeholder="请输入交易密码" v-model="password" /></div>
      </div>

    </div>
     <div class="login-bottom">
        <van-button class="btn pintuan-btn" :disabled="clickabled"  @click="ascpay" type="large">确认 </van-button>
      </div>
  </div>
</template>

<script>
import * as api from '@/api/wallet'
import { Toast, Dialog } from 'vant'
import { decodeStr, judgeTerminal } from '@/utils/utils.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      pa: '',
      money: '',
      account: this.$route.query.account,
      contract: this.$route.query.contract,
      symbol: 'epc',
      password: '',
      Status: false,
      gas: 1.00000,
      scanresult: '',
      code: '',
      codeName: '获取验证码',
      disabled: false,
      yue: '',
      show: false,
      name: '',
      fezz: 0,
      asc: 0,
      clickabled: false
    }
  },
  created () {
    if (judgeTerminal() == 'Android') {
      this.show = true
    }
    this.$store.dispatch('setBottomType', 0)
    this.getinfo()
  },
  mounted () {
    this.money = this.$route.query.transmoney
    window.scanResult = this.getscan
    window.scanokjs = this.scanokjs
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  methods: {
    changename () {
      api.getNickname({ mobile: this.pa }).then(res => {
        if (res.data.nickname && res.data.nickname != null) {
          this.name = res.data.nickname
        } else {
          this.name = ''
        }
      })
    },
    all () {
      this.money = this.asc
    },
    getinfo () {
      api.assetsinfo({}).then(res => {
        this.yue = res.data.asc.coin
        this.fezz = res.data.asc.freeze_asc
        this.asc = res.data.asc.asc
      })
    },
    ascpay () {
      if (this.money < 1) {
        Toast.fail('输入数量必须大于1')
        return false
      }
      if (this.userinfo.is_paypwd == 0) {
        Dialog.confirm({
          title: '交易密码',
          message: '是否前往设置交易密码'
        })
          .then(() => {
            this.$router.push({
              path: '/my/modifyPayPassword'
            })
          })
          .catch(() => {
            // on cancel
          })
      }
      if (this.clickabled) {
        return
      }
      this.clickabled = true
      let obj = {}
      obj.mobile = this.pa
      obj.transfer_num = this.money
      obj.pay_pwd = this.password
      api.transferPost(obj).then(res => {
        this.$router.back()
        Toast.success(res.msg)
      }).catch(() => {
        this.clickabled = false
      })
    },
    send () {
      if (this.userinfo.mobile) {
        var t = new Date()
        if (this.disabled) return
        let Base64 = require('js-base64').Base64
        let d = new Date()
        let tokens = Base64.encode(d.getHours() + '' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()))
        let tbase64 = Base64.encode(t.getTime())
        this.disabled = true
        api.sendsms({
          mobile: this.userinfo.mobile,
          tokens: tokens,
          t: tbase64
        }).then(res => {
          if (res.status == 200) {
            Toast.success('发送成功')
          } else {
            Toast(res.msg)
          }
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
              if (this.$getCookie('lang') == 'en') {
                this.codeName = 'Get Code'
              } else {
                this.codeName = '获取验证码'
              }

              this.disabled = false
            } else {
              if (this.$getCookie('lang') == 'en') {
                this.codeName = 'Get Code'
              } else {
                this.codeName = '获取验证码'
              }
              this.disabled = false
            }

            clearInterval(timer1)
          }
        }, 1000)
      }
    },
    goscan () {
      if (judgeTerminal() == 'Ios') {
        window.webkit.messageHandlers.scan.postMessage('')
      }
      if (judgeTerminal() == 'Android') {
        window.WebViewJavascriptBridge.scan('')
      }
    },
    getscan (str) {
      this.scanresult = decodeStr(str)
      this.pa = this.scanresult.addr
      this.money = this.scanresult.money
    },
    input () {
      this.pa = this.pa.trim()
    },
    changeinput () {
      if (this.money < 0) {
        this.money = 0
      }
    },
    scanokjs (str) {
      this.pa = str
    },
    goback () {
      this.$router.replace({
        path: '/wallet/index'
      })
    }
  },
  components: {}
}
</script>
<style scoped lang="scss">
.bindbox {
  margin:.2rem .3rem .3rem ;
  background: #fff;
  padding: 0.4rem .2rem;
  box-shadow: none;
}
.bindphone {
  text-align: center;
  ::v-deep  input:disabled{
   background-color:none!important
  }
  .heard {
    font-size: 17px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
  }
  .login-content {
    text-align: left;
    display: flex;
    flex-direction: column;
    font-size: 0.28rem;
    div {
      display: flex;
      align-items: center;
      margin-top: 15px;
      position: relative;
      .scan {
        position: absolute;
        right: 0.2rem;
        width: 0.34rem;
        top: 30px;
      }
      .assets-c1 {
        font-size: 0.24rem;
        label {
          color: #8d92a1;
        }
        .price {
          color: #222222;
          font-weight: bold;
        }
        .all {
          color: #2c5bf5;
        }
      }
      .title {
        color: #68717c;
        font-size: 0.28rem;
      }
      label {
        width: 6%;
        img {
          width: 100%;
        }
      }
      .code {
        background: #f5f5f5;
        font-size: 12px;
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 0;
        border-radius: 12px;
      }
    }

    .bule {
      color: #222222;
      font-size: 0.32rem;
      font-weight: bold;
    }
    div {
      font-size: 12px;
      color: #999;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;

      ::v-deep .van-cell{
        padding: 15px 0;
        color: #222;
        font-weight: bold;
        box-shadow: 0px 9px 29px 0px rgba(11,92,215, 0.1);
        background: #fff;
        padding-left: .3rem;
        border-radius: .2rem;
      }
      label {
        color: #333;
      }
    }
    input {
      border: none;
      outline: none;
      width:100%;
      padding: 15px 0;
      height: 1.08rem;
      min-height: 0.88rem;
      font-size: 0.28rem;
      color: #222;
      font-weight: bold;
      box-shadow: 0px 9px 29px 0px rgba(11,92,215, 0.1);
      background: #fff;
      padding-left: .3rem;
      border-radius: .2rem;
    }
    .dw {
      position: absolute;
      right: .8rem;
    }
  }
  .login-bottom {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
     width: 90%;
     margin: 0 auto;
    .btn {
      color: #fff;
      font-size: 0.3rem;
      width: 100%;
      border: 0;
      border-radius: 4px;
    }
    .agreement {
      margin-top: 18px;
      font-size: 12px;
      color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
      label {
        background: #f49b0a;
        border-radius: 50%;
        width: 11px;
        height: 11px;
        padding: 2px;
        margin-right: 10px;
        img {
          width: 100%;
        }
      }
      div {
        color: #333;
      }
    }
  }
}
.bindphone .heard label:first-child,
.bindphone .heard label:last-child {
  width: 6.5%;
  height: 100%;
  padding: 0 3%;
  display: flex;
  align-items: center;
}
.hint {
  text-align: left;
  color: #ff9018;
  font-size: 0.24rem;
  line-height: 0.57rem;
  height: .57rem;
  padding: 0 0.3rem;
  background-color: #f8f8f9;
  border-radius: 0.3rem;
}
input::-webkit-input-placeholder {
  color: #cbcdd2;
  font-size: 0.28rem;
}
.assets-c1 {
  font-size: 0.28rem;
  color: #3d424e;
}
.traserfr {
  border-top: 10px solid rgb(245, 245, 245);
  div {
    margin-bottom: 0.3rem;
    p {
      font-size: 0.28rem;
      color: #3d424e;
    }
  }
}
</style>
<style>
.login-content .van-button__text {
  margin-top: 0 !important;
}
</style>
