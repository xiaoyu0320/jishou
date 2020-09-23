<!--  -->
<template>
  <div class='turn common-bg1 layout-child'>
    <van-nav-bar :title="title" left-arrow @click-left="back" class="trbg"/>
    <div class="content layout-scorll">
      <div class="content-box">
        <div class="balance" v-if="type == 1">
          <div class="title"></div>
          <div class="usable">
            <span>可用余额</span>
            {{userinfo.asc}}epc
          </div>

        </div>
        <div class="input">
          <van-field v-model="number" type="digit" placeholder="输入epc数量"/>
        </div>
         <div class="info" v-if="userinfo.freeze_asc!=0 && type == 1">其中已冻结拼团数额<span>{{_formatDecimal(Number(userinfo.freeze_asc),2)}}</span>epc</div>
      </div>
      <div class="login-bottom">
        <van-button class="pintuan-btn" size="large" @click="confirm" type="info">确认</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/my'
import { formatDecimal } from '@/utils/utils'
import { mapGetters } from 'vuex'
import { Toast } from 'vant'
export default {
  data () {
    return {
      type: this.$route.query.type,
      title: '转币',
      number: '',
      result: this.$route.query.result,
      stop: false
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  methods: {
    _formatDecimal (val, num) {
      return formatDecimal(val, num)
    },
    async confirm () {
      if (this.number == '') {
        Toast.fail('请输入epc数量')
        return
      }
      if (this.stop) {
        return
      }
      this.stop = true
      let obj = {
        number: this.number,
        ids: JSON.stringify(this.result)
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
      if (this.type == 1) {
        api.transferMoney(obj).then(res => {
          Toast.clear()
          Toast.success('操作成功')
          this.$router.push({
            path: '/my/resultList',
            query: {
              list: res.data
            }
          })
        }).catch(() => {
          this.stop = false
        })
      } else {
        api.collectMoney(obj).then(res => {
          Toast.clear()
          Toast.success('操作成功')
          this.$router.push({
            path: '/my/resultList',
            query: {
              list: res.data
            }
          })
        }).catch(() => {
          this.stop = false
        })
      }
      await this.$store.dispatch('getInfo')
    },
    back () {
      this.$router.back()
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created () {
    this.title = this.type == 0 ? '收币' : '转币'
    this.$store.dispatch('setBottomType', 0)
    await this.$store.dispatch('getInfo')
  }
}
</script>
<style lang='scss' scoped>
.content{
  display: flex;
  flex-direction: column;
  .content-box{
    background-color: #ffffff;
    border-radius: .4rem;
    overflow: hidden;
    padding: .7rem .3rem;
    .balance{
      display: flex;
      justify-content: space-between;
      padding: .3rem 0;
      align-items: baseline;
      .title{
        color: #222222;
        font-weight: bold;
        font-size: .28rem;
      }
      .usable{
        color: #222222;
        font-size: .22rem;
        font-weight: bold;
        background-color: #f8f9fb;
        padding: .1rem .2rem;
        border-radius: .3rem;
        span{
          color: #68717c;
          font-weight: normal;
        }
      }
    }
    .input{
      ::v-deep  .van-cell {
        padding: .3rem;
        box-shadow: 0px 9px 29px 0px rgba(11, 92, 215, 0.1);
        border-radius: .2rem;
      }
    }
  }
}
.login-bottom {
  margin: .7rem .3rem;

  ::v-deep  .van-button{
    border-radius: .16rem;
  }
}
.info {
  color: #68717c;
  font-size: .24rem;
  margin-top: .2rem;
  span {
    color: #2a2d31;
    font-weight: bold;
  }
}
</style>
