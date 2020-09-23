<!--  -->
<template>
  <div class="msg layout-child">
    <van-nav-bar title="寄售数量" left-arrow @click-left="back" />
    <div class="nav">
      <div class="item" @click="go(0)" :class="[active == 0 ? 'active' : '']">
        <p>可用数量({{available}})</p>
        <div class="line"></div>
      </div>
       <div class="item" @click="go(1)" :class="[active == 1 ? 'active' : '']">
        <p>已用数量({{used}})</p>
        <div class="line"></div>
      </div>
    </div>
    <div class="header">
      <div class="title">寄售码</div>
      <div class="title">数量</div>
      <div v-if="active == 0" class="title">获得时间</div>
      <div v-else class="title">兑换时间</div>
    </div>
    <div class="layout-scorll">
      <van-pull-refresh class="content" v-model="loading" @refresh="onRefresh">
        <van-list
          class="list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="immediate"
          :offset="50"
          @load="getList"
        >
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="info-box">{{item.number}}</div>
            <div class="info-box">{{item.status}}个</div>
            <div v-if="active == 0" class="info-box">{{item.addtime}}</div>
            <div v-else class="info-box">{{item.updatetime}}</div>
          </div>
          <van-empty v-if="showEmpty" description="暂无数据" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/my'
export default {
  data () {
    return {
      uuid: this.$route.query.uuid,
      active: 0,
      loading: false,
      finished: false,
      immediate: false,
      page: 1,
      list: [],
      showEmpty: false,
      available: '0', // 可用数量
      used: '0', // 已用数量
      count: -1
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    go (i) {
      this.active = i
      this.page = 1
      this.list.length = 0
      this.count = -1
      this.showEmpty = false
      this.getList()
    },
    onRefresh () {
      this.finished = false
      this.page = 1
      this.list.length = 0
      this.count = -1
      this.showEmpty = false
      this.getList()
    },
    getList () {
      if (this.count == this.list.length) {
        this.loading = false
        this.finished = true
        return false
      }
      api.drawListDetails({ page: this.page, uuid: this.uuid, is_exchange: this.active }).then(res => {
        this.list = this.list.concat(res.data.list)
        if (this.list.length == 0) {
          this.showEmpty = true
        }
        this.page = this.page + 1
        this.count = res.data.count
        this.available = res.data.available
        this.used = res.data.used
        this.loading = false
      })
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
  .nav{
    display: flex;
    align-items: center;
    height: .9rem;
    box-sizing: border-box;
    padding-right: 1.4rem;
    padding-left: .2rem;
    padding: 0.3rem;
    margin-top: .2rem;
    .item{
      font-family: PingFang-SC-Bold;
      letter-spacing: 1px;
      color: #8d92a1;
      width: 2rem;
      font-size: .28rem;
      height: .7rem;
      line-height: .7rem;
      text-align: center;
      margin-right: 0.3rem;
      &.active{
       background-color: #1775e1;
        color: #fff;
        border-radius: 0.5rem;
        .line{
          display: none;
        }
      }
      .line{
        width: .6rem;
        height: .06rem;
        margin:0 auto ;
        display: none;
        background-color: #364387;
        border-radius: 3px;
      }
    }
    ::v-deep .van-icon{
      padding-right: 1rem;
    }
  }
  .header {
    display: flex;
    align-items: center;
    font-size: .3rem;
    color: #42444b;
    padding: .3rem;
    font-weight: bold;
    .title{
      width: 45%;
      &:nth-of-type(2) {
        width: 20%;
        text-align: center;
      }
      &:nth-of-type(3) {
        width: 35%;
        text-align: right;
      }
    }
  }
  .list{
    .item{
      display: flex;
      border-bottom:1px solid #eee ;
      padding: .3rem;
      font-size: 0.24rem;
      color: #222;
      letter-spacing: 1px;
      .info-box{
        width: 45%;
        &:nth-of-type(2) {
          width: 20%;
          text-align: center;
        }
        &:nth-of-type(3) {
          width: 35%;
          text-align: right;
        }
      }
    }
  }
</style>
