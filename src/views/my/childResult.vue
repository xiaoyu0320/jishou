<!--  -->
<template>
  <div class="childResult layout-child">
    <van-nav-bar title="结果提示" left-arrow @click-left="back"/>
    <div class="layout-scorll">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="box">
          <div class="title">{{item.mobile}}</div>
          <div class="status">{{item.create_time}}</div>
        </div>
        <div class="box name" :style="item.status == 0 ? 'color:red;' : ''" style="text-align: right;justify-content: center;">
          {{item.status_name}}
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
  display: flex;
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
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .title{
    font-size: .3rem;
    padding-bottom: .2rem;
  }
  .status{
    font-size: .28rem;
    color: #8c91a0;
  }
  .name{
    font-size: .34rem;
  }
}
.footer{
  box-shadow: 2px 0 12px rgba(100, 101, 102, 0.08);
  padding: .3rem;
  text-align: center;
}
</style>
