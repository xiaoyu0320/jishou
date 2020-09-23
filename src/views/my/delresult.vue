<!--  -->
<template>
  <div class="baasLog layout-child">
    <van-nav-bar title="删除结果" left-arrow @click-left="back"/>
    <div class="layout-scorll">
          <template>
            <div class="item" v-for="(item, index) in list" :key="index">
              <div class="box" style="text-align:left">
                  <p>{{item.mobile}}</p>
                  <p :class="{error:item.status!='删除成功'}">{{item.status}}</p>
              </div>
              <div class="box">
                 <p>{{item.time}}</p>
                <p>{{item.remark}}</p>
              </div>
            </div>
          </template>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    // 这里存放数据
    return {
      list: []
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  created () {
    this.list = JSON.parse(this.$route.query.str)
    console.log(this.list)
    this.$store.dispatch('setBottomType', 0)
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
  flex-direction: column;
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
    display: flex;
    justify-content: space-between;
    margin-top:.2rem
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
.error {
  color: red;
}
</style>
