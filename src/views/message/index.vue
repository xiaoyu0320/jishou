<template>
  <div class="msg  layout-child">
    <van-nav-bar title="消息"  />
    <div class="baas-log">
      <div class="baas-main">
        <div class="nav">
          <div class="item" @click="go(1)" :class="[active == 1 ? 'active' : '']">
            <p>寄售结果</p>
            <div class="line"></div>
          </div>
          <div class="item" @click="go(0)" :class="[active == 0 ? 'active' : '']">
            <p>活动资讯</p>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <dynamic v-if="active == 0" class="layout-scorll"/>
    <draw v-if="active == 1" class="layout-scorll"/>
  </div>
</template>

<script>

export default {
  components: {
    draw: () => import('@v/message/draw'),
    dynamic: () => import('@v/message/dynamic')
  },
  data () {
    return {
      active: 1
    }
  },
  methods: {
    go (index) {
      this.active = index
    },
    back () {
      this.$router.back()
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 1)
    if (sessionStorage.getItem('mesActive')) {
      this.active = sessionStorage.getItem('mesActive')
      sessionStorage.removeItem('mesActive')
    }
  }
}
</script>
<style lang='scss' scoped>
.common-bg {
  background: url('~@s/wallet/common-bg.png') no-repeat;
  background-size: contain;
  background-position: 100% -20%;
}
.baas-log{
  .baas-main{
    padding: .3rem;
    .baas-record{
      display: flex;
      .record{
        text-align: center;
        width: 25%;
        .record-title{
          padding-bottom: .1rem;
        }
      }
    }
  }
  .baas-code{
    padding-left: .3rem;
    width: 50%;
    .price{
      font-size: .38rem;
      color: #364387;
    }
    .title{
      font-size: .26rem;
      color: #364387;
      padding-bottom: .1rem;
    }
    .desc{
      font-size: .2rem;
      color: #a2a5af;
    }
  }
}
.nav{
  display: flex;
  height: .9rem;
  box-sizing: border-box;
  padding: 0 .3rem;
  .item{
    width: 2rem;
    color: #222222;
    font-size:.28rem;
    height: .7rem;
    line-height: .7rem;
    text-align: center;
    margin-right: .3rem;
    &.active{
      background-color: #1775e1;
      color: #fff;
      border-radius: .5rem;
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
}
</style>
