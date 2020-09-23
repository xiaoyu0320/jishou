<!--  -->
<template>
  <div class="baas-yard common-bg1 layout-child">
    <van-nav-bar title="我的社区" left-arrow @click-left="back" @click-right="go('/my/profit')" >
      <template #right>
        奖励明细
      </template>
    </van-nav-bar>
    <div class="baas-header">
       <div class="baas-lv">
          <div class="lv" v-if="info.level != 6">当前级别： V{{info.level}}</div>
          <div class="lv" v-if="info.level == 6">当前级别： 合伙人</div>
        </div>
      <div class="baas-section">

        <div class="baas-award">
          <div class="baas-award-total">
            <div class="title">昨日总奖励(epc)</div>
            <div class="reward">{{info.reward}}</div>
          </div>
          <div class="baas-award-item">
            <div class="awrad-box">
              <div class="label">昨日拼团奖励：</div>
              <span>{{info.draw_reward}}</span>
            </div>
            <div class="awrad-box" style="padding-top: .1rem">
              <div class="label">昨日直推奖励：</div>
              <span>{{info.push_reward}}</span>
            </div>
            <div class="awrad-box" style="padding-top: .1rem">
              <div class="label">昨日社区奖励：</div>
              <span>{{info.community_reward}}</span>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="baas-record">
          <div class="record">
            <div class="record-title">社区会员</div>
            <div>{{info.community}}人</div>
          </div>
          <div class="record">
            <div class="record-title">有效会员</div>
            <div>{{info.valid_community}}人</div>
          </div>
          <div class="record">
            <div class="record-title">直推会员</div>
            <div>{{info.push_count}}人</div>
          </div>
          <div class="record">
            <div class="record-title">有效直推</div>
            <div>{{info.valid_push_count}}人</div>
          </div>
        </div>
      </div>
    </div>
    <div class="desc">列表不显示子账号</div>
    <div class="baas-title">
      <div class="item">级别</div>
      <div class="item">账号</div>
      <div class="item">社区会员</div>
      <div class="item">有效会员</div>
    </div>
    <div class="layout-scorll content">
      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="immediate"
        :offset="0"
        @load="getList"
      >
        <template v-if="!showEmpty">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="info-box">{{item.level_name}}</div>
            <div class="info-box">{{item.mobile}}</div>
            <div class="info-box">{{item.community}}</div>
            <div class="info-box">{{item.valid_community}}</div>
          </div>
        </template>
        <van-empty v-if="showEmpty" description="暂无数据" />
      </van-list>
    </div>
  </div>
</template>
<script>
import * as api from '@/api/my'
import { Toast } from 'vant'
export default {
  data () {
    // 这里存放数据
    return {
      list: [],
      showEmpty: false,
      loading: false,
      isLoading: false,
      finished: false,
      immediate: false,
      page: 1,
      count: -1,
      info: {
        level: '0',
        reward: '0',
        draw_reward: '0',
        push_reward: '0',
        valid_push_count: '0',
        push_count: '0',
        valid_community: '0',
        community: '0',
        community_reward: ''
      }
    }
  },
  methods: {
    go (url) {
      this.$router.push({
        path: url
      })
    },
    back () {
      this.$router.push({
        path: '/my/index'
      })
    },
    getinfo () {
      api.community({}).then(res => {
        Toast.clear()
        const { data } = res
        this.info = data
      })
    },
    async getList () {
      if (this.count == this.list.length) {
        this.loading = false
        this.finished = true
        return false
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
      const res = await api.communityList({ page: this.page })
      const list = res.data.list
      if (list.length == 0) {
        this.loading = false
        this.finished = true
        Toast.clear()
        return false
      }
      if (res.code === 200) {
        Toast.clear()
        this.list = this.list.concat(list)
        this.showEmpty = this.list.length == 0 && true
        this.count = res.data.count
        this.page += 1
        this.loading = false
        if (this.list.length < 15) {
          this.finished = true
        }
      } else {
        Toast.clear()
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.getinfo()
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
.baas-yard{
  ::v-deep .van-nav-bar__right{
    color: #333;
    font-size: 14px;
    font-weight: 500;
  }
  ::v-deep .van-nav-bar__title{
    font-size: 16px;
  }
}
.lv {
  font-size: .28rem;
  color: #532a10;
  margin-bottom: .3rem;
}
.desc {
  color: #999;
  font-size: .24rem;
  padding: .3rem;
  padding-bottom: 0;
}
.baas-header{
  padding: .5rem .3rem .1rem;
  .baas-section{
    font-family: PingFang-SC-Medium;
    background-color: #ffffff;
    border-radius: .1rem;
    background-image: linear-gradient(#fe8f38,#fe8f38),linear-gradient(#10a6c1,#10a6c1);
    overflow: hidden;
    .baas-lv{
      display: flex;
      padding: .2rem;
      .lv{
        flex: 1;
        padding-left: .3rem;
        color: #364387;
        font-size: .26rem;
        letter-spacing: 1px;
      }
    }
    .baas-award{
      padding: .3rem .1rem .2rem .1rem;
      display: flex;
      .baas-award-total{
        flex: 1;
        text-align: center;
        .title{
          letter-spacing: 1px;
          color: #fff;
          font-size: .28rem;
        }
        .reward{
          padding: .2rem 0;
          color: #fff;
          font-size: .36rem;
        }
      }
      .baas-award-item{
        flex: 1;
        .awrad-box{
          display: flex;
           letter-spacing: 1px;
           font-size: .24rem;
          .label{
            text-align: right;
            width: 1.9rem;
            color: #fff;
          }
          span{
            color: #fff;
          }
        }
      }
    }
    .line{
      height: 1px;
      background-color: #eeeeee;
      margin: 0 .1rem !important;
      transform: scaleY(.5);
      box-sizing: border-box;
    }
    .baas-record{
      display: flex;
      padding: .3rem 0;
      .record{
        font-size: .28rem;
        color: #fff;
        text-align: center;
        width: 25%;
        .record-title{
          font-size: .24rem;
          color: #fff;
          padding-bottom: .1rem;
        }
      }
    }
  }
  .baas-item{
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  }
  .baas-code{
    padding-left: .3rem;
    width: 50%;
    .price{
      font-size: .38rem;
      color: #364387;
    }
    .title{
      font-size: .26rem;
      color: #364387;
      padding-bottom: .1rem;
    }
    .desc{
      font-size: .2rem;
      color: #a2a5af;
    }
  }
}
.content{
  padding: 0 .2rem;
}
.baas-title {
  display: flex;
  padding: .4rem .2rem;
  box-sizing: border-box;
  .item {
    width: 25%;
    text-align: center;
    font-size: .28rem;
    color: #222222;
    font-weight: bold;
  }
}
.list{
  padding-bottom: .6rem;
  text-align: center;
  .item{
    display: flex;
    border-bottom:1px solid #eee ;
    padding: .3rem 0;
    font-size: .24rem;
    box-sizing: border-box;
    .info-box{
      text-align: center;
      font-size: .28rem;
      color: #747474;
      word-break: break-all;
      width: 25%;
    }
  }
}
</style>
