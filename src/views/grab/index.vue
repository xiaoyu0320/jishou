<!--  -->
<template>
<div class='grab '>
  <div class="message" v-if="info.draw.length>0">
    <van-swipe class="my-swipe" :autoplay="3000"  style="height: 20px;"  :show-indicators="false"  vertical >
      <van-swipe-item v-for="(item,i) in info.draw" :key="i"> <img class="avaer" :src="item.avatar" > {{item.info}}</van-swipe-item>
    </van-swipe>
  </div>
  <div class="rule" @click="golink('/grab/rule')" >
     规则
  </div>
    <div class="mt canyu" @click="golink('/grab/list')"><strong>参与记录</strong></div>
  <div class="container">
     <div class="titles">
        <img src="@s/grab/ziti.png" style="width:3rem">
     </div>
      <div class="clock">
         <!-- <img src="@s/grab/unstart.png" v-if="status == 1|| status == 5">
         <img src="@s/grab/daojishi.png" v-else-if="status == 2">
         <img src="@s/grab/kaijiang.png" v-else-if="status == 3"> -->

         <div class="time">
          <van-loading v-if="status == 0 " type="spinner" color="#606fe2" />
         <div v-if="status == 1 "><label >未开始</label><strong><van-count-down :time="time"  /></strong> </div>
         <div v-if="status == 2"><label >倒计时</label><strong ><van-count-down v-if="time" :time="time" format="mm:ss" /></strong></div>
         <div v-if="status == 3"><label >开团中</label><strong style="color:#fff">{{countdown + 's'}}</strong></div>
         <div v-if="status == 4">
             <p>拼团公示</p>
             <van-image fit="fill" round lazy-load width=".4rem" height=".4rem" :src="info.result.avatar" />
             <p style="font-size:.3rem">{{info.result.mobile}}</p>
         </div>
         <div v-if="status == 5"><label>拼团结束</label><strong style="color:#fff;" > 明天{{info.start_time}}点见 </strong></div>
          <div v-if="status == 6" ><label>拼团失败</label><strong style="display:flex;color:#fff;align-items: center;"><van-count-down :time="time" format="ss" /> s</strong></div>
         <!-- <van-count-down :time="time" v-if="status == 1" /> -->
        </div>
      <div class="times" v-if="status == 4 || status == 6"> </div>
      <div class="title">
          <span >今天剩余<strong>{{info.day_num ? info.day_num : 0}}</strong>次 明天可用<strong>{{info.mor_num ? info.mor_num : 0 }}</strong>次</span>
      </div>
      <img src="@s/grab/liucheng.png" class="program" style="width:70%;margin-top:.8rem">

       <div class="box" :class="{cor:status==1||status==6||status==0|| status==5 || status==3}">
        <van-button class="btn"  :disabled="startFlag"  @click="golink('/grab/report')" round size="large" type="info">{{status == 3 ? '拼团结算中，稍后报名' : '参与寄售'}} </van-button>
          <div class="exs">未拼中退回报团数额，并获得报团数额的<i>1%</i>奖励</div>

      </div>
    </div>
  </div>
  <img src="@s/grab/lijiyaoqing.png" class="invite" @click="golink('/wallet/bill')">
</div>
</template>

<script>
import * as api from '@/api/wallet'
// import { Toast } from 'vant'
export default {
  components: {},
  data () {
    return {
      status: 0, // 1 距离开始时间  2开始倒计时    3 开奖中 开奖结果 4 继续报名
      info: {
        result: {
          avatar: 'dd',
          mobile: 'ddd'
        },
        draw: []
      },
      startFlag: true,
      time: null,
      timerId: null,
      serve: null,
      enroll_start_time: '',
      statusht: '',
      serveFlag: true,
      downtimer: null,
      countdown: null
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    cleartime () {
      window.clearInterval(this.serve)
    },
    golink (url) {
      // Toast.fail('敬请期待')
      this.$router.push({
        path: url
      })
    },
    onClickLeft () {
      this.$router.back()
    },
    counttime (time) {
      this.timerId = setInterval(() => {
        if (time <= 0) {
          window.clearInterval(this.timerId)
          this.getinfo()
          this.startFlag = true
          return
        }
        time--
        this.time = time * 1000
      }, 1000)
    },
    getinfo () {
      let obj = {}
      api.enrollindex(obj).then(res => {
        this.info = res.data
        let timestamp = Number(this.info.now) // 服务器当前时间
        let startstamp = Number(this.info.enroll_start_time) // 开始时间
        let endstamp = Number(this.info.enroll_end_time) // 结束时间
        let distime = ''
        if (!this.countdown) {
          this.countdown = Number(this.info.countdown) // 开团中倒计时时间
        }
        this.status = res.data.status
        // 当前时间小于开团时间
        switch (Number(res.data.status)) {
          case 1:
            distime = startstamp - timestamp
            if (distime > 0) { this.counttime(distime) }
            break
          case 2:
            this.cleartime()
            distime = endstamp - timestamp
            this.counttime(distime)
            // 当前可报名时间区域内
            this.serveFlag = true
            this.startFlag = false
            this.statusht = 3
            break
          case 3:
            window.clearInterval(this.timerId)
            window.clearInterval(this.downtimer)
            this.kaituan()
            // 开团中倒计时
            // if (this.serveFlag) {
            //   this.serveFlag = false
            //   this.countdown = 0
            //   this.serve = setInterval(() => {
            //     this.getinfo()
            //   }, 2000)
            // }
            this.downtimer = setInterval(() => {
              if (this.countdown <= 0) {
                window.clearInterval(this.downtimer)
                this.countdown = 0
                return
              }
              this.countdown--
            }, 1000)

            break
          // case 4:
          //   distime = 5
          //   this.cleartime()
          //   this.counttime(distime)
          //   this.serveFlag = true
          //   this.startFlag = true
          //   this.statusht = ''
          //   break
          case 6:
            distime = 5
            this.cleartime()
            this.counttime(distime)
            this.serveFlag = true
            this.startFlag = true
            this.statusht = ''
            break
          default :
            this.cleartime()
        }
      }).catch(() => {
        window.clearInterval(this.timerId)
        window.clearInterval(this.downtimer)
      })
    },
    kaituan () {
      api.indexStatus({ status: 3 }).then(res => {
        if (res.data.status == 6 || res.data.status == 4) {
          this.status = res.data.status
          let distime = 5
          this.cleartime()
          this.counttime(distime)
          this.serveFlag = true
          this.startFlag = true
          this.statusht = ''
          return false
        }
      })
    }

  },
  created () {
    localStorage.removeItem('time')
    this.getinfo()
    this.$store.dispatch('setBottomType', 1)
  },
  beforeDestroy () {
    window.clearInterval(this.serve)
    window.clearInterval(this.timerId)
    window.clearInterval(this.downtimer)
    this.serve = null
    this.timerId = null
    this.countdown = null
    this.serveFlag = false
  },
  mounted () {
    window.addEventListener('beforeunload', function (e) {
      window.clearInterval(this.serve)
      window.clearInterval(this.timerId)
      window.clearInterval(this.downtimer)
      this.serve = null
      this.timerId = null
      this.countdown = null
    })
  }
}
</script>
<style lang="scss" scoped>
.grab {
  width: 100%;
  height: 100vh;
  background: url('~@s/grab/lixingbeijing.png');
  background-size: cover;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  .titles {
    padding: 25% 0 5%;
    display: flex;
    justify-content: center;
  }
  .avaer {
    width: .24rem;
    height: .24rem;
    border-radius: 50%;
  }
  .message {
    min-width: 3rem;
    font-size: 0.24rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    padding: .1rem;
    border-radius: .3rem;
    position: absolute;
    left: .3rem;
    top: .6rem;
    overflow: hidden;
  }
  .rule {
    position: absolute;
    width:1.13rem ;
    height: .6rem;
    border-radius: 0 .3rem .3rem 0;
    left:0;
    top: 60%;
    color: #fff;
    font-size: .28rem;
    background: rgba(0,0,0,.15);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
  }
  .canyu {
    position: absolute;
    right: .3rem;
    top: .7rem;
    text-decoration: underline;
    color: #fff;
    font-size: .28rem;
    letter-spacing: 2px;
  }
  .container {
    padding-bottom: .5rem;
    &::-webkit-scrollbar {display:none}
    .title {
      height: .7rem;
      border-radius: 0.16rem 0.16rem 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 .3rem;
      font-family: PingFang-SC-Medium;
      font-weight: bold;
      font-size: .26rem;
      margin-top:1.5rem;
      span {
        &:first-child {
          color: #fff;
          font-size: .28rem;
          letter-spacing: 1px;
        }
        &:last-child {
          display: flex;
          align-items: center;
        }
      }
    }
    .clock {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      min-height: 2.1rem;
      background: url('~@s/grab/daijishi.png') no-repeat top center;
      background-size: 5.88rem 5.31rem;
      background-position: 0.5rem top;
      img {
         width: 1.53rem;
         margin: .2rem 0;
      }
      .time {
        display: flex;
        align-items: center;
        flex-direction: column;
        min-height: .4rem;

        width: 2rem;
        height:1.2rem;
        border-radius: 50%;
        font-size: .24rem;
        margin-top: 1.5rem;
        box-sizing: border-box;
        color: #fff;
        div {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        ::v-deep .van-count-down {
          color: #fff;
          font-size: .52rem;
          margin-top:.1rem
        }
        label {
          display: flex;
          align-items: center;
          margin-bottom: .3rem;
          font-size: .32rem;
          height: .4rem;
          justify-content: center;
        }
        strong {
          font-size: .3rem;
          color: #222;
        }
      }
      .bg3 {
         background: url('~@s/grab/kaituanzhong.png') no-repeat;
         background-size: contain;
         text-align: center;
      }
      .bg1 {
         background: url('~@s/grab/weikaishi.png') no-repeat;
         background-size: contain;
          ::v-deep .van-count-down {
          color: #fff;
          font-size: .32rem;
        }
         ::v-deep .van-button--disabled {
        background-image: linear-gradient(
        #9ca0b8,
        #9ca0b8),
      linear-gradient(
        #445899,
        #445899)!important;
          opacity: 1;
          border:none ;
        }
      }
      .bg4 {
          background: url('~@s/grab/zhongjianggongshi.png') no-repeat;
          background-size: contain;
          ::v-deep .van-image {
            margin:.1rem 0
          }
      }
      .bg5 {
          background: url('~@s/grab/pintuanjieshu.png') no-repeat;
          background-size: contain;
      }
    }
    .box {
      margin:.5rem .3rem .3rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      ::v-deep .van-button {
        background: #dba712;
        border-color:#dba712 ;
        height: .77rem;
        font-size: .28rem;
        width: 90%;
      }
      ::v-deep .van-button--disabled {
        background-image: linear-gradient(-90deg,
          #ad99e6 0%,
          #8693d4 100%),
        linear-gradient(
          #445899,
          #445899);
        opacity: 1;
        border:none ;
      }
      .mt {
        padding-top: .5rem;
        text-decoration: underline;
      }
    }
    .cor {
       ::v-deep .van-button--disabled {
         background-image: linear-gradient(
        #9ca0b8,
        #9ca0b8),
      linear-gradient(
        #445899,
        #445899);
       }
    }
    .exs {
      color: #fff;
      font-size: .2rem;
      text-align: center;
      margin-top:.4rem;
      i {
        color: #fff;
        font-style: normal;
        font-weight: 600;
      }
    }
    .program {
      width: 70%;
      margin: .5rem auto;
      display: block;
    }
  }
  .peopel {
    height: 1.8rem;
    background-image: linear-gradient(90deg,#f9e9e4 0%,#f5d7d8 29%,#f0c5cc 57%,#f9e9e4 100%);
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
      width: .64rem!important;
      height: .65rem;
      border-radius: 50%;
      margin:.1rem 0 !important
    }
    p {
      font-family: DIN-Bold;
      font-size: .18rem;
      font-weight: bold;
    }

  }
  .peo {
   color: #ea132a;
   margin: .2rem 0;
   font-family: PingFang-SC-Bold;
   font-size: .28rem;
  }
}
.times {
  display: flex;
  justify-content: center;
   align-items: center;
  strong {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.invite {
  position: fixed;
  right: 0;
  width: 2.23rem;
  height: 3.24rem;
  top:25%
}
</style>
