<!--  -->
<template>
  <div class="resultList layout-child">
    <van-nav-bar title="转账提示" left-arrow @click-left="back"/>
    <div class="layout-scorll">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="box" style="margin-bottom: .2rem">
          <div class="title">{{item.mobile}}</div>
          <div class="status">{{item.number}}</div>
        </div>
        <div class="box">
          <div class="code">{{item.time}}</div>
          <div class="code" :style="item.status == 0 ? 'color: red;' : ''">{{item.asc}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    // 这里存放数据
    return {
      list: this.$route.query.list
    }
  },
  methods: {
    back () {
      this.$router.push({
        path: '/my/bypass'
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$store.dispatch('setBottomType', 0)
  }
}
</script>
<style lang='scss' scoped>
.item{
  padding: .3rem;
  position: relative;
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
    display: flex;
    justify-content: space-between;
  }
  .code{
    color: #8c91a0;
  }
  .title{
    font-size: .28rem;
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
