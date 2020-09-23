<template>
<div class='definite common-bg1 layout-child'>
  <van-nav-bar  title="子账号参与记录" left-arrow @click-left="back" class="trbg"/>
   <div class="header">
      <div class="num">
       <div class="price">已中奖次数 <label> {{count}}</label></div>
      </div>
   </div>
   <div class="list layout-scorll">
      <div class="title">
        <div class="item">报名时间</div>
        <div class="item algin-center">报名编号</div>
        <div class="item algin-center">场次</div>
        <div class="item algin-right">报名状态</div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="box" v-for="(item,i) in list" :key="i">
          <div class="item">
             {{item.create_time}}
          </div>
           <div class="item algin-center">
               {{item.number}}
          </div>
           <div class="item algin-center">
               {{item.scene}}
          </div>
            <div class="item algin-right">
               {{item.status_name}}
          </div>
        </div>
      </van-list>
   </div>
</div>
</template>

<script>
import * as api from '@/api/wallet'
import { Toast } from 'vant'
export default {
  data () {
    return {
      title: '',
      detail: {
        coin: {}
      },
      loading: false,
      finished: false,
      total: 0,
      page: 1,
      list: [],
      count: 0,
      status: 1,
      cid: this.$route.query.cid
    }
  },
  // 方法集合
  methods: {
    back () {
      this.$router.back()
    },
    getinfo () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
      let obj = {
        status: this.status,
        cid: this.cid,
        page: this.page
      }
      api.enrolllist(obj).then(res => {
        Toast.clear()
        if (res.data.list.length == 0) {
          this.finished = true
          return
        }
        if (this.page > res.data.page_count) {
          this.finished = true
          return
        }
        this.count = res.data.drawn_count
        this.total = res.data.count
        this.detail = res.data
        this.loading = false
        this.list = this.list.concat(res.data.list)
        this.page++
      })
    },
    onLoad () {
      this.getinfo()
    },
    go () {
      this.$router.push({
        path: '/my/baasTrade'
      })
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.algin-right {
  text-align: right;
}
.algin-center {
  text-align: center;
}
.common-bg1 {
  background: url('~@s/wallet/ASCUSDTbeijing.png') no-repeat;
  background-size: contain;
}
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
       color: #3670f5;
       font-size: .36rem;
       width: 1.54rem;
      }

  }
  .list {
    margin: .3rem;
    margin-top: 1.5rem;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top:.3rem;
      .item {
        font-size: .24rem;
        flex: 1;
        color: #292b34;
        font-size: .3rem;
        font-weight: bold;
      }
    }
    .box{
      padding: .2rem 0;
      border-bottom:1px solid #eee ;
      display: flex;
      justify-content: space-between;
      .item {
        margin-top: .1rem;
        flex: 1;
        color: #222;
        font-size: .3rem;
        font-weight: bold;

        .icon {
          color: #333333;
          font-size: .32rem;
          font-weight: bold;
        }
        .time {
          color: #8c91a0;
          font-size: .26rem;
        }
      }
    }
  }
</style>
