<!--  -->
<template>
<div class='result common-bg1 layout-child'>
    <van-nav-bar  title="参团结果" left-arrow @click-left="golink('/grab/index')"  class="trbg"/>
    <div class="container bindbox layout-scorll">
      <!-- <div class="alin">
         <van-image
          round
          width="1.5rem"
          height="1.5rem"
          :src="require('@s/wallet/chenggong.png')"
        />
      </div> -->

       <div class="list" v-for="(item,i) in list" :key="i">
          <div class="item">
             <div class="cell">{{item.mobile}}</div>
             <div class="cell" :class="{lost:item.type == 0}">{{item.status}}</div>
             <div class="cell"><span v-if="item.total_fee">{{item.total_fee}}epc</span></div>
          </div>
       </div>
       <div class="opeate">
          <van-button class="btn1 " @click="golink('/grab/list')">参与记录</van-button>
          <van-button class="btn2 pintuan-btn" @click="golink('/grab/report')">继续报团</van-button>
       </div>
    </div>
    <div class="box">
      <van-button class="btn pintuan-btn" @click="golink('/wallet/bill')" size="large" type="info">邀请好友去参与 </van-button>
    </div>
</div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      list: []
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    golink (url) {
      this.$router.push({
        path: url
      })
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.list = JSON.parse(this.$route.query.data)
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.common-bg {
  background: #364087;
}
.lost {
  color: red!important;
}
    .alin {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title {
      color: #ffffff;
      font-size: .5rem;
      text-align: center;
      padding: .4rem 0;
      font-weight: bold;
    }
    .container {
      background: #fff;
      padding: .5rem;
      .s-title {
        font-size: .42rem;
        font-family: PingFang-SC-Bold;
        color: #222;
        font-weight: 600;
      }
      .list {
        margin-top: .4rem;
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: .4rem;
           .cell {
             font-size: .3rem;
             color: #222;
             font-weight: bold;
             &:last-child {
               color: #8c91a0;
             }
            }
        }

      }
      .opeate{
        display: flex;
        justify-content: center;
        margin-top: .8rem;
        .btn1 {
          margin-right: .4rem;
          height: .72rem;
          background: none;
          border: solid 1px #364087;
          color: #364087;
        }
        .btn2 {
          color: #fff;
          height: .72rem;
        }
      }
    }
    .box {
      width: 90%;
      margin: .5rem auto;
      ::v-deep .van-button {
        border-radius: .1rem;
      }
    }
</style>
