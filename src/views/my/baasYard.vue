<!--  -->
<template>
  <div class="baas-yard layout-child">
    <van-nav-bar title="我的寄售码" left-arrow @click-left="back" right-text="兑换记录" @click-right="go('/my/baasLog')" />
    <div class="title" v-if="!showEmpty">
      <div class="item">账号</div>
      <div class="item">可用寄售码（个）</div>
    </div>
    <div class="yard-main layout-scorll">

        <template v-if="!showEmpty">
          <div class="box" v-for="(item,i) in list" :key="i">
            <div class="item">
              {{item.mobile}}
              <label>{{'(' + item.name + ')'}}</label>
            </div>
            <div class="item dis-align-items" @click="goCounts(item)">
              {{item.counts}}
              <span class="counts">明细</span>
            </div>
            <div class="item">
              <van-button style="border-radius:.3rem;" color="#f95657" size="small" @click="gourl(item)" type="info">兑换</van-button>
            </div>
          </div>
        </template>
        <van-empty v-if="showEmpty" description="暂无数据" />

    </div>
  </div>
</template>
<script>
import * as api from '@/api/my'
import { Toast } from 'vant'
export default {
  components: {},
  data () {
    // 这里存放数据
    return {
      list: [],
      showEmpty: false,
      loading: false
    }
  },
  methods: {
    goCounts (item) {
      this.$router.push({
        path: '/my/counts',
        query: {
          uuid: item.uid
        }
      })
    },
    gourl (item) {
      let result = JSON.stringify(item)
      sessionStorage.setItem('result', result)
      this.$router.push({
        path: '/my/baasTrade'
      })
    },
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

    getList () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      api.drawList({ page: this.page }).then(res => {
        const { data } = res
        this.list = data
        if (this.list.length == 0) {
          this.showEmpty = true
        }
        Toast.clear()
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
.dis-align-items{
  align-items: center;
  display: flex;
}
.baas-yard{
  font-family: PingFang-SC-Bold;
  ::v-deep .van-nav-bar__text {
    color: #323233;
  }
  .title {
    display: flex;
    padding: .3rem;
    .item {
      width: 39%;
      font-size: .28rem;
      color: #222222;
      font-weight: bold;
    }
  }
}
.yard-main{
  padding: .3rem;
  padding-top: 0;
  .box{
    padding: .23rem 0;
    border-bottom:1px solid #eee ;
    display: flex;
    align-items: center;
    .greed {
      color: #359F19 !important;
    }
    .item {
      font-family: DIN-Medium;
      width: 39%;
      color: #222222;
      font-size: .3rem;
      word-break: break-all;
      &:nth-of-type(3) {
        width: 22%;
        text-align: center;
      }
      .counts {
        margin-left: .1rem;
        font-family: PingFang-SC-Medium;
        background-color: #f8f8f9;
        border: solid 1px #f8f8f9;
        border-radius: 4px;
        color: #ff9018;
        font-size: .15rem;
        padding: 0 .1rem;
        border-radius: 10px;
      }
    }
  }
}
</style>
