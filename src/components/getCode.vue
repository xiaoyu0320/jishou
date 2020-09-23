<!--  -->
<template>
<!-- <span class="code" style="margin-top: 0;"
              @click="_forget"
  :class="{active:smsEnabeld}">{{ smsText }}</span> -->
  <van-button
              :disabled="!smsEnabeld"
              size="small"
              :class="{ disabled:!smsEnabeld }"
              class="code"
              @click="_forget()"
              style="margin-top: 0;color:#333"
              > {{smsText}}</van-button>

</template>

<script>
import { sendsms } from '@/api/wallet'
import { Toast } from 'vant'
import { mapGetters } from 'vuex'
export default {
  props: {
    mobile: [Number, String]
  },
  components: {},
  data () {
    return {
      smsText: this.$i18n.t('message.getcode'),
      smsEnabeld: true
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  methods: {
    _forget () {
      if (!this.smsEnabeld) {
        return
      }
      this.smsEnabeld = false
      let obj = {}
      let d = new Date()
      let Base64 = require('js-base64').Base64
      obj.mobile = this.mobile
      obj.tokens = Base64.encode(
        d.getHours() +
        '' +
        (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes())
      )
      obj.t = Base64.encode(d.getTime())
      sendsms(obj).then(res => {
        Toast.success('发送成功')
        let s = 60
        let timer = setInterval(() => {
          this.smsText = s + '秒后重发'
          s--
          if (s <= 0) {
            clearInterval(timer)
            this.smsText = this.$i18n.t('message.getcode')
            this.smsEnabeld = true
          }
        }, 1000)
      }).catch(() => {
        this.smsEnabeld = true
      })
    }
  }
}
</script>
<style scoped>
  .code {
        border-radius: 12px;
      }
</style>
