<!--  -->
<template>
<div class='togother  layout-child'>
  <!-- <van-nav-bar  title="选择账户" left-arrow @click-left="back" /> -->
   <van-nav-bar title="选择账户" left-arrow @click-left="back" >
      <!-- <template #right>
        <div class="fliter">
          <div @click.stop="showtriangle = !showtriangle">筛选 <img src="@s/grab/fliter.png" style="width:.24rem"></div>
          <div v-if="showtriangle" class="ez-triangle">
            <div @click.stop="downchange(2)" class="ez-box"><van-icon v-if="status == 2" name="success" />参团中</div>
            <div @click.stop="downchange(1)" class="ez-box"><van-icon v-if="status == 1" name="success" />未参团</div>
            <div @click.stop="downchange(0)" class="ez-box"><van-icon v-if="status == 0" name="success" />全部</div>
          </div>
        </div>
      </template> -->
    </van-nav-bar>
  <div class="header">
    <div class="title" style="padding-right: 1rem;">账号</div>
    <div class="title">可用寄售码</div>
    <div class="title">累计寄售码</div>
  </div>
  <!-- <van-checkbox-group v-model="result" class="flex-all layout-scorll" ref="checkboxGroup" checked-color="#364087" v-if="list.length>0">
    <div class="menu" v-for="(item,i) in list" :key="i">
      <div class="item">
        <van-checkbox ref="checkboxes" shape="square" @click="toggle" checked-color="#364087" :name="item.uid">
          {{item.mobile}} <label v-show="item.name != ''">{{'(' + item.name + ')'}}</label>
        </van-checkbox>
      </div>
      <div class="item">{{item.baas}}个</div>
      <div class="item">{{item.total_baas}}个</div>
    </div>
  </van-checkbox-group> -->
  <van-radio-group v-model="radio" class="flex-all layout-scorll" v-if="list.length>0">
    <div class="menu" v-for="(item,i) in list" :key="i">
      <div class="item">
        <van-radio :name="item.uid" checked-color="#364087" shape="square">
          {{item.mobile}} <label v-show="item.name != ''">{{'(' + item.name + ')'}}</label>
        </van-radio>
      </div>
      <div class="item">{{item.baas}}个</div>
      <div class="item">{{item.total_baas}}个</div>
    </div>
  </van-radio-group>
  <van-empty description="暂无数据" v-else />
  <div class="box">
    <van-button color="linear-gradient(90deg, #364387 0%, #2d5096 100%), linear-gradient(#364087, #364087)" size="large" @click="confirm" type="info">确定</van-button>
  </div>
  <!-- <div class="foot">
    <div style="padding-left:.3rem"> <van-checkbox v-model="checkAll" @click="choice" checked-color="#364087" shape="square" icon-size="24px">全选</van-checkbox></div>
    <div><van-button class="pintuan-btn" size="large" @click="confirm"  type="info">确定</van-button></div>
  </div> -->
</div>
</template>

<script>
import * as api from '@/api/my'
import { Toast } from 'vant'
export default {
  components: {},
  data () {
    return {
      result: [],
      list: [],
      checkAll: false,
      clickAbled: false,
      radio: '',
      item: {},
      showtriangle: false,
      status: ''
    }
  },
  // 方法集合
  methods: {
    toggle () {
      this.result.length == this.list.length ? this.checkAll = true : this.checkAll = false
    },
    back () {
      this.$router.back()
    },
    choice (e) {
      if (this.checkAll) {
        this.$refs.checkboxGroup.toggleAll(true)
      } else {
        this.$refs.checkboxGroup.toggleAll()
      }
    },
    getlist () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      api.exchangeUser({}).then(res => {
        Toast.clear()
        this.list = res.data.list
        this.list.forEach((item, i) => {
          if (item.status == 1 && !this.$route.query.jsonstr) {
            this.result[i] = item.uid
          }
        })
        if (this.$route.query.jsonstr) {
          let arr = JSON.parse(this.$route.query.jsonstr)
          this.result = this.result.concat(arr)
        }
      })
    },
    confirm () {
      if (this.radio == '') {
        Toast.fail('请选择账户')
        return
      }
      this.list.forEach(item => {
        if (item.uid == this.radio) {
          this.item = item
        }
      })
      let result = JSON.stringify(this.item)
      sessionStorage.setItem('result', result)
      this.$router.push({
        path: '/my/baasTrade'
      })
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.getlist()
  }
}
</script>
<style lang="scss" scoped>
.fliter{
    position: relative; /*日常相对定位*/
    .ez-triangle {
      right: 0;
      top: 0.6rem;
      &:before {
        content: "";
        border-bottom-color: #f5f6f7;
        right: .4rem;
        top: -.3rem;
      }
    }
  }
.header {
  font-family: PingFang-SC-Bold;
  display: flex;
  align-items: center;
  font-size: .28rem;
  color: #222222;
  padding: .3rem;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
  .title{
    text-align: center;
    width: 40%;
    &:nth-of-type(2) {
      width: 30%;
    }
    &:nth-of-type(3) {
      width: 30%;
      text-align: right;
    }
  }
}
.trbg {
  background:#364087 !important;
}
.menu {
  display: flex;
  background: #fff;
  padding: .3rem;
  border-bottom: 1px solid #eee;
  align-items: center;
  .item {
    font-family: DIN-Medium;
    color: #222;
    font-size: .3rem;
    ::v-deep .van-checkbox__label {
      color: #222;
    }
    width: 40%;
    &:nth-of-type(2) {
      text-align: center;
      width: 30%;
    }
    &:nth-of-type(3) {
      width: 30%;
      text-align: right;
    }
  }
}
.flex-all {
  flex: 1;
}
.foot {
  display: flex;
  justify-content: space-between;
  background: #ffff;
  align-items: center;
  div{
    flex:1
  }
}
.togother{
  ::v-deep .van-empty{
    flex:1
  }
}

.box{
  padding: .3rem;
  ::v-deep  .van-button{
    border-radius: .16rem;
  }
  .btn{
    margin-top: .4rem;
  }
}
.ez-triangle {
  font-family: PingFang-SC-Medium;
  position: absolute;
  z-index: 2500;
  width: 3rem;
  border-radius: 5px;
  background: #f5f6f7;
  letter-spacing: 1px;
  padding: 0 .3rem;
  box-sizing: border-box;
  &:before {
    content: "";
    display: block;
    position: absolute;
    width:0;
    height: 0;
    border: .15rem solid transparent;
  }
  .ez-box{
    padding: .3rem 0;
    border-bottom: 1px solid transparent;
    border-bottom-color: #eeeeee;
    font-size: .3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &:last-child{
      border: none;
    }
    ::v-deep .van-icon{
      font-size: .3rem!important;
    }
  }
}
</style>
