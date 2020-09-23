<!--  -->
<template>
<div class='wallet layout-child'>
  <van-nav-bar
      title="资产"
    />
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <div class="bg">
      <div class="title">
        <div class="title-s">总资产折合(RMB)</div>
        <div class="price">
          ≈ <strong>{{info.rmb}}</strong>
        </div>
      </div>

  </div>
  <div class="menu">
        <div class="item" @click="golink(0)">
          <img src="@s/wallet/congbi.png">
          充币
        </div>
        <div class="item" @click="golink(1)">
          <img src="@s/wallet/tibi.png">
          提币
        </div>
        <div class="item" @click="golink(2)">
          <img src="@s/wallet/shandui.png">
          速兑
        </div>
    </div>
   <div class="choice">
     <ul>
        <li @click="gochange(1)">
           <div class="left" >
              <img src="@s/wallet/USDT.png" >USDT
           </div>
           <div class="right">
               <!-- <div class="iconin">{{info.usdt.usdt}}</div> -->
               <div class="price">
                 <div>{{info.usdt.coin}}&nbsp;USDT</div>
                 <div>￥{{info.usdt.rmb}}</div>
               </div>
           </div>
           <div class="icon">
                <van-icon name="arrow" color="#c9c9c9" />
           </div>
        </li>
         <li @click="gochange(2)">
           <div class="left">
               <img src="@s/wallet/epc.png">epc
           </div>
           <div class="right">
               <!-- <div class="iconin">{{info.asc.asc}}</div> -->
               <div class="price">
                 <div>{{info.asc.coin}}&nbsp;epc</div>
                 <div>￥{{info.asc.rmb}}</div>
               </div>
           </div>
           <div class="icon">
                <van-icon name="arrow" color="#c9c9c9" />
           </div>
        </li>
     </ul>
   </div>
   </van-pull-refresh>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '@/api/wallet'
import { Toast } from 'vant'
export default {
  components: {},
  data () {
    return {
      info: {
        usdt: {
          usdt: '',
          rmb: ''
        },
        asc: {
          asc: '',
          rmb: ''
        }
      },
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  watch: {},
  // 方法集合
  methods: {
    golink (type) {
      switch (type) {
        case 0:
          // Toast.fail('即将上线，敬请期待')
          this.$router.push({
            path: '/wallet/receivables',
            query: {
              account: '0x38f2a48c5adc310774517368991f95c6f4645bbf',
              symbol: 'epc',
              id: 5
            }
          })
          break
        case 1:
          this.$router.push({
            path: '/wallet/transferASC'
          })
          break
        case 2:
          this.$router.push({
            path: '/wallet/coinChange'
          })
      }
    },
    getinfo () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
      api.assetsinfo({}).then(res => {
        Toast.clear()
        this.info = res.data
      })
    },
    gochange (type) {
      // Toast.fail('即将上线，敬请期待')
      this.$router.push({
        path: '/wallet/definite',
        query: {
          type: type
        }
      })
    },
    onRefresh () {
      this.info = {
        usdt: {
          usdt: '',
          rmb: ''
        },
        asc: {
          asc: '',
          rmb: ''
        }
      }
      this.getinfo()
      this.isLoading = false
    }
  },

  created () {
    this.$store.dispatch('setBottomType', 1)
    this.getinfo()
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.wallet {

   height: 100vh;
}
   .title {
      padding:.25rem .5rem;
      font-size: .24rem;
      color: #fff;
      .title-s {
         margin-bottom: .2rem;
         font-size: .24rem;
         margin-top: .2rem;
      }
      .price {
         font-size: .52rem;
      }
   }
   .menu {

      display: flex;
      grid-gap:10px;
      font-size: .28rem;
      color: #34363c;
      text-align: center;
      justify-content: center;
      margin-bottom: .4rem;
      .item {
          background: url('~@s/wallet/circle-bg.png') no-repeat center;
          background-size: contain;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 2.5rem;
        img {
          width: 1.33rem;
          display: block;
          margin-bottom: .2rem;
        }
      }
   }
   .choice {
      margin:.3rem;
      padding-bottom: 1rem;
      li {
         color: #333;
         background: #fff;
         box-sizing: border-box;
         height: 1.8rem;
         display: flex;
         align-items: center;
         justify-content: space-between;
         border-radius: .12rem;
         padding: .3rem;
         margin-top: .4rem;
         box-shadow: 0px 8px 14px 1px rgba(219, 223, 230, 0.2);
         position: relative;
         padding-right: 1rem;
         .left {
            display: flex;
            align-items: center;
            font-size: .36rem;
            color: #292c34;
            font-weight: bold;
            img {
               margin-right:.3rem;
               width: .8rem;
            }
         }
         .right{
            .iconin {
               margin-bottom: .1rem;
               font-size: .4rem;
            }
            .price {
              color: #292c34;
              font-size: .3rem;
              text-align: right;
            }
         }
         .icon {
           position: absolute;
           right: .25rem;
         }
      }

   }
   .bg{
     background: url('~@s/wallet/zichanbanner.png') no-repeat center;
     background-size: cover;
     margin:.3rem;
     border-radius: .2rem;
     height: 2.23rem;
   }
</style>
