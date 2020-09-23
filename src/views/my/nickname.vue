<template>
  <div class="realname layout-child layout-auto" style="overflow-y:auto">
    <div class="first" >
      <div class="heard">
        <label @click="goback"><img src="@s/login/icon_arrow@2x.png"
               width="100%" /></label>
        <label>修改用户昵称</label>
        <label></label>
      </div>
      <div class="login-content">
        <span><input type="text"
                 placeholder="请输入昵称"
                 v-model="nickname" /></span>
      </div>
      <div class="login-bottom">
        <van-button color="linear-gradient(90deg, #364387 0%, #2d5096 100%), linear-gradient(#364087, #364087)" size="large" @click="okButton" type="info">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/my'
import { Toast } from 'vant'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      nickname: ''
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.nickname = this.userinfo.nickname
  },
  methods: {
    goback () {
      this.$router.back()
    },
    okButton () {
      if (!this.nickname) {
        Toast('请输入昵称')
        return
      }
      Toast.loading({
        duration: 20000,
        mask: true,
        message: '提交中...'
      })
      let obj = {}
      obj.nickname = this.nickname
      api.editNickname(obj).then(res => {
        Toast.clear()
        this.$store.commit('SET_NICKNAME', this.nickname)
        Toast.success({
          mask: true,
          duration: 2000,
          message: '提交成功'
        })
        this.$router.back()
      })
    }
  }
}
</script>
<style scoped lang="scss">
.realname {
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
    padding: 0 .3rem;
    ::v-deep  .van-button{
      border-radius: .16rem;
    }
  }
}
.realname .heard label:first-child,
.realname .heard label:last-child {
  width: 6.5%;
  height: 100%;
  margin: 0 3%;
  display: flex;
  align-items: center;
}
</style>
