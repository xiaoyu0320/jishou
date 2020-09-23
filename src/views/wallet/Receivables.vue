<template>
  <div class="assetsmanage ">
     <van-nav-bar  title="USDT充币" left-arrow @click-left="goback" />
    <div class="titles">
        链名称 ERC20
     </div>
    <div class="qrcode">

      <div class="qrcode-content">

        <qrcode-vue v-if="address" :value="address"
                    class="qrcode-auto"></qrcode-vue>
      </div>
      <div class="scan">扫一扫，转入</div>
      <div class="copy">
        <label class="title">钱包地址</label>
        <strong >{{ address }}
             <img src="@s/wallet/fuzhi.png" class="copybutton" style="width:.26rem"  @click="getCopy"  :data-clipboard-text="address">
        </strong>
      </div>

    </div>
     <!-- <div class="copybutton pintuan-btn btn"

          >复制</div> -->
    <div class="text">
     提醒：此地址只接收USDT转其他货币无法找回
    </div>
  </div>
</template>

<script>
import * as api from '@/api/wallet'
import QrcodeVue from 'qrcode.vue'
import Clipboard from 'clipboard'
import { maskAddress } from '@/utils/utils.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      id: 0,
      qrcodestatus: true,
      account: '',
      symbol: '',
      address: '',
      info: {},
      type: ''
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.getaddress()
  },
  methods: {
    goback () {
      this.$router.back()
    },
    getaddress () {
      api.recharge({}).then(res => {
        this.address = res.data.wallet_url
      })
    },
    _maskAddress (addr) {
      return maskAddress(addr)
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
    }
  },
  components: {
    QrcodeVue
  }
}
</script>
<style scoped lang="scss">
.assetsmanage {
  position: absolute;
  width: 100%;
  height: 100vh;
  text-align: center;
  .titles {
    color: #222222;
    font-size: .32rem;
    text-align: left;
    margin-top:50px;
    margin-left: 5%;
  }
  .heard {
    font-size: 17px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
  }
  .qrcode {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    padding: 25px 30px 30px;
    margin: 25px auto 0.2rem;
    width: 90%;
    height:8.78rem;
    position: relative;
    box-sizing: border-box;
    box-shadow: 0px 9px 29px 0px rgba(11,92,215, 0.1);
    background: #fff;
    .title {
      color: #292c34;
      font-size: 0.28rem;
      margin-bottom: 0.2rem;
      font-weight: bold;
    }
    .qrcode-select {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;

      color: #222222;
      font-weight: bold;
      span {
        width: 4.8%;
        display: flex;
        align-items: flex-end;
        &:first-child {
          margin-right: 5px;
        }
        &:last-child {
          margin-left: 5px;
        }
      }
    }
    .qrcode-content {
      padding-bottom: 0.3rem;
      padding-bottom: 0.3rem;
      width: 4rem;
      margin: 0 auto;
      ::v-deep canvas {
          width: 100%!important;
          height: 100%!important;
      }
    }
    .copy {
      // padding-top: 0.3rem;
      display: flex;
      flex-direction: column;
      word-break: break-all;
    }
  }
}
.assetsmanage .heard label:first-child,
.assetsmanage .heard label:last-child {
  width: 6.5%;
  height: 100%;
  padding: 0 3%;
  display: flex;
  align-items: center;
}
.text {
  font-size: 12px;
  text-align: center;
  word-break: break-all;
  color: #8d92a1;
  margin-top:.4rem
}
.scan {
 color: #1775e1;
  font-size: .28rem;
  font-weight: bold;
  margin-bottom: .5rem;
}
</style>
<style >
.assetsmanage .qrcode-auto canvas {
  width: auto !important;
  height: auto !important;
}
</style>
