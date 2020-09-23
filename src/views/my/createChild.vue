<!--  -->
<template>
<div class='create common-bg1 layout-child'>
  <van-nav-bar title="创建子账号" left-arrow @click-left="back"  class="trbg"/>
  <div class="content layout-scorll">
    <div class="content-box">
      <div class="input">
        <van-field v-model="number" type="digit" placeholder="输入要创建子账号的数量"/>
      </div>
    </div>
    <div class="login-bottom">
      <van-button color="linear-gradient(90deg, #364387 0%, #2d5096 100%), linear-gradient(#364087, #364087)" size="large" @click="save" type="info">确认</van-button>
    </div>
  </div>
</div>
</template>

<script>
import * as api from '@/api/my'
import { Toast } from 'vant'
export default {
  components: {},
  data () {
    return {
      number: '',
      stop: false
    }
  },
  methods: {
    save () {
      if (this.number == '') {
        Toast.fail('子账号数量不能为空')
        return
      }
      if (this.stop) {
        return
      }
      this.stop = true
      let obj = {
        number: this.number
      }
      api.postChildren(obj).then(res => {
        Toast.success('操作成功')
        this.$router.push({
          path: '/my/childResult',
          query: {
            list: res.data
          }
        })
      }).catch(() => {
        this.stop = false
      })
    },
    back () {
      this.$router.back()
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
  }
}
</script>
<style lang='scss' scoped>
.content{
  padding: 1rem .3rem;
  display: flex;
  flex-direction: column;
  .content-box{
    flex: 1;
    background-color: #ffffff;
    box-shadow: 0px 9px 29px 0px rgba(36, 40, 59, 0.11);
    border-radius: .4rem;
    overflow: hidden;
    padding: .7rem .3rem;
    .input{
      ::v-deep  .van-cell {
        padding: .3rem 0 !important;
      }
      border-bottom: 1px solid #d9dce5;
    }
  }
}
.login-bottom {
  margin-top: .7rem;
  ::v-deep  .van-button{
    border-radius: .16rem;
  }
}
</style>
