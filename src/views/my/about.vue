<!--  -->
<template>
  <div class="layout-child layout-auto ">
    <div style="background:#fff;">
      <van-nav-bar
        :title="$t('message.about')"
        left-arrow
        @click-left="onClickLeft"
        class="help"
      />
    </div>
    <div class="about-img">
      <img src="@s/login/logo.png" style="width:2rem;margin:0 auto" />
      <p>{{ vesion }}</p>
    </div>
    <div class="card-box" @click="checkVesion">
      <div class="card-item">
        <label>{{ $t("message.LatestVersion") }}</label>
        <span style="color:#c8c9cc;font-size:14px">
          {{ vesion }}
        </span>
      </div>
    </div>
    <div style="height:20px;background:#FCFCFC"></div>

  </div>
</template>

<script>
import store from '@/store'
// import { Toast } from 'vant'
// import { getVersion } from '@/api/wallet'
import native from '@/utils/native'
export default {
  data () {
    return {
      content: '',
      vesion: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    checkVesion () {
      if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.checkVersion && typeof (window.WebViewJavascriptBridge.checkVersion) == 'function') {
        window.WebViewJavascriptBridge.checkVersion()
      }
    }
  },
  created () {
    store.dispatch('setBottomType', 0)
    if (window.navigator.userAgent.indexOf('app_ezoo') != -1) {
      native.getAppVersion().then(data => {
        this.vesion = data
      })
    }
  }
}
</script>
<style scoped>
.help.van-nav-bar .van-icon {
  color: #333;
}
.problem {
  padding: 15px;
  box-sizing: border-box;
}
.problem span {
  font-size: 15px;
  margin-bottom: 15px;
  font-weight: 600;
  display: block;
}
.problem textarea {
  font-size: 11px;
  color: #999;
  border: none;
  resize: none;
  padding: 15px;
  background-color: #f7f7f7;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}
.btn {
  background: rgb(229, 229, 229);
  color: #fff;
  font-size: 15px;
  padding: 12px 0;
  border-radius: 50px;
  width: 73.5%;
  margin: 0 auto;
}
.help-btn {
  height: 44px;
  line-height: 44px;
  width: 75%;
  margin: 30px auto;
  display: block;
}
.about-img {
  text-align: center;
  background: #fcfcfc;
  padding: 30px 0;
}
/* .about-img img{
   width: 60px;
   height: 60px;
   border-radius: 50%;
   overflow: hidden
} */
.about-img h2 {
  font-weight: normal;
  color: #333;
  margin: 15px 0 10px;
}
.about-img p {
  font-size: 14px;
  color: #999;
}
.card-item {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-co1 {
  color: #f7f7f7;
}
</style>
