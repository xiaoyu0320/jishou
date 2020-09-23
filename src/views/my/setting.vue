<template>
  <div class="setting layout-child">
    <van-nav-bar title="个人资料" left-arrow @click-left="back" />
    <div class="top">
      <van-row class="setting_maincontent">
        <van-uploader :afterRead="logContent">
          <van-image ref="headImg" width="60" height="60" style="border-radius: 50%;" :src="imgurl" />
        </van-uploader>
      </van-row>
      <label style="font-size:.3rem;margin-top:.2rem">
        {{userinfo.nickname}}
       </label>
    </div>
    <div class="list">
      <van-cell title="邀请码" :value="userinfo.invite_code" />
      <van-cell @click="go('/my/nickname')" title="修改昵称" is-link :value="userinfo.nickname" />
      <van-cell @click="go('/my/replacePhone')" title="更改手机" is-link />
      <van-cell @click="go('/my/modifyPassword')" title="修改登录密码" is-link />
      <van-cell @click="go('/my/modifyPayPassword')" title="修改交易密码" is-link />
      <van-cell v-if ="showFlag" @click="go('/my/about')" title="关于我们" is-link />
    </div>
    <div class="btn">
      <van-button type="primary" size="large" class="pintuan-btn"  @click="quitOK">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/wallet'
import { editAvatar } from '@/api/my'
import { Toast } from 'vant'

export default {
  components: {},
  data () {
    return {
      imgurl: '',
      userImg: '',
      userinfo: {},
      showFlag: false
    }
  },
  methods: {
    quitOK () {
      this.clearLocalStorage('loginList')
      this.$store.dispatch('logout')
      this.$router.replace({
        path: '/login'
      })
    },
    // 跳转路由地址
    go (url) {
      this.$router.push({
        path: url
      })
    },
    // 获取用户信息
    getinfobyuid () {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      Toast.loading({
        mask: true
      })
      api.getinfobyuid(obj).then(res => {
        this.userinfo = res.data
        this.imgurl = res.data.avatar.small_pic
        this.mobile = res.data.mobile
        Toast.clear()
      })
    },
    changeHeadImg () {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.avatar = this.userImg
      editAvatar(obj).then(res => {
        this.$store.commit('SET_CHANGEIMG', this.userImg)
        this.imgurl = this.userImg
        Toast.success('头像更新成功')
      })
    },
    // 更换头像
    logContent (file) {
      Toast.loading({ mask: true, message: '正在更换头像' })
      this.$refs.headImg.src = file.content
      let formData = new FormData()
      formData.append('uid', localStorage['_shop_userId'])
      formData.append('token', localStorage['_shop_token'])
      formData.append('avatar', file.file)
      const xhr = new XMLHttpRequest()
      xhr.open('POST', window.g.apiurl + 'setting/upload', true)
      xhr.send(formData)
      xhr.onload = () => {
        if (xhr.status == 200 || xhr.status == 304) {
          let res = JSON.parse(xhr.responseText)
          if (res.code == 200) {
            this.userImg = res.data.url
            this.changeHeadImg()
          } else {
            Toast.fail(res.msg)
          }
        } else {
          Toast.fail(xhr.status + '请求错误!')
        }
      }
    },
    back () {
      this.$router.back()
    }
  },
  created () {
    if (window.navigator.userAgent.indexOf('app_ezoo') != -1) {
      this.showFlag = true
    }
    this.$store.dispatch('setBottomType', 0)
    // 每次进来获取最新的数据
    this.getinfobyuid()
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.setting {
  .top {
    background: #fff;
    padding-top: 25px;
    padding-bottom: 25px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-bottom: 10px solid #f5f5f5;
    span {
      width: 13.5vw;
      height: 13.5vw;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 10px;
      border: 1px solid #ffe1b0;
      img {
        width: 100%;
      }
    }
  }
  .list {
    background: #fff;
    display: flex;
    flex-direction: column;
    border-bottom: 10px solid #f5f5f5;
  }
  .btn{
    padding: 0 .3rem;
    margin-top: .5rem;
    ::v-deep  .van-button{
      border-radius: .16rem;
    }
  }
}
</style>
