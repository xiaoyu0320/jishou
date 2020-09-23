<!--  -->
<template>
  <div class="sale">
    <van-pull-refresh class="content" v-model="loading" @refresh="onRefresh">
      <div class="title" v-if="list.length>0">
        <div class="item">开团时间</div>
        <div class="item">账号</div>
        <div class="item">是否拼中</div>
      </div>
      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        :immediate-check="immediate"
        finished-text="没有更多了"
        :offset="50"
        @load="onLoad"
      >
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="info-box">{{item.addtime}}</div>
          <div class="info-box">{{item.account}}</div>
          <div class="info-box" :class="item.status == 1 ? 'greed' : ''">{{item.status_name}}</div>
        </div>
        <van-empty v-if="showEmpty" description="暂无数据" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import * as api from '@/api/message'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      immediate: false,
      page: 1,
      list: [],
      showEmpty: false
    }
  },
  methods: {
    onLoad () {
      // this.getList()
      setTimeout(() => {
        this.getList()
      }, 500)
    },
    onRefresh () {
      this.finished = false
      this.page = 1
      this.list.length = 0
      this.getList()
    },
    getList () {
      if (this.count == this.list.length) {
        this.loading = false
        this.finished = true
        return false
      }
      api.drawLists({ page: this.page }).then(res => {
        this.list = this.list.concat(res.data.list)
        if (this.list.length == 0) {
          this.showEmpty = true
        }
        this.page = this.page + 1
        this.count = res.data.count
        this.loading = false
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
.content{
  padding: .3rem;
  box-sizing: border-box;
}
.sale {
  -webkit-overflow-scrolling: touch;
}
.title {
  display: flex;
  padding-bottom: .4rem;
  box-sizing: border-box;
  .item {
    width: 33.33333333%;
    text-align: center;
    font-size: .28rem;
    color: #222222;
    font-weight: bold;
  }
}
.list{
  padding-bottom: .6rem;
  text-align: center;
  .greed {
    color: #359F19 !important;
  }
  .item{
    display: flex;
    border-bottom:1px solid #eee ;
    padding: .3rem 0;
    font-size: .24rem;
    box-sizing: border-box;
    .info-box{
      text-align: center;
      color: #222;
      font-size: 0.24rem;
      word-break: break-all;
      width: 33.33333333%;
    }
  }
}
</style>
