<template>
  <div class="my mybg layout-child">
    <div class="my-contnet layout-scorll">
      <div class="top">
        <van-image fit="fill" round lazy-load width="1.25rem" height="1.25rem" :src="userinfo.avatar.small_pic" />

        <div class="content">
          <div class="head dp-flex">
            <div class="title">
              {{returnName(userinfo)}}
              <span v-if="userinfo.is_node == 1">(节点)</span>
            </div>

            <van-image fit="fill"  width=".5rem" :class="{bd:userinfo.level==6}"  :src="returnLv(userinfo.level)" />
          </div>
          <div class="code">
            邀请码：{{userinfo.invite_code}}
          </div>
        </div>
      </div>
      <div class="bar">
        <div class="item" @click="go('/my/community')">
          <van-image fit="fill" width=".34rem" height=".32rem" :src="require('@s/my/wodeshequ.png')" alt />
          <div class="title">我的社区</div>
          <van-icon name="arrow" />
        </div>
        <div class="item" @click="go('/my/baasYard')">
          <van-image fit="fill" width=".35rem" height=".24rem" :src="require('@s/my/baasma.png')" />
          <div class="title">我的寄售码</div>
          <van-icon name="arrow" />
        </div>
        <div class="item" @click="go('/wallet/bill')" >
          <van-image fit="fill" width=".31rem" height=".31rem" :src="require('@s/my/yaoqing.png')" alt />
          <div class="title">邀请</div>
          <van-icon name="arrow" />
        </div>
        <div class="line"></div>
        <div class="item" @click="go('/my/bypass')">
          <van-image fit="fill" width=".29rem" height=".31rem" :src="require('@s/my/zizhanghao.png')" alt />
          <div class="title">子账号管理</div>
          <van-icon name="arrow" />
        </div>
        <div class="item" @click="go('/my/setting')">
          <van-image fit="fill" width=".3rem" height=".3rem" :src="require('@s/my/shezhi.png')" alt />
          <div class="title">设置</div>
          <van-icon name="arrow" />
        </div>
        <!-- <div class="item" @click="go('/my/security')">
          <van-image fit="fill" width=".4rem" height=".41rem" :src="require('@s/my/an.png')" alt />
          <div class="title">安全中心</div>
          <van-icon name="arrow" />
        </div> -->
        <div class="item" @click="go('/download?code='+userinfo.invite_code)">
          <van-image fit="fill" width=".35rem" height=".25rem" :src="require('@s/my/xiazai.png')" alt />
          <div class="title">下载APP</div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'vant'
export default {
  data () {
    return {
      active: 0
    }
  },
  methods: {
    returnName (info) {
      if (info.nickname != '' && info.nickname != null) {
        return info.nickname
      } else {
        return info.mobile_hide
      }
    },
    returnLv (lv) {
      switch (Number(lv)) {
        case 0:
          return require('@s/my/v0.png')
        case 1:
          return require('@s/my/v1.png')
        case 2:
          return require('@s/my/v2.png')
        case 3:
          return require('@s/my/v3.png')
        case 4:
          return require('@s/my/v4.png')
        case 5:
          return require('@s/my/v5.png')
        case 6:
          return require('@s/my/hehuoren.png')
      }
    },
    go (url) {
        this.$router.push({
          path: url
        })  
      // if(url == '/my/setting') {
       
      //   return
      // }
      // Toast.fail('即将上线，敬请期待')
     
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  created () {
    this.$store.dispatch('setBottomType', 1)
  }
}
</script>
<style lang='scss' scoped>
.mybg{
  background: url('~@s/my/wodebeijing.png') no-repeat;
  background-size: contain;
  background-position: 100% 0;
}
.my-contnet{
  padding: 0 .3rem;
  flex-direction: column;
  display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;      /* TWEENER - IE 10 */
  display: -webkit-flex;     /* NEW - Chrome */
  display: flex;
  }
.top {
  box-sizing: border-box;
  padding: .7rem .3rem 1rem .3rem;
  display: flex;
  .content{
    padding-left: .4rem;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    .head{
      align-items: center;
    }
    .title{
      color: #ffffff;
      font-size: .4rem;
      padding-right: .2rem;
    }
    .code{
      color: #ffffff;
      font-size: .24rem;
    }
  }
}
.bar{
  padding: .3rem;
  background-color: #ffffff;
  .item{
    padding: .3rem 0;
    display: flex;
    align-items: center;
    margin-bottom: .2rem;
    ::v-deep .van-icon {
      color: #c9c9c9;
    }
    .title{
      margin-left: .25rem;
      flex: 1;
      color: #2a2d31;
      font-size: .28rem;
    }
  }
}
.line {
  height: 1px;
  background: #666;
  opacity: 0.1;
  margin-bottom: .3rem;
}
.bd{
  width:.75rem!important
}
</style>
