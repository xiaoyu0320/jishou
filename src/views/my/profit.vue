<!--  -->
<template>
  <div class='profit layout-child'>
    <van-nav-bar title="奖励明细" left-arrow @click-left="back" />
    <van-tabs title-active-color="#364387" v-model="active" :animated="true" :border="false" :line-height="2 + 'px'" @change="changetab">
      <template v-for="tab in tabslist">
        <van-tab :key="tab.key" :name="Number(tab.key)" :title="tab.name"></van-tab>
      </template>
    </van-tabs>
    <div class="section" v-show="!showEmpty">
      <div class="section-item">
        <div class="section-box">
          <div>{{returnDay(active)}}</div>
          <div class="icon">{{day_reward}}</div>
        </div>
        <div class="vertical"></div>
        <div class="section-box">
          <div>{{returnAll(active)}}</div>
          <div class="icon">{{all_reward}}</div>
        </div>
      </div>
    </div>
    <div class="baas-title" v-show="!showEmpty">
      <div class="item">奖励时间</div>
      <div class="item">奖励来至</div>
      <div class="item">拼团次数</div>
      <div class="item">奖励数量</div>
    </div>
    <div class="layout-scorll">
      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        :finished-text="text"
        :immediate-check="immediate"
        :offset="50"
        @load="getList"
      >
        <template v-if="!showEmpty">
          <div class="item" :style="item.show ? 'background-color: #f6f5f5;padding: .15rem .1rem;border: 0' : ''" v-for="(item, index) in list" :key="index">
            <template v-if="!item.show">
              <div class="info-box">{{item.createtime}}</div>
              <div class="info-box">{{item.mobile}}<span style="font-size: 12px;" v-if="item.name">({{item.name}})</span></div>
              <div class="info-box">{{item.enroll_count}}</div>
              <div class="info-box">{{item.coin}}</div>
            </template>
            <template v-else>
              <div class="info-close">
                <div>{{item.date}} 结算</div>
                <div v-if="item.level" style="padding-left: .3rem">等级: {{item.level_name}}</div>
              </div>
            </template>
          </div>
        </template>
        <van-empty v-if="showEmpty" description="暂无数据" />
      </van-list>
    </div>
  </div>
</template>
<script>
import * as api from '@/api/my'
import { mapGetters } from 'vuex'
import { Toast } from 'vant'
export default {
  data () {
    // 这里存放数据
    return {
      active: 1,
      list: [],
      showEmpty: true,
      loading: true,
      finished: false,
      immediate: true,
      page: 1,
      count: -1,
      tabslist: [{
        key: 1,
        name: '拼团奖励'
      },
      {
        key: 2,
        name: '直推奖励'
      },
      {
        key: 3,
        name: '社区奖励'
      },
      {
        key: 4,
        name: '全球分红'
      },
      {
        key: 5,
        name: '节点奖励'
      },
      {
        key: 6,
        name: '手续费奖励'
      }],
      all_reward: '0',
      day_reward: '0',
      tmp: [],
      text: '没有更多了'
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  methods: {
    returnAll (active) {
      switch (Number(active)) {
        case 1:
          return '累计拼团奖励'
        case 2:
          return '累计直推奖励'
        case 3:
          return '累计社区奖励'
        case 4:
          return '累计全球分红'
        case 5:
          return '累计节点奖励'
        case 6:
          return '累计手续费奖励'
      }
    },
    returnDay (active) {
      switch (Number(active)) {
        case 1:
          return '今日拼团奖励'
        case 2:
          return '昨日直推奖励'
        case 3:
          return '昨日社区奖励'
        case 4:
          return '昨日全球分红'
        case 5:
          return '昨日节点奖励'
        case 6:
          return '昨日手续费奖励'
      }
    },
    changetab (name) {
      this.showEmpty = true
      this.loading = true
      this.finished = false
      this.count = -1
      this.page = 1
      this.list.length = 0
      this.tmp.length = 0
      this.getList()
    },
    back () {
      this.$router.back()
    },
    returnTime (nowTime) {
      let thisTime = nowTime
      thisTime = thisTime.replace(/-/g, '/')
      let time = new Date(thisTime)
      time = time.getDate()
      return time
    },
    getList () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
      api.profit({ page: this.page, type: this.active }).then(res => {
        const { data } = res
        const tmp = data.list
        if (tmp.length == 0) {
          this.loading = false
          this.finished = true
          if (this.list.length == 0) {
            this.text = ''
          }
          Toast.clear()
          return false
        }
        if (this.active != 1 && this.active != 6) {
          for (let i = 0; i < tmp.length; i++) {
            if (this.tmp.indexOf(data.list[i].date) == -1) {
              this.tmp.push(data.list[i].date)
              let obj = {
                show: true,
                date: data.list[i].date,
                level: data.list[i].level,
                level_name: data.list[i].level_name
              }
              data.list.splice(i, 0, obj)
            }
          }
        }
        this.list = this.list.concat(data.list)
        if (this.list.length == 0) {
          this.showEmpty = true
          this.text = ''
        } else {
          this.showEmpty = false
          this.text = '没有更多了'
        }
        if (this.userinfo.level == 6 || data.global_reward == 1) {
          let obj = {
            key: 4,
            name: '全球分红'
          }
          if (JSON.stringify(this.tabslist).indexOf(JSON.stringify(obj)) == -1) {
            this.tabslist.push(obj)
          }
        }
        this.all_reward = data.all_reward
        this.day_reward = data.day_reward
        this.page = this.page + 1
        this.loading = false
        Toast.clear()
        if (this.list.length < 15) {
          this.finished = true
        }
      })
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.getList()
    if (this.userinfo.is_node != 1) {
      this.tabslist = [{
        key: 1,
        name: '拼团奖励'
      },
      {
        key: 2,
        name: '直推奖励'
      },
      {
        key: 3,
        name: '社区奖励'
      }]
    }
  }
}
</script>
<style lang='scss' scoped>
.profit {
 ::v-deep .van-tabs__line{
   display: none;
 }

  ::v-deep .van-tabs__nav--line {
    padding-top: .3rem;
     height: .53rem;
     margin:0 .2rem;
    .van-tabs__wrap {
        height: .53rem;
    }
    .van-tab {
        width: 1.5rem;
    }
    .van-tab--active {
        background-color: #1775e1;
        border-radius: .27rem;
        color: #fff!important;
    }
 }
}
.section{
  padding: .3rem .2rem;
  .section-item{
   background-image: linear-gradient(#1775e1, #1775e1), linear-gradient(#364387, #364387);
    border-radius:.1rem;
    color: #ffffff;
    padding: .4rem;
    display: flex;
    text-align: center;
    .section-box{
      font-size: .26rem;
      flex: 1;
      .icon{
        font-size: .34rem;
        padding-top: .3rem;
      }
    }
    .vertical{
      transform: scaleX(0.5);
      border-left: 1px solid #ffffff;
      margin: 0 .5rem;
    }
  }
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
    &:nth-of-type(2) {
      flex: 1;
      // width: 33% !important;
    }
    &:nth-of-type(3) {
      width: 22% !important;
    }
    &:nth-of-type(4) {
      text-align: right;
      width: 20% !important;
    }
  }
}
.layout-scorll {
  .list{
    text-align: center;
    .item{
      display: flex;
      border-bottom:1px solid #eee ;
      padding: .3rem 0;
      margin: 0 .2rem;
      font-size: .24rem;
      box-sizing: border-box;
      .info-box{
        text-align: center;
        font-size: .28rem;
        color: #747474;
        word-break: break-all;
        width: 25%;
        &:nth-of-type(2) {
          flex: 1;
          // width: 33% !important;
        }
        &:nth-of-type(3) {
          width: 22% !important;
        }
        &:nth-of-type(4) {
          width: 20% !important;
        }
      }
      .info-close{
        display: flex;
        color: #999999;
      }
    }
  }
}

</style>
