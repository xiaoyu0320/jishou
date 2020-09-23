\<template>
<div class='result common-bg1 layout-child'>
  <van-nav-bar class="trbg" title="兑换结果" left-arrow @click-left="back"/>
  <div class="content layout-scorll">
    <div class="bindbox">
    <van-image
      round
      width="1.5rem"
      height="1.5rem"
      :src="require('@s/wallet/chenggong.png')"
    />
    <div class="title">兑换成功</div>
    <div v-if="code" class="title">开店资格：{{code}}</div>
    <div class="btn">
      <van-button  @click="gourl"  type="info" size="lagre">我知道了</van-button>
    </div>
  </div>
 </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      code: this.$rouer.query.code
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
  },
  methods: {
    back () {
      this.$router.back()
    },
    gourl () {
      this.$router.push({
        path: '/my/baasYard'
      })
    }
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
        background-color: #f3f5ff;
        width: 100%;
        border-color:#f3f5ff ;
        color: #364387;
        font-weight: bold;
        border-radius: .16rem;
      }
    }
  }
}
</style>
