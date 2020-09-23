<!--  -->
<template>
<div  @click="close"  class='togother  layout-child'>
   <van-nav-bar title="选择账号"  left-arrow @click-left="back" style="z-index:999" >
      <template #right>
       <van-dropdown-menu active-color="#1775e1">
          <van-dropdown-item v-model="status" :options="option" @change="downchange" />
        </van-dropdown-menu>
      </template>
    </van-nav-bar>
  <!-- <div class="menu td">
     <div class="item">账号</div>
     <div class="item">余额</div>
     <div class="item">拼中</div>
     <div class="item">可报</div>
  </div> -->
   <div class="report-box flex1">
      <div class="ex">说明：选择子账号一起拼团，冻结的是对应的子账号的epc</div>
    </div>

  <van-checkbox-group v-model="result" class="flex-all layout-scorll" ref="checkboxGroup" checked-color="#364087" v-if="list.length>0">
    <div class="box" v-if="list.length>0">
      <div class="menu" >
          <div class="item f-bold" style="width: 1.25em;"></div>
          <div class="item f-bold" style="width:30%;text-align:left;padding-left:5%">账号</div>
          <div class="item f-bold"  style="width:29%">余额</div>
          <div class="item f-bold"  style="width:30%;padding-left:2%">日/总拼中</div>
          <div class="item f-bold" style="text-align:center;width:15%">可报</div>
      </div>
    </div>
    <div class="box" v-for="(item,i) in list" :key="i">

      <van-checkbox ref="checkboxes"   icon-size="15px"  @click="toggle" checked-color="#1989fa" :name="item.uid">
      <div class="menu" @click="toggle">
          <div class="item" style="width:30%">
              {{item.mobile}} <label class="zhuhao" v-if="item.status==1">主号</label>
          </div>
          <div class="item"  style="width:29%">{{(Number(item.asc)+Number(item.freeze_asc)).toFixed(2)}}epc</div>
          <div class="item" style="width:35%;padding-left:2%"><span style="color: red;">{{item.day_spelling}}</span> / {{item.spelling}}</div>
          <div class="item" style="text-align:center;width:15%">{{item.day_num  }}</div>
      </div>
       <div class="status"  v-if="item.enroll || item.auto"><span>{{item.enroll}}</span>&nbsp;&nbsp;<span>{{item.auto}}</span> </div>
      </van-checkbox>
    </div>

  </van-checkbox-group>
  <van-empty description="暂无数据" v-else />
  <div class="foot">
    <div style="padding-left:.3rem"> <van-checkbox v-model="checkAll" @click="choice" checked-color="#1989fa" icon-size="15px">全选</van-checkbox></div>

    <div><van-button class="pintuan-btn" size="large" @click.stop="confirm"  type="info">确定</van-button></div>
  </div>
</div>
</template>

<script>
import * as api from '@/api/wallet'
import { Toast } from 'vant'
export default {
  components: {},
  data () {
    return {
      result: [],
      list: [],
      checkAll: false,
      option: [
        { text: '全部', value: 0 },
        { text: '未参团', value: 1 },
        { text: '参团中', value: 2 }
      ],
      value: 0,
      status: 0,
      clickAbled: false,
      showtriangle: false
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    close () {
      this.showtriangle = false
    },
    downchange (val) {
      this.showtriangle = false
      this.list = []
      this.getlist()
    },
    toggle () {
      this.result.length == this.list.length ? this.checkAll = true : this.checkAll = false
    },
    back () {
      this.$router.back()
    },
    choice () {
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
      api.userList({ status: this.status }).then(res => {
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
      this.$router.push({
        path: '/grab/report',
        query: {
          jsonstr: JSON.stringify(this.result)
        }
      })
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.getlist()
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.fliter{
    position: relative; /*日常相对定位*/
    z-index: 99;
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
  .f-bold {
    font-weight: bold;
  }
 .header {
    display: flex;
    align-items: center;
    font-size: .3rem;
    color: #292b34;
    padding: 0.3rem;
    // box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
    z-index: 9;
    div{
      width: 25%;
    }
    ::v-deep .van-dropdown-menu__bar {
      box-shadow: none;
    }
     ::v-deep .van-dropdown-menu__title .van-ellipsis{
        font-weight: bold;
      }
    .title {
      text-align: center;
      font-weight: bold;

    }
  }
  .trbg {
  background:#364087 !important;
}
.box {
  border-bottom: 1px solid #eee;
  background: #fff;
  padding: .3rem;
  ::v-deep  .van-checkbox {
     align-items: start;
  }
   ::v-deep .van-checkbox__label {
         width: 100%;
  }
  .status {
    span {
      border: solid 1px #fcae17;
      border-radius: 10px;
      color: #fcae17;
      padding: 0 .1rem;
    }
    color: #359F19;
    padding-top: .1rem;
  }
}
.menu {
  display: flex;
  justify-content: space-between;

  align-items: center;
  ::v-deep .van-checkbox {
    width: 100%;
    flex-direction: column;
  }
  .item {
    color: #222;
    text-align: center;
    width: 25%;

     &:nth-of-type(1) {
      width: 30%;
      text-align: left;
    }
     &:nth-of-type(2) {
      width: 25%;
      text-align: center;
    }

    ::v-deep .van-checkbox__label {
      color: #222;
    }
  }
}
.td {
  .item {
    font-size: .3rem;
    font-weight: 600;
    color: #292b34;

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
.ex {
    text-align: left;
    color: #fe9436;
    font-size: 0.24rem;
    line-height: 0.49rem;
    padding: .1rem 0.22rem;
    background-color: #f8f8f9;
    border-radius: .3rem;
    width: 90%;
    margin:.2rem auto 0;
}
  .zhuhao {
      padding: .1rem;
      background:#f8f8f9 ;
      color: #fe8f38;
      border-radius: 50%;
    }
</style>
<style>
 .van-dropdown-menu__bar {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: .53rem;
    width: 1.5rem;
    border-radius: .27rem;
    font-size: .24rem;
    background-color: #f8f9fb;
    line-height: .53rem;
    box-shadow: none;
 }
 .van-dropdown-menu__title {
   font-size: .24rem;
   padding: 0 8px 0 0;
 }
 .van-dropdown-item__option--active .van-dropdown-item__icon {
   color: #1775e1!important;
   font-size: .3rem!important;
 }
</style>
