<template>
  <div class=' layout-child'>
    <van-nav-bar  title="速兑" left-arrow @click-left="back" />
    <div class="layout-scorll">
      <div class="bindbox" style="padding:0;padding-bottom:1rem">
      <!-- <div class="ncoin-box">
       
        <van-button size="mini"  <img src="@s/wallet/change.png" style="width:.24rem;margin-right:.05rem">切换</van-button>
      </div> -->
  
      <div class=" grid-container">
         <div class="grad-item">
             <div class="box">
                <img :src="next.img">{{next.name}}
             </div>
         </div>
         <div class="grad-item">
             <div class="box" @click="cut">
                  <img src="@s/wallet/duihuan.png">
             </div>
         </div>
          <div class="grad-item">
             <div class="box">
                  <img  :src="main.img">{{main.name}}
             </div>
         </div>
      </div>
      <div class="coin-body">
        <div class="coin-price">
           <div class="coin-cost" v-if="type == 1">余额：<label>{{next.icoin}}{{next.name}}</label></div>
           <div class="coin-cost" v-if="type == 2">余额：<label>{{(Number(next.icoin) + Number(fezz)).toFixed(6) }}{{next.name}}</label></div>
           <div class="coin-change" @click="allchange" >全部兑换</div>
        </div>

        <div class="coin-moeny">

          <div class="item">
            <van-field type="number"  @input="change(next)" v-model="next.num" placeholder="请输入兑换数量" />
          </div>
           <div class="change" v-if="next.num>0 ||next.num !='' "> 当前汇率： {{next.num}}{{next.name}} = {{main.num}}{{main.name}}</div>
           <div class="change" v-else> 当前汇率： 1USDT={{zsrate}}epc </div>
         
          <div class="info" v-if="type == 2 && fezz!=0">其中已冻结拼团数额{{fezz}}epc</div>
        </div>
         </div>

      </div>
    </div>
     <van-button class="confirm pintuan-btn" @click="confirm" :disabled="clickabled" size="large">确认</van-button>
     <!-- <div class="confirm pintuan-btn" @click="confirm" >确定兑换</div> -->
  </div>
</template>
<script>
import * as api from '@/api/wallet'
import { formatDecimal } from '@/utils/utils.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      pa: '',
      getrate: '',
      password: '',
      info: {},
      value: '',
      price: '',
      main: {
        img: require('@s/wallet/epc.png'),
        num: '',
        icoin: 0,
        name: 'epc',
        price: 0
      },
      next: {
        img: require('@s/wallet/USDT.png'),
        num: '',
        icoin: 0,
        name: 'USDT',
        price: 0
      },
      timer: null,
      nonces: '',
      number: '',
      adRate: '',
      coldFlag: false,
      address: '',
      is_freeze: null,
      type: 1,
      iconin: '', // 余额
      zsrate: '',
      ascrmb: 0,
      usdtrmb: 0,
      fezz: 0,
      clickabled: false
    }
  },
  methods: {
    _formatDecimal (num, val) {
      return formatDecimal(num, val)
    },
    allchange () {
      this.next.num = this.next.icoin
      this.change(this.next)
    },
    chkFreeze () {
      api.chkFreeze({}).then(res => {
        this.is_freeze = res.data.is_freeze
      })
    },
    getinfo (type) {
      api.exchange({
        type: type
      }).then(res => {
        this.next.icoin = res.data.coin
        if (res.data.freeze_asc) {
          this.fezz = res.data.freeze_asc
        }
        this.usdtrmb = Number(res.data.usdt_to_rmb)
        this.ascrmb = Number(res.data.asc_to_rmb)
        this.zsrate = res.data.usdt_rate
      })
    },
    init () {
      this.password = ''
      this.main.num = ''
      this.next.num = ''
    },
    returnTitle (item) {
      return item.name != 'USDT' ? '付款钱包' : '收款钱包'
    },
    change (item) {
      if (item.num > 0) {
        item.price = item.num
      } else {
        item.price = 0
      }
      let price = 0
      if (this.type == 1) {
        price = (item.num * this.usdtrmb) / this.ascrmb
      } else {
        price = (item.num * this.ascrmb) / this.usdtrmb
      }
      this.main.price = formatDecimal(price, 6)
      this.main.num = formatDecimal(price, 6)
    },
    cut () {
      [this.main, this.next] = [this.next, this.main]
      this.main.num = ''
      this.next.num = ''
      this.type == 1 ? this.type = 2 : this.type = 1
      this.getinfo(this.type)
      // 利用解构做出交换的效果

      // 切换后将数量清空
    },
    confirm () {
      if (this.next.num == '') {
        Toast.fail('请输入兑换数量')
        return
      }
      if (Number(this.next.num) <= 0) {
        Toast.fail('请输入正确的数量')
        return
      }

      if (this.clickabled) {
        return
      }
      this.clickabled = true
      api.exchangePost({
        num: this.next.num,
        type: this.type
      }).then(res => {
        this.next.num = ''
        this.next.price = 0
        this.main.num = ''
        this.main.price = 0
        this.getinfo(this.type)
        this.$router.push({
          path: '/wallet/result',
          query: {
            type: this.type
          }
        })
        Toast.success(res.msg)
      }).catch(() => {
        this.clickabled = false
      })
    },
    // getExchangeRate () {
    //   api.getExchangeRate({}).then(res => {
    //     this.rate = res
    //   })
    // },
    back () {
      this.$router.back()
    }
  },
  created () {
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
    if (this.type == 2) {
      [this.main, this.next] = [this.next, this.main]
    }
    this.getinfo(this.type)
    this.$store.dispatch('setBottomType', 0)
    // this.chkFreeze()
    // this.next.icoin = this.userinfo.icoin

    // this.getAscAmount()
  }
}
</script>
<style lang='scss' scoped>
  .coin-head{
    padding: .2rem .3rem;
    background-image: url(~@s/wallet/coinHead.png);
    background-size: 100% 100%;
    .offer{
      padding: .1rem .3rem;
      background-color: #3b4761;
      border-radius: .08rem;
      p{
        color: #ffffff;
        opacity: 0.7;
      }
    }
    .rate{
      color: #ffffff;
      align-items: center;
      .rate-item{
        padding: 0 .4rem;
      }
    }
  }
  .ncoin-box {
    background: #edf2fe;
    padding:0 .4rem;
    border-radius: .4rem .4rem 0 0;
    height: 1.1rem;
    display: flex;
    align-items: center;
    color: #8d92a1;
    justify-content: space-between;
     ::v-deep .van-button--mini {
      width: 1.29rem;
      height: .49rem;
      border-radius: .08rem;
      color: #fff;
      background:#2d5096 ;
      border-color: #2d5096;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .coin-body{
    background-color: #fff;
    padding: .3rem;
    padding-top: 1rem;
    flex: 1;
    .coin-moeny{
      padding:.3rem;
      background: #fff;
      box-shadow: 0px 9px 22px 0px rgba(11, 92, 215, 0.06);
      border-radius: .2rem;
      .change {
        color: #8d92a1;
        margin-top: .2rem;
      }
      .item{
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px  solid #fafafa;
        padding-bottom: .2rem;
        ::v-deep .van-cell::after {
          border-bottom: 0;
        }
        ::v-deep .van-field__control {
          text-align: left;
        }
        ::v-deep .van-field__control:disabled {
          color: #222;
          -webkit-text-fill-color: #222!important;
        }
        img{
          width: .83rem;
        }
        .body{
          width: 2rem;
          text-align: right;
          .name{
            font-size: .36rem;
            color: #292c34;
          }
          .amount{
            font-size: .2rem;
            color: #a2a5af;
          }
        }
        .end{
          border: 1px solid #a2a5af;
          border-radius: 0.08rem;
          overflow: hidden;
          width: 50%;
        }
      }
      .divider{
        position: relative;
        text-align: center;
        img{
          width: .8rem;
          height: .8rem;
        }
      }
      .divider::before{
        content:"";
        display:inline-block;
        width: calc(50% - .4rem);
        border-bottom:1px solid #e6e7ed;
        transform: scaleY(0.5);
        position: absolute;
        left: 0;
        top: .4rem;
      }
      .divider::after{
        content:"";
        display:inline-block;
        width: calc(50% - .4rem);
        transform: scaleY(0.5);
        border-bottom:1px solid #e6e7ed;
        position: absolute;
        right: 0;
        top: .4rem;
      }
      .rate{
        padding: .3rem 0;
        color: #3d424e;
        font-size: .24rem;
      }
    }
    .coin-item{
      margin-top: .3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .3rem;
      font-size: .28rem;
      border-radius: 0.08rem;
      background: #ffffff;
      .head{
        color: #a2a5af;
      }
      .end{
        color: #3d424e;
      }
    }
    .coin-box{
      padding: .3rem;
      background: #ffffff;
      border-radius: .08rem;
      margin: .3rem 0;
      .coin-price{
        font-size: .24rem;
        color: #8d92a1;
        .head{
          color: #a2a5af;
        }
        .body{
          color: #3d424e;
          padding: .35rem 0 .3rem 0;
        }
      }
      .coin-password{
        color: #999;
        >>> .van-field{
          padding: 0 !important;
        }
      }
    }

  }
  .coin-price {
    display: flex;
    justify-content: space-between;
    margin-bottom: .3rem;
    .coin-cost {
      color: #8d92a1;
       label {
        font-weight: bold;
        color: #222222;
       }
    }
    .coin-change {
      color: #364087;
      font-weight: 600;
    }
  }
    .confirm{
      font-size: .32rem;
      color: #ffffff;
      text-align: center;
      line-height: 1rem;
      height: 1rem;
      border-radius: 0.08rem;
      width: 90%;
      margin: 0 auto 1rem;

    }
    .info {
      color: #999;
      margin-top: .2rem;
    }
    .grid-container {
      display: grid;
       grid-template-columns: 35% 30% 35%;
       .grad-item {
         background: #fff;
         border-radius: .2rem;
           box-shadow: 0px 9px 29px 0px rgba(11,92,215, 0.1);
           padding: .3rem .4rem;
         .box {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .32rem;
         }
       
         img {
            width: .63rem;
            margin-right: .1rem;
         }
         &:nth-of-type(2) {
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: none;
            border-radius: 0;
            background: none;
          img {
            width: 1.12rem;
          }
       }
       }
     
    }
</style>
<style>
  .van-field__control:disabled{
    color: #DBDCE0;
    -webkit-text-fill-color: #DBDCE0 !important;
  }
</style>
