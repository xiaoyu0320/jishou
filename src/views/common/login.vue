<template>
  <div class="login">
    <div class="logo-style">
       <img src="@s/login/logo.png" style="width:.72rem;height:.89rem;margin-right:.2rem">
        <img src="@s/grab/ziti.png" style="width:.1.42rem;height:.34rem">
      <h3>登录账号</h3>
    </div>
    <div class="login-content">
      <!-- phone -->
      <div class="line">
         <label>
          <img src="@s/login/shouji.png" style="width:.4rem" />
        </label>
        <input type="text" :placeholder="$t('message.Pleaseenteryourphonenumber')" v-model="phone" @input="cancel" @focus="open"  />
         <div class="dropmenu" v-show="show">
            <div class="item" v-for="(item,i) in loginList"  :key ="i" @click="choice(item)">{{item.phone}}</div>
        </div>
      </div>

      <!-- password -->
      <div class="line">
        <label>
          <img src="@s/login/mima.png" style="width:.4rem" />
        </label>
        <input
          type="password"
          :placeholder="$t('message.Pleaseenterthepassword')"
          v-model="password"
          @keydown="submit($event)"
        />
      </div>
      <!-- code -->
    </div>
    <div class="login-bottom">
      <div class="btn pintuan-btn" @click="_login">
         登录
      </div>
       <div class="login__account">
        <a @click="goforget" >忘记密码</a>
        <a @click="goregister('/register')" style="padding-left:.2rem">注册新账号</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { Save } from '@/utils/utils'
// import { ECPair, payments } from 'bitcoinjs-lib'
// import { bip32 } from "bip32";
// const wif = require("wif");
export default {
  data () {
    return {
      phone: '',
      password: '',
      Graphic: '',
      codeUrl: window.g.apiurl + 'user/getCaptcha',
      changeUrl: '',
      worngTime: null,
      ss: '',
      loginList: [],
      show: false
    }
  },
  created () {
    if (Save.get('loginList').length > 0) {
      this.loginList = Save.get('loginList')
    }

    if (localStorage['_shop_userId']) {
      this.$router.replace({
        path: '/wallet/index'
      })
    }
  },
  methods: {
    cancel () {
      if (this.loginList.length > 0) {
        this.phone.length > 0 ? this.show = false : this.show = true
      }
    },
    choice (item) {
      this.phone = item.phone
      this.password = item.password
      this.show = false
    },
    open () {
      if (this.loginList.length > 0) {
        this.show = true
      }
    },
    submit (e) {
      if (e.keyCode == 13) {
        this._login()
      }
    },
    goregister (url) {
      this.$router.push({
        path: url
      })
    },
    goforget () {
      this.$router.push({
        path: '/my/modifyPassword',
        query: {
          type: 1
        }
      })
    },
    unique (arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].phone == arr[j].phone) {
            arr.splice(j, 1)
            // 因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
            j--
          }
        }
      }
      return arr
    },
    _login () {
      // let reg = /^[A-Za-z0-9]{6,32}$/
      // let flag = reg.test(this.password)
      if (!this.phone) {
        Toast('请输入手机号码')
        return
      }
      if (!this.password) {
        Toast('请输入登录密码')
        return
      }
      if (this.password.length < 6) {
        Toast('密码不能小于6位数')
        return
      }
      // const keyPair = ECPair.makeRandom()
      // const wif = keyPair.toWIF()
      // const { address } = payments.p2pkh({ pubkey: keyPair.publicKey })
      Toast.loading({
        mask: true,
        message: '登录中...',
        duration: 0
      })
      let obj = {}
      obj.account = this.phone
      obj.password = this.password

      this.$store.dispatch('gologin', obj).then(res => {
        Toast.clear()
        if (!Save.get('loginList')) {
          let arr = []
          arr.push({
            phone: this.phone,
            password: this.password
          })
          Save.set('loginList', arr)
        } else {
          let arr = Save.get('loginList')
          arr.push({
            phone: this.phone,
            password: this.password
          })
          Save.set('loginList', this.unique(arr))
        }
        localStorage.setItem('_shop_userId', res.uid)
        localStorage.setItem('_shop_token', res.token)

        Toast.success('登录成功')
        this.$router.push({
          path: '/'
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.login {
  height: 100vh;
  overflow: hidden;
  background: url('~@s/login/login-bg.png') no-repeat;
  background-size: 100% 3.5rem;
  .pref{
    position: relative;
  }
  text-align: center;
  .logo-style {
    margin: 5%  0 30%;
    border-radius: 50%;
    text-align: left;
    padding-left: 10%;
    h3 {
      color: #333333;
      font-size: .52rem;
      margin-top:.2rem;
      color: #fff;
      font-weight: normal;
    }
  }
  .title {
    text-align: left;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .login-content {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 0 10%;
    position: relative;
    div {
      display: flex;
      align-items: center;
      margin-top: .3rem;
      color: #222;
      label {
        color: #507ef2;
        img {
          width: 100%;
        }
      }
    }
    .dropmenu {
        background-color: #fff;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        margin-top:0;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        position: absolute;
        top: 1rem;
        width: 100%;
        .item {
            margin-top:0;
            padding: 12px 16px
        }
    }
    .login-code {
      margin-top: 0;
      position: absolute;
      right: 0;
      img {
        width: 2.5rem
      }
    }
    div {
      font-size: 12px;
      color: #999;
      label {
        color: #333;
      }
    }
    input {
      font-size:.28rem;
      outline: none;
      width: 100%;
      padding: 15px 0;
      color: #222;
    }
  }
  .login-bottom {
    display: flex;
    flex-direction: column;
    .btn {
      color: #fff;
      font-size:.3rem;
      height: .9rem;
      line-height: .9rem;
      border-radius:.16rem;
      width: 80%;
      margin: 15% auto 0;
      background: #2c5bf5;
      border-radius: .4rem;
    }
    .agreement {
      margin-top: 18px;
      font-size: 12px;
      color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
      label {
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
.posifixed {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 100%;
}
.login {
  height: 100vh;
  font-size: 0.28rem;
  .login-content {
    div {
      .login__forget {
        position: absolute;
        right: 0;
        font-size: 12px;
        margin-top: 0;
        border: 0;
        right: 15%;
        font-weight: normal;
      }
      label {
        display: block;
        text-align: right;
        margin-right: 10px;
      }
    }
    .line {
      border-bottom: 1px  solid #eee;
      position: relative;
    }
    input {
      border: 0;
    }
  }
  .title {
    margin-top: 20px;
    padding: 0 15%;
  }
}
.login__account {
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
  margin-top:.8rem;
  a {
   color: #0d5bc4;
    font-size: .28rem;
  }
  label {
    color: #bfc4d6;
    font-size: .28rem;
  }
}
.align {
  text-align: right;
  justify-content: flex-end;
}

</style>
