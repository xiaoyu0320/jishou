<template>
  <div class="security layout-child">
    <van-nav-bar title="安全中心" left-arrow @click-left="back" />
    <div class="list">
      <van-cell @click="go('/my/replacePhone')" title="绑定手机" is-link />
      <van-cell @click="go('/my/modifyPassword')" title="修改登录密码" is-link />
      <van-cell @click="go('/my/modifyPayPassword')" title="修改资金密码" is-link />
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
    }
  },
  methods: {
    // 跳转路由地址
    go (url) {
      this.$router.push({
        path: url
      })
    },
    back () {
      this.$router.back()
    }
  },
  created () {
    store.dispatch('setBottomType', 0)
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.security {
  .top {
    background: #fff;
    padding-top: 25px;
    padding-bottom: 25px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-bottom: 10px solid #f5f5f5;
    span {
      width: 13.5vw;
      height: 13.5vw;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 10px;
      border: 1px solid #ffe1b0;
      img {
        width: 100%;
      }
    }
  }
  .list {
    background: #fff;
    display: flex;
    flex-direction: column;
  }
}
</style>
