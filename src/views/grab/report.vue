<template>
  <div class='report common-bg1 layout-child' style="overflow-y: auto;">
    <van-nav-bar title="参与拼购" left-arrow @click-left="back" class="trbg" />
    <div class="bindbox">
    <van-cell title="报团数额" class="set" :value="info.signup_fee+'epc/轮'" :border="false" />
    <van-cell title="手续费" class="set" :value="info.service_fee+'epc/轮'" :border="false" />
    <div class="titls-s">选择子号</div>
    <van-cell @click="gotogother" class="right" :title="title" is-link :border="false" />
    <div class="items">
     <span>主号剩余报团数：{{info.day_num}}</span> <span>余额： {{info.asc}}epc</span>
    </div>
      <van-checkbox v-model="auto"  icon-size="15px"  checked-color="#1775e1">
         <div class="title" style="padding-left:0">自动报团</div>
         <div class="info">如果未拼中则自动报下一轮拼购，【自动报团】限当天有效，直至你的报团次数用完或手续费不足，自动报团失效，请预留足够的余额大概30epc，用于扣除手续费。</div>

      </van-checkbox>
   </div>
    <div class="box">
      <van-button class="btn pintuan-btn" @click="report" size="large" :disabled="clickFlag" type="info">确认参与 </van-button>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/wallet'
import { Toast } from 'vant'
export default {
  components: {},
  data () {
    return {
      password: '',
      checked: true,
      clickFlag: false,
      str: [],
      info: {
        signup_fee: 0,
        service_fee: 0,
        total_fee: 0,
        asc: 0
      },
      title: '选择子号报团(选填)',
      value: 1,
      auto: false
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    count (val) {
      this.info.total_fee = (Number(this.info.signup_fee) + Number(this.info.service_fee)) * val
    },
    back () {
      this.$router.push({
        path: '/grab/index'
      })
    },
    report () {
      if (this.clickFlag) {
        return
      }
      this.clickFlag = true
      let obj = {}
      // if (this.str.length <= 0) {
      //   Toast.fail('请选择子账户')
      //   return false
      // }
      if (this.$route.query.jsonstr) {
        obj.uids = this.$route.query.jsonstr
      } else {
        this.str.push(localStorage['_shop_userId'])
        obj.uids = JSON.stringify(this.str)
      }
      obj.auto_enroll = this.auto ? 1 : 0
      obj.number = this.value
      obj.service_fee = this.info.service_fee
      obj.signup_fee = this.info.signup_fee
      obj.total_fee = this.info.total_fee
      api.enrollpost(obj).then(res => {
        Toast.success(res.msg)
        this.password = ''
        this.$router.push({
          path: '/grab/result',
          query: {
            data: JSON.stringify(res.data)
          }
        })
      }).catch(() => {
        this.str = []
        this.clickFlag = false
      })
    },
    gotogother () {
      this.$router.push({
        path: '/grab/togother'
      })
    },
    getinfo () {
      api.enrollstart({}).then(res => {
        this.info = res.data
      })
    }
  },
  created () {
    this.getinfo()
    let str = false
    if (this.$route.query.jsonstr) {
      this.str = JSON.parse(this.$route.query.jsonstr)

      for (let i = 0; i <= this.str.length; i++) {
        if (this.str[i] == localStorage['_shop_userId']) {
          str = true
        }
      }
      if (str) {
        this.title = '已选：主号和' + (this.str.length - 1) + '个子号'
      } else {
        this.title = '已选' + this.str.length + '个子号'
      }
    }

    this.$store.dispatch('setBottomType', 0)
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.report {
  ::v-deep .van-cell {
    padding: .2rem 0;
  }
  ::v-deep .van-cell__value {
    font-size: .24rem;
  }
}
.container {
  padding-top: 2rem;
  border-radius: 0.3rem 0.3rem 0 0;
}
.radius {
  height: 0.4rem;
  border-radius: 0.4rem 0.4rem 0 0;
  background: #fff;
  margin-top: 0.8rem;
}
.algin-right {
  text-align: right;
}
.algin-center {
  text-align: center;
}
.common-bg {
  background: #364087;
}
.title {
  color: #222;
  background: #fff;
  padding-left: 0.3rem;
  font-size: 0.28rem;
  margin-bottom: .1rem;
}
.items {
  background: #fff;
  padding: 0.4rem 0 .7rem;
  border-top: 1px solid  #e8e8e8;
  margin-bottom: .3rem;
  display: flex;
  justify-content: space-between;

  span {
    background-color: #f8f9fb;
    padding: .1rem .3rem;
    border-radius: .3rem;
    color: #929aa5;
    font-size: .24rem;
  }
  strong {
    color: #222;
  }
}
.flex1 {
  flex: 1;
  padding-top: 0 !important;
}
.right {
  ::v-deep .van-checkbox {
    justify-content: flex-end;
  }
  ::v-deep .van-cell__value--alone {
    text-align: right;
    color: #8d92a1;
  }
}
.set {
  ::v-deep .van-cell__title{
    color: #68717c;
    font-size: 0.28rem;
    margin-bottom: .3rem;
  }
  ::v-deep .van-cell__value{
    color: #222222;
    font-weight: bold;
  }
}
.report-box {
  background: #fff;
  padding: 0.3rem;
  .ex {
    color: #8d92a1;
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    span {
      color: #222;
      font-weight: bold;
      font-size: 0.28rem;
    }
  }
}
.header {
  padding: 0.3rem;
  border-radius: 0.1rem;
  .num {
    display: flex;
    flex-direction: column;
    padding: 0.2rem 0;
    align-items: center;
    text-align: center;
    color: #fff;
  }
  .price {
    font-size: 0.32rem;
    margin-bottom: 0.5rem;
    label {
      font-size: 0.66rem;
      font-weight: bold;
    }
    span {
      font-size: 0.24rem;
      color: #999;
    }
    .rmb {
      font-size: 0.32rem;
    }
  }

  ::v-deep .van-button {
    color: #364087;
    font-size: 0.36rem;
    width: 1.54rem;
  }
}
.list {
  margin: 0.3rem;
  margin-top: 0.6rem;
  .title {
    display: flex;
    justify-content: space-between;
    .item {
      font-size: 0.24rem;
      flex: 1;
    }
  }
  .box {
    padding: 0.2rem 0;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    background: #fff;

    .item {
      margin-top: 0.1rem;
      flex: 1;
      .bold {
        color: #333333;
        font-size: 0.3rem;
        font-weight: bold;
      }
      .icon {
        color: #333333;
        font-size: 0.32rem;
        font-weight: bold;
      }
      .time {
        color: #8c91a0;
        font-size: 0.26rem;
      }
    }
  }
}
.box {
  padding: 0.3rem;
  background: #fff;
  .btn {
    color: #fff;
    font-size: 0.3rem;
    border: 0;
    border-radius: 4px;
  }
}
.bindbox {
  margin-top: 0;
  ::v-deep .van-checkbox{
   align-items: flex-start;
   .info {
      color: #8d92a1;
      line-height: .36rem;
   }
  }
  .right {
      box-shadow: 0px 9px 29px 0px rgba(11, 92, 215, 0.1);
      background: #fff;
      padding: .3rem;
      border-radius: .2rem;
      margin-bottom: .5rem;
  }
  ::v-deep .van-checkbox__icon .van-icon {
    position: relative;
    top: 3px;
  }
  .titls-s {
    color: #68717c;
    font-size: 0.28rem;
    margin-bottom: .3rem;
  }
}
</style>
<style>
  .report .van-stepper__input {
    -webkit-box-shadow:none
  }
</style>
