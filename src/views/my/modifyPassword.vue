<template>
  <div class="modifypassword layout-child layout-auto">
    <van-nav-bar :title="title" left-arrow @click-left="back" />
    <div class="login-content">
      <span v-if="type==1"><input type="number"  placeholder="输入手机号" v-model="mobile"/></span>
       <span v-if="type==0"><input type="number" placeholder="输入手机号" v-model="mobile" disabled/></span>
      <span><input type="password" placeholder="请输入新密码" v-model="pwd" /></span>
      <span><input type="text" placeholder="请输入验证码" v-model="code"  /><getCode :mobile="mobile"/></span>
    </div>
    <div class="login-bottom">
      <span class="btn pintuan-btn"
            @click="save">{{
        $t("message.save")
      }}</span>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/my'
import { mapGetters } from 'vuex'
import { Toast, Dialog } from 'vant'
import getCode from '@c/getCode'
export default {
  data () {
    return {
      pwd: '',
      code: '',
      mobile: '',
      smsText: '发送验证码',
      smsEnabeld: true,
      type: 0,
      title: ''
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.mobile = this.userinfo.mobile
    if (this.$route.query.type) {
      this.type = this.$route.query.type
      this.title = '忘记密码'
    } else {
      this.title = '修改登录密码'
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    save () {
      if (!this.pwd) {
        Toast('请输入新密码')
        return
      }
      if (!this.code) {
        Toast('请输入验证码')
        return
      }
       if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
         Toast('请输入正确的手机号')
         return
       }
      if (!this.mobile) {
        Toast('请输入手机号')
        return
      }
      Dialog.confirm({
        title: '修改密码',
        message: '请确认修改'
      })
        .then(() => {
          let obj = {
            pwd: this.pwd,
            code: this.code
          }
          if (this.type == 1) {
            obj.mobile = this.mobile
            api.forgetPwd(obj).then(res => {
              Toast.success('修改成功')
              this.$router.back()
            })
          } else {
            api.editPwd(obj).then(res => {
              Toast.success('修改成功')
              this.$router.back()
            })
          }
        })
    }
  },
  components: { getCode }
}
</script>
<style scoped lang="scss">
.modifypassword {
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
.modifypassword .heard label:first-child,
.modifypassword .heard label:last-child {
  width: 6.5%;
  height: 100%;
  margin: 0 3%;
  display: flex;
  align-items: center;
}
</style>
<style>
  .modifypassword .code {
    padding:0!important
  }
</style>
