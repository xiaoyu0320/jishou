<template>
  <div class="modifypaypassword layout-child layout-auto">
    <van-nav-bar title="修改交易密码" left-arrow @click-left="back" />
    <div class="login-content">
      <span><input type="number" placeholder="输入手机号" disabled v-model="mobile"/></span>
      <span><input type="password" placeholder="请输入新密码" v-model="paypwd" /></span>
       <span><input type="text" placeholder="请输入验证码" v-model="code"  /><getCode  :mobile="mobile"/></span>
    </div>
    <div class="login-bottom">
      <span class="btn pintuan-btn" @click="save">保存</span>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/my'
import { Toast, Dialog } from 'vant'
import { mapGetters } from 'vuex'
import getCode from '@c/getCode'
export default {
  data () {
    return {
      paypwd: '',
      code: '',
      mobile: '',
      smsText: '发送验证码',
      smsEnabeld: true
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.mobile = this.userinfo.mobile
  },
  methods: {
    back () {
      this.$router.back()
    },
    save () {
      if (!this.paypwd) {
        Toast('请输入新密码')
        return
      }
      if (!this.code) {
        Toast('请输入验证码')
        return
      }
      Dialog.confirm({
        title: '修改资金密码',
        message: '请确认修改'
      })
        .then(() => {
          let obj = {
            paypwd: this.paypwd,
            code: this.code
          }
          api.editPayPwd(obj).then(res => {
            this.userinfo.is_paypwd = 1
            Toast.success('修改成功')
            this.$router.back()
          })
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  components: { getCode }
}
</script>
<style scoped lang="scss">
.modifypaypassword {
  text-align: center;
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
    padding: 0 25px;
    span {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      margin-top: 15px;
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
    input {
      border: none;
      outline: none;
      width: 100%;
      padding: 15px 0;
    }
  }
  .login-bottom {
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
.modifypaypassword .heard label:first-child,
.modifypaypassword .heard label:last-child {
  width: 6.5%;
  height: 100%;
  margin: 0 3%;
  display: flex;
  align-items: center;
}
</style>
