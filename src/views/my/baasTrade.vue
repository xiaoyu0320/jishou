<!--  -->
<template>
  <div class='baas-yard common-bg1 layout-child'>
    <van-nav-bar title="兑换" left-arrow @click-left="back" class="trbg"/>
    <div class="content layout-scorll">
      <div class="baas-item">
        <div class="baas-select">
          <div class="select-box" :class="active == data.id ? 'active' : ''" @click="select(data.id)">
            <div class="left">
                <div class="code"><span>{{data.rule_num}}</span> 个寄售码</div>
               
                <div class="title">{{data.name}}</div>
            </div>
             <div class="price">{{data.rmb}}</div>
          
          </div>
        </div>
        <van-cell  style="margin: .3rem 0" :title="title" @click="gotogother" class="right" :border="false" :value="value" is-link></van-cell>
        <van-cell :title="'可用寄售码:' + use" />
        <div class="item">
          <div class="title">兑换份数</div>
          <van-stepper v-model="num" integer />
        </div>
        <div class="consume">
          消耗：<span>{{data.rule_num * num}}</span> 寄售码
        </div>
      </div>
    </div>
    <div class="box">
      <van-button color="linear-gradient(90deg, #364387 0%, #2d5096 100%), linear-gradient(#364087, #364087)" size="large" @click="confirm" type="info">确认兑换</van-button>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/my'
import { Toast } from 'vant'
export default {
  components: {},
  data () {
    // 这里存放数据
    return {
      use: '0',
      prize: [],
      active: 1,
      num: 1,
      data: {},
      title: '选择账号',
      item: {},
      stop: false,
      value: ''
    }
  },
  methods: {
    gotogother () {
      this.$router.push({
        path: '/my/togother'
      })
    },
    confirm () {
      if (this.use <= 0 || this.use < (this.data.rule_num * this.num)) {
        Toast.fail('您的寄售码不足')
        return
      }
      if (this.stop) {
        return
      }
      this.stop = true
      let obj = {
        id: this.data.id,
        num: this.num,
        uuid: this.item.uid
      }
      api.exchangePost(obj).then(res => {
        const { data } = res
        sessionStorage.clear()
        this.stop = false
        this.$router.push({
          path: '/my/result',
          query: {
            code: data.shop_code
          }
        })
      }).catch(() => {
        this.stop = false
      })
    },
    select (id) {
      this.active = id
      this.num = 1
      for (let i = 0; i < this.prize.length; i++) {
        if (id == this.prize[i]['id']) {
          this.data = this.prize[i]
        }
      }
    },
    exchange () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      api.exchange({ uuid: this.item.uid }).then(res => {
        const { data } = res
        this.prize = data.prize
        this.data = data.prize[0]
        this.use = data.use
        Toast.clear()
      })
    },
    back () {
      sessionStorage.clear()
      this.$router.push({
        path: '/my/baasYard'
      })
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    if (sessionStorage.getItem('result')) {
      this.item = JSON.parse(sessionStorage.getItem('result'))
      this.value = this.item.mobile
      this.exchange()
    }
  }
}
</script>
<style lang='scss' scoped>
  .content{
    padding: 1rem .3rem;
    display: flex;
    flex-direction: column;
    .baas-item{
      flex: 1;
      background-color: #ffffff;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
    }
  }
  .login-bottom {
    margin-top: .7rem;
    ::v-deep  .van-button{
      border-radius: .16rem;
    }
  }
  .baas-select{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 .3rem .3rem .3rem;

    .select-box{
      // box-shadow: 0px 7px 16px 1px rgba(178, 179, 184, 0.19);
      text-align: center;
      width: 100%;
      padding: .3rem;
      height: 2.06rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      background: url('~@s/my/duihuankapian.png') no-repeat;
      background-size: contain;
      .price{
        width: 1.06rem;
        color: #ffffff;
        height: 1.37rem;
        font-size: .31rem;
        padding: .6rem 0 0;
        font-size: .24rem;
        background: url('~@s/my/juan.png') no-repeat;
        background-size: 100% 100%;
      }
      .title{
        color: #222222;
        font-size: .23rem;
        padding-top: .2rem;
      }
      .code{
        font-size: .23rem;
        color: #222222;
      }
    }
    .active{
      .price{
        background-size: 100% 100%;
        color: #ffffff;
      }
      .title{
        color: #364387;
      }
      .left {
        padding-left: .3rem;
      }
      .code{
        color: #364387;
        font-size: .3rem;
        span{
          font-size: .46rem;
          font-weight: bold;
        }
      }
    }
  }
  .item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .6rem .3rem;
    color: #222222;
    font-size: .23rem;
    border-bottom: 1px solid #eee;
  }
  .consume{
    font-size: .23rem;
    padding: .3rem;
    span{
      font-size: .26rem;
      font-weight: bold;
    }
  }
  .box{
    padding: .3rem;
    ::v-deep  .van-button{
      border-radius: .16rem;
    }
    .btn{
      margin-top: .4rem;
    }
  }
  .right {
     padding: 15px 0;
      color: #222;
      font-weight: bold;
      box-shadow: 0px 1px 29px 0px rgba(11, 92, 215, 0.1);
      background: #fff;
      padding-left: 0.3rem;
      border-radius: 0.2rem;
  }
</style>
