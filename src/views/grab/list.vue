<template>
<div class='definite layout-child'>
  <van-nav-bar  title="参与记录"  left-arrow @click-left="back"  >
      <template #right>
        <div class="van-dropdown-menu__bar" @click="onClickRight">
          <div role="button" tabindex="0" class="van-dropdown-menu__item">
            <span class="van-dropdown-menu__title">
              <div class="van-ellipsis">筛选</div>
            </span>
           </div>
        </div>
         <!-- <div class="fliter" >筛选 <img src="@s/grab/fliter.png" style="width:.24rem"></div> -->
      </template>
  </van-nav-bar>
  <!-- <div class="header">
    <div class="num">
      <div class="price">主号拼中次数 <label> {{count}}</label></div>
      <div class="price">子号拼中次数 <label> {{drawncount}}</label></div>
      <van-button class="btn pintuan-btn" size="small" round @click="go">兑换</van-button>
    </div>
  </div> -->
  <div class="title"  v-if="list.length>0">
    <div class="item">账号</div>
    <div class="item">参团时间</div>
    <div class="item">开团时间</div>
    <div class="item">状态</div>
  </div>
  <div class="list layout-scorll"  v-if="list.length>0">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="getinfo">
      <div class="box" v-for="(item,i) in list" :key="i">
        <div class="item">
          {{item.account}}
          <label>{{'(' + item.name + ')'}}</label>
        </div>
        <div class="item">
          {{item.create_time}}
        </div>
        <div class="item">
          {{item.addtime}}
        </div>
        <div class="item" :class="item.status == 1 ? 'greed' : ''">
          {{item.status_name}}
        </div>
      </div>
    </van-list>
  </div>
  <van-empty v-if="list.length<=0" description="暂无参与记录" />
    <van-popup v-model="show" round  position="bottom" :style="{ height: '50%' }"  closeable
  close-icon-position="top-right">
  <div class="titles">
     <span @click="reset">重置</span>
     筛选
  </div>
      <div class="pad">
       <div class="s-tit">账号</div>
       <div class="m-list">
          <div class="m-item"  @click="check(countArr,i,0)" :class="{actives:item.check&&active==i}"  v-for="(item,i) in countArr"  :key="i">{{item.name}}</div>
       </div>
      <div class="s-tit">参团状态</div>
       <div class="m-list" >
          <div class="m-item" @click="check(cantuan,i,1)"  :class="{actives:tuan.check&&cactive==i}"  v-for="(tuan,i) in cantuan"  :key="i">{{tuan.name}}</div>
       </div>
     </div>
     <div class="foot">
        <van-button class="btn2" @click="confirm" size="small">确定</van-button>
     </div>
    </van-popup>
</div>
</template>

<script>
import * as api from '@/api/wallet'
import { Toast } from 'vant'
export default {
  components: {},
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
      drawncount: 0,
      show: false,
      active: 0,
      cactive: 0,
      type: 0,
      statuss: 5,
      countArr: [{
        name: '主号',
        check: false,
        type: 1
      }, {
        name: '子号',
        check: false,
        type: 2
      }],
      cantuan: [{
        name: '参团中',
        check: false,
        statuss: 0
      }, {
        name: '已拼中',
        check: false,
        statuss: 1
      }, {
        name: '未拼中',
        check: false,
        statuss: 2
      }]
    }
  },
  // 方法集合
  methods: {
    reset () {
      this.type = 0
      this.statuss = 5
      this.page = 1
      this.cantuan.map(data => {
        data.check = false
      })
      this.countArr.map(data => {
        data.check = false
      })
      this.list = []
      this.finished = false
      this.loading = true
      this.getinfo()
    },
    confirm () {
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = true
      this.getinfo()
      this.show = false
    },
    check (arr, index, type) {
      this.page = 1
      if (type == 0) {
        this.active = index
      } else {
        this.cactive = index
      }
      arr.map((data, i) => {
        if (index == i) {
          if (data.check) {
            data.check = false
            if (type == 0) {
              this.type = 0
            } else {
              this.statuss = 5
            }
          } else {
            if (type == 0) {
              this.type = data.type
            } else {
              this.statuss = data.statuss
            }
            data.check = true
          }
        } else {
          data.check = false
        }
      })
    },
    onClickRight () {
      this.show = true
    },
    back () {
      this.$router.push({
        path: '/grab/index'
      })
    },
    getinfo () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
      let obj = {}
      obj.page = this.page
      obj.statuss = this.statuss
      obj.type = this.type
      api.enrolllist(obj).then(res => {
        Toast.clear()

        if (this.list.length >= res.data.count) {
          this.finished = true
          this.loading = false
          return false
        }
        this.list = this.list.concat(res.data.list)
        this.page++
        this.loading = false
      }).catch(() => {
        this.finished = true
      })
    },
    go () {
      this.$router.push({
        path: '/my/baasTrade'
      })
    }
  },
  created () {
    this.getinfo()
    this.$store.dispatch('setBottomType', 0)
  }
}
</script>
<style lang="scss" scoped>
.common-bg {
  background: url('~@s/wallet/ASCbeijing.png') no-repeat;
  background-size: contain;
}
.fliter {
  display: flex;
  align-items: center;
  font-size: .28rem;
  img {
   margin-left: .1rem;
  }
}
  .header {
    padding: .7rem .3rem 0 .3rem;
    border-radius: .1rem;
    .num {
      display: flex;
      justify-content: space-between;
      padding: .5rem;
      align-items: center;
      text-align: center;
      color: #364387;
      background: #fff;
      border-radius: .16rem;
      box-shadow: 0px 1px 5px 1px rgba(219, 223, 230, 0.66);
      ::v-deep .van-button__content {
        color: #fff;
        font-size: .28rem;
      }
    }
    .price {
      font-size: 0.32rem;
      display: flex;
      flex-direction: column;
      text-align: left;
      label{
        font-size: .66rem;
        font-weight: bold;
        margin-top: .2rem;
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
  .definite {
    .title {
      display: flex;
      margin-top:.5rem;
      padding-bottom: .2rem;
      .item {
        width: 25%;
        text-align: center;
        font-size: .24rem;
        color: #42444b;
        font-size: .3rem;
        font-weight: bold;

        .label{
          color: red;
        }
      }
    }
    ::v-deep .van-nav-bar__text {
      color: #222;
    }
  }
  .list {

    .box{
      padding: .23rem 0;
      border-bottom:1px solid #eee ;
      display: flex;
      align-items: center;
      height: 46px;
      box-sizing: border-box;
      .greed {
        color: #359F19 !important;
      }
      .item {
        width: 25%;
        text-align: center;
        color: #222;
        font-size: .24rem;
        word-break: break-all;

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
  .pad {
    padding: .4rem;
    .s-tit {
      font-size: .28rem;
    }
    .m-list {
      margin:.3rem 0;
      display: flex;
    }
    .m-item {
      width: 30%;
      display: inline-block;
      height: .6rem;
      line-height: .6rem;
      text-align: center;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-right: .2rem;
      font-size: .24rem;
      border-radius: .3rem;
    }
    .actives {
     background-color: #1775e1;
      color: #fff;
      border: solid 1px #1775e1;
    }
  }
  .foot {
    position: absolute;
    bottom: 0;
    padding: .3rem;
    width: 100%;
    display: flex;
    justify-content:center ;
    align-items: center;
    border-top: 1px solid #eee;
    ::v-deep .van-button {
      width: 45%;
    }
    .btn1 {
     width: 1.97rem;
      height: .69rem;
      background-color: #bfbfbf;
      border-radius: 8px;
       color:#fff;
    }
    .btn2 {
      width: 4.23rem;
      height: .73rem;
      background-color: #1775e1;
      border-radius: .3rem;
      color:#fff;
    }
  }
  .titles {
    text-align: center;
    padding: .3rem;
    font-size: .32rem;
    span {
      float: left;
      font-size: .28rem;
      color: #1775e1;
    }
  }
</style>
