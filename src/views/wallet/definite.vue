<template>
<div class='definite common-bg layout-child'>
  <van-nav-bar  :title="title" left-arrow @click-left="back" class="trbg"/>
   <div class="header">
      <div class="num">
       <div class="price"> <label>{{Number(detail.coin.coin).toFixed(2)}}</label> {{title}}<div class="rmb">≈ ￥{{detail.coin.rmb}}</div></div>
        <div class="box">
           <van-button class="btn" size="small" round @click="go"><img src="@s/wallet/sudui.png" >速兑</van-button>
           <van-button v-if="type ==2" class="btn" size="small" round @click="changb" style="margin-left:.2rem"><img src="@s/wallet/zhuanbi.png">转币</van-button>
        </div>

      </div>

   </div>
   <div class="list layout-scorll">
      <div class="title">交易记录</div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="list.length>0"
      >
        <div class="box" v-for="(item,i) in list" :key="i">
          <div class="item">
                <span class="bold">{{item.reasontype_name}}</span>
                <span class="icon">{{item.in_or_out ==0 ? '+' : '-'}}{{item.coin}} {{type==1?'USDT':'epc'}}</span>
          </div>
            <div class="item">
                <span class="time">{{item.unix_createtime}}</span>
                <span class="time" v-if="item.user_mobile">{{item.user_mobile}} </span>
                <span class="time" v-if="item.memo && item.in_or_out== 0 && item.reasontype == 2 " style="color:#ff1d1e"> {{item.memo}}</span>
                <!-- <span class="time" v-if="item.remark &&  item.in_or_out==1 && item.reasontype == 2 " style="color:#999"> {{item.remark}}</span> -->
          </div>
        </div>
      </van-list>
      <van-empty v-else description="暂无数据" />
   </div>
</div>
</template>

<script>
import * as api from '@/api/wallet'
import { formatDecimal } from '@/utils/utils.js'
import { Toast } from 'vant'
export default {
  components: {},
  data () {
    return {
      type: this.$route.query.type,
      title: '',
      detail: {
        coin: {
          coin: 0,
          rmb: 0
        }
      },
      loading: false,
      finished: false,
      total: 0,
      page: 1,
      list: []
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    _formatDecimal (num, decimal) {
      return formatDecimal(num, decimal)
    },
    back () {
      this.$router.back()
    },
    changb () {
    //   Toast.fail('即将上线，敬请期待')
      this.$router.push({
        path: '/wallet/ascchange',
        query: {
          type: this.type
        }
      })
    },
    go () {
      this.$router.push({
        path: '/wallet/coinChange',
        query: {
          type: this.type
        }
      })
    },
    getinfo () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
      api.assetsdetail({ type: this.type, page: this.page }).then(res => {
        Toast.clear()
        this.total = res.data.count
        this.detail = res.data
        if (res.data.list.length == 0) {
          this.finished = true
          return
        }
        this.list = this.list.concat(res.data.list)
        this.page++
        if (this.detail.list.length >= this.total) {
          this.finished = true
        }
        this.loading = false
      })
    },
    onLoad () {
      this.getinfo()
    }
  },
  created () {
    this.getinfo()
    this.type == 1 ? this.title = 'USDT' : this.title = 'epc'
    this.$store.dispatch('setBottomType', 0)
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>

  .header {
    padding: .3rem;
    border-radius: .1rem;
    .num {
      display: flex;
      flex-direction: column;
      padding: .2rem 0;
      align-items: center;
      text-align: center;
      color: #fff;
    }
    .price {
      font-size: .32rem;
      margin-bottom: .5rem;
      label{
        font-size: .66rem;
        font-weight: bold;
      }
      span {
        font-size: .24rem;
        color: #999;
      }
      .rmb {
        font-size: .32rem;
      }
    }

      ::v-deep .van-button{
        width: 2.21rem;
        height: .69rem;
        background-color: #ffffff;
        border-radius: .18rem;
        border: solid 1px #ffffff;
        font-size: .28rem;
        color: #2a2d31;
        .van-button__text {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width:.37rem;
            margin-right:.15rem
          }
        }
      }

  }
  .list {
    margin: .3rem;
    margin-top: .6rem;
    .title {
      font-size: .36rem;
      display: inline-block;
      padding-bottom: .1rem;
      color: #222222;
      font-weight: bold;
      margin-top:.3rem;
      letter-spacing: 2px;
    }
    .box{
      padding: .2rem 0;
      border-bottom:1px solid #eee ;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: .2rem;
        .bold {
          color: #333333;
          font-size: .30rem;
          font-weight: bold;
        }
        .icon {
          color: #333333;
          font-size: .32rem;
          font-weight: bold;
        }
        .time {
          color: #8d92a1;
          font-size: .26rem;
        }
      }
    }
  }
</style>
