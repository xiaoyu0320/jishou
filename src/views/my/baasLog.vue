<!--  -->
<template>
  <div class="baasLog layout-child">
    <van-nav-bar title="兑换记录" left-arrow @click-left="back"/>
     <div class="titles" v-if="list.length>0">
      <div class="items">兑换内容</div>
      <div class="items">账号</div>
      <div class="items">消耗(个)</div>
    </div>
    <div class="layout-scorll">
      <van-pull-refresh class="content" v-model="loading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="immediate"
          :offset="50"
          @load="getList"
        >
          <template v-if="!showEmpty">
            <div class="item" v-for="(item, index) in list" :key="index">
              <div class="box" style="text-align:left">
                  <div class="title">
                    <h3>{{item.prize_name}}</h3>
                    <!-- <p v-if="item.type != 2">开店码：{{item.shop_code}}</p> -->
                    <p>{{item.create_time}}</p>
                  </div>
              </div>
              <div class="box">{{item.mobile}}{{item.name}}</div>
              <div class="box">
                {{item.memo}}
              </div>
            </div>
          </template>
          <van-empty v-if="showEmpty" description="暂无数据" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import * as api from '@/api/my'
export default {
  components: {},
  data () {
    // 这里存放数据
    return {
      list: [],
      showEmpty: false,
      loading: false,
      finished: false,
      immediate: false,
      page: 1,
      count: -1,
      all: '',
      use: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
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
      api.exchangeLog({ page: this.page }).then(res => {
        const { data } = res
        this.list = this.list.concat(data.list)
        if (this.list.length == 0) {
          this.showEmpty = true
        }
        this.page = this.page + 1
        this.count = data.count
        this.loading = false
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
  .titles {
    display: flex;
    padding: .3rem;
    .items {
      font-size: .28rem;
      color: #222222;
      font-weight: bold;
      text-align: center;
      width:33.33333333%
    }
  }
.item{
  padding: .3rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &::after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background-color: #eee;
  }
  .box{
    font-size: .3rem;
    color: #747474 ;
    width: 33.33333%;
    text-align: center;
  }
  // .centers {
  //   text-align: center;
  // }
  // .rights {
  //   text-align: right;
  //   padding-right: .4rem;
  // }
  .code{
    color: #999;
  }
  .title{
    font-size: .28rem;
    h3 {
      font-size: .3rem;
      color: #535353;
    }
    p {
      font-size: .24rem;
      color: #747474;
      margin-top: .1rem;
    }
    & .status{
      font-size: .28rem;
    }
  }
}
.footer{
  box-shadow: 2px 0 12px rgba(100, 101, 102, 0.08);
  padding: .3rem;
  text-align: center;
}
</style>
