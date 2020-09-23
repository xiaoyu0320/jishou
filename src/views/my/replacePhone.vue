<template>
  <div class="replacephone layout-child layout-auto">
    <van-nav-bar title="安全中心" left-arrow @click-left="back" />
    <div class="desc">
      绑定手机号，可以使用手机号作为登录账号
    </div>
     <div class="login-content" style="margin-bottom: .4rem;">
      <div class="now bind-phone">
        <div class="title">当前登录账号</div>
        <div class="tel">{{ori}}</div>
      </div>
      <div class="bind-phone">
        <van-field v-model="oricode" center clearable placeholder="请输入短信验证码">
          <template #button>
            <van-button size="small" type="default" @click="forget(0)" :style="smsEnabeld ? '' : 'color:#999;'">{{smsText}}</van-button>
          </template>
        </van-field>
      </div>
    </div>
    <div class="login-content">
      <div class="bind-new bind-phone">
        <van-field v-model="mobile" type="tel" placeholder="请输入新手机号" />
      </div>
      <div class="bind-phone">
        <van-field v-model="code" center clearable placeholder="请输入短信验证码">
          <template #button>
            <van-button size="small" type="default" @click="forget(1)" :style="newSms ? '' : 'color:#999;'">{{newSmsText}}</van-button>
          </template>
        </van-field>
      </div>
    </div>
    <div class="login-bottom">
      <span class="btn pintuan-btn" @click="save">保存</span>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import * as api from '@/api/wallet'
import { editMobile } from '@/api/my'
import { Toast } from 'vant'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      code: '',
      mobile: '',
      smsText: '发送验证码',
      smsEnabeld: true,
      newSms: true,
      ori: '',
      oricode: '',
      newSmsText: '发送验证码'
    }
  },
  created () {
    store.dispatch('setBottomType', 0)
    this.ori = this.userinfo.mobile
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  methods: {
    back () {
      this.$router.back()
    },
    forget (type) {
      if (!this.smsEnabeld && type == 0) {
        return
      }
      if (!this.newSms && type == 1) {
        return
      }
      if (type == 0) {
        this.smsEnabeld = false
      } else {
        if (this.mobile == '') {
          Toast.fail('请输入新手机号')
          return
        }
        this.newSms = false
      }
      let obj = {}
      obj.mobile = type == 0 ? this.ori : this.mobile
      let d = new Date()
      let Base64 = require('js-base64').Base64
      obj.t = Base64.encode(d.getTime())
      api.sendsms(obj).then(res => {
        Toast.success('获取验证码成功')
        let s = 60
        let timer = setInterval(() => {
          if (type == 0) {
            this.smsText = s + '秒后重发'
          } else {
            this.newSmsText = s + '秒后重发'
          }
          s--
          if (s <= 0) {
            clearInterval(timer)
            if (type == 0) {
              this.smsText = '发送验证码'
              this.smsEnabeld = true
            } else {
              this.newSmsText = '发送验证码'
              this.newSms = true
            }
          }
        }, 1000)
      }).catch(() => {
        if (type == 0) {
          this.smsEnabeld = true
        } else {
          this.newSms = true
        }
      })
    },
    save () {
      if (!this.oricode) {
        Toast('请输入现手机验证码')
        return
      }
      if (!this.code) {
        Toast('请输入新手机验证码')
        return
      }
      let obj = {
        mobile: this.mobile,
        ori_code: this.oricode,
        new_code: this.code
      }
      editMobile(obj).then(res => {
        Toast.success('更改成功')
        this.$router.back()
      })
    }
  }
}
</script>
<style scoped lang="scss">
.replacephone {
  .desc{
    padding: .3rem;
    background-color: rgba(255, 152, 0, 0.17);
    color:  rgba(255, 152, 0, 1);
  }
  .login-content {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 0 25px;
    .now{
      display: flex;
      justify-content: space-between;
      padding: .3rem;
      .title{
        color: #999;
      }
    }
    .bind-phone{
      display: flex;
      align-items: center;
      margin-top: 15px;
      border-bottom: 1px solid #e5e5e5;
    }
    input {
      border: none;
      outline: none;
      width: 100%;
      padding: 15px 0;
    }
  }
  .login-bottom {
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-top: 70px;
    .btn {
      color: #fff;
      font-size: 15px;
      padding: 12px 0;
      border-radius: 50px;
      width: 73.5%;
      margin: 0 auto;
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
      span {
        color: #333;
      }
    }
  }
}
.replacephone .heard label:first-child,
.replacephone .heard label:last-child {
  width: 6.5%;
  height: 100%;
  margin: 0 3%;
  display: flex;
  align-items: center;
}
</style>
