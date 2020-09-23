<!--  -->
<template>
<div class='result  layout-child'>
  <van-nav-bar  title="提示" left-arrow @click-left="back"/>
  <div class="content layout-scorll">
    <div class="bindbox">
    <van-image
      round
      width="1.5rem"
      height="1.5rem"
      v-if="type == 0"
      :src="require('@s/wallet/chenggong.png')"
    />
    <van-image
      round
      width="1.5rem"
      height="1.5rem"
      v-if="type == 1"
      :src="require('@s/wallet/chenggong.png')"
    />
    <div class="title" v-if="type ==0">提交成功，等待链上确认</div>
    <!-- <div class="code"  v-if="type ==0">正常到账时间1-5分钟</div> -->
    <div class="title"  v-if="type !=0">兑换成功</div>
    <div class="btn">
      <van-button  @click="gourl"  type="info" size="lagre">知道了</van-button>
    </div>
  </div>
 </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      type: 0
    }
  },
  methods: {
    back () {
      this.$router.push({
        path: '/wallet/index'
      })
    },
    gourl () {
      this.$router.push({
        path: '/wallet/index'
      })
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    // this.type = this.$route.query.type
  }
}
</script>
<style lang='scss' scoped>
.result{
  text-align: center;
  .bindbox {
    padding: 1rem .5rem;
  }
  .content{
    .title{
      font-size: .4rem;
      padding: .4rem 0;
    }
    .code{
      font-size: .24rem;
      color: #8d92a1;
    }
    .btn{
      margin-top: 1rem;
      ::v-deep .van-button--info {
        background-color: #f8f8f9;
        width: 100%;
        border-color:#f8f8f9 ;
        color: #2a2d31;
        font-weight: bold;
        border-radius: .18rem;
        height: 1.12rem;
      }
    }
  }
}
</style>
