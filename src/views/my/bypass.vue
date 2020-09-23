<template>
  <div @click="close" class="bypass layout-child">
    <van-nav-bar title="子账号管理" left-arrow @click-left="back" class="navbg">
      <template #right>
        <!-- <div class="fliter">
          <div @click.stop="showtriangle = !showtriangle">筛选 <img src="@s/grab/fliter.png" style="width:.24rem"></div>
          <div v-if="showtriangle" class="ez-triangle">
            <div @click.stop="downchange(0)" class="ez-box"><van-icon v-if="status == 0" name="success" />全部</div>
            <div @click.stop="downchange(1)" class="ez-box"><van-icon v-if="status == 1" name="success" />未参团</div>
            <div @click.stop="downchange(2)" class="ez-box"><van-icon v-if="status == 2" name="success" />参团中</div>
          </div>
        </div> -->
        <van-dropdown-menu active-color="#1775e1">
          <van-dropdown-item v-model="status" :options="option" @change="downchange" />
        </van-dropdown-menu>
      </template>
    </van-nav-bar>
    <div class="header">
      <div class="title">账号</div>
      <div class="title">余额</div>
      <div class="title">日/总拼中</div>
      <div class="title">可报</div>
    </div>
    <div class="layout-scorll">
      <van-pull-refresh class="content" v-model="loading" @refresh="onRefresh">
        <van-checkbox-group v-model="result" class="flex-all layout-scorll" ref="checkboxGroup" checked-color="#364087">
          <div class="box" v-for="(item,i) in list" :key="i">
              <van-checkbox ref="checkboxes" @click="toggle" checked-color="#364387" :name="item.uid">
              <div class="menu" >
                <div class="item" style="text-align:left">

                    {{item.mobile}}

                </div>
                <div class="item">{{(Number(item.asc)+Number(item.freeze_asc)).toFixed(2)}}epc</div>
                <div class="item"><span style="color: red;">{{item.day_spelling}}</span> / {{item.spelling}}</div>
                <div class="item">{{item.day_num}}</div>
              </div>
              <div class="status">{{item.enroll}}&nbsp;&nbsp; {{item.auto}}</div>
            </van-checkbox>
          </div>

        </van-checkbox-group>
        <van-empty description="暂无数据" v-if="showEmpty" />
        <!-- <div class="empty" @click.stop="onClickRight"  v-if="showEmpty">
          <div class="title">您还没创建子账号</div>
          <div class="btn">
            创建子号
          </div>
        </div> -->
      </van-pull-refresh>
    </div>
    <div class="footer">
      <van-checkbox v-model="checked"  @click="change" checked-color="#364387">全选</van-checkbox>
      <div class="footer-box" @click.stop="go(3)">
        <img src="@s/my/apply.png" style="width:.24rem">
        <label>报名</label>
      </div>
      <div class="footer-box" @click.stop="go(2)">
        <img src="@s/my/turn.png" style="width:.24rem">
        <label>转币</label>
      </div>
      <div class="footer-box more">
        <img src="@s/my/more.png" style="width:.24rem">
        <label @click.stop="showmore = !showmore">更多操作</label>
        <div v-if="showmore" class="ez-triangle">
          <div @click.stop="onClickRight" class="ez-box">创建子账号</div>
          <div class="ez-box" @click="del">删除</div>
          <div class="ez-box" @click.stop="go(1)">收币</div>
        </div>
      </div>
      <van-popup v-model="show"  :style="{ width: '80%' }">
        <div class="pop-box">
            <div class="pop-tit">删除子账号</div>
            <div class="scrool">
               <div class="list-item" v-for="(del,i) in delArr" :key="i">
                <div class="pop-item"> {{del.mobile}}的资产：{{(Number(del.asc)+Number(del.freeze_asc)).toFixed(2)}}epc，寄售码：{{del.baasCount}}个</div>
              </div>
            </div>

            <div class="opeate">
              <van-button size="small" @click="cancel" class="cancel">取消</van-button>
               <van-button size="small" class="sure" @click="sure">确定</van-button>
            </div>
        </div>

      </van-popup>
    </div>
  </div>

</template>

<script>
import * as api from '@/api/my'
import { Toast } from 'vant'
export default {
  data () {
    return {
      list: [],
      loading: false,
      showEmpty: false,
      result: [],
      checked: false,
      activeName: null,
      status: 0,
      showtriangle: false,
      showmore: false,
      delArr: [],
      show: false,
      option: [
        { text: '全部', value: 0 },
        { text: '未参团', value: 1 },
        { text: '参团中', value: 2 }
      ]
    }
  },
  methods: {
    cancel () {
      this.show = false
    },
    sure () {
      let str = JSON.stringify(this.result)
      api.childDel({ uuid: str }).then(res => {
        Toast.success(res.msg)
        this.show = false
        this.$router.push({
          path: '/my/delresult',
          query: {
            str: JSON.stringify(res.data)
          }
        })
      })
    },
    close () {
      this.showtriangle = false
      this.showmore = false
    },
    del () {
      if (this.result.length <= 0) {
        Toast.fail('请选择需要操作的子账号')
        return false
      }
      this.delArr = []
      this.show = true
      this.list.forEach(element => {
        this.result.forEach(data => {
          if (element.uid == data) {
            this.delArr.push(element)
          }
        })
      })
    },
    toggle () {
      this.result.length == this.list.length ? this.checked = true : this.checked = false
    },
    downchange () {
      console.log(this.status)
      this.list.length = 0
      this.close()
      this.showEmpty = false
      this.getList()
    },
    onClickRight () {
      this.$router.push({
        path: '/my/createChild'
      })
    },
    go (type) {
      if (this.result.length == 0) {
        Toast.fail('请选择需要操作的子账号')
        return
      }
      switch (type) {
        case 1:
          // 批量收币
          this.$router.push({
            path: '/my/turn',
            query: {
              type: 0,
              result: this.result
            }
          })
          break
        case 2:
          // 批量转币
          this.$router.push({
            path: '/my/turn',
            query: {
              type: 1,
              result: this.result
            }
          })
          break
        case 3:
          // 批量报名
          this.$router.push({
            path: '/grab/togother',
            query: {
              jsonstr: JSON.stringify(this.result)
            }
          })
          break
      }
    },
    change () {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true)
      } else {
        this.$refs.checkboxGroup.toggleAll()
      }
    },
    onRefresh () {
      this.getList()
    },
    async getList () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      await api.childrenList({ status: this.status }).then(res => {
        const { data } = res
        this.list = data
        this.$forceUpdate()
        if (this.list.length == 0) {
          this.showEmpty = true
        }
        this.loading = false
        Toast.clear()
      })
    },
    back () {
      this.$router.push({
        path: '/my/index'
      })
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.bypass {
  .more{
    position: relative; /*日常相对定位*/
    .ez-triangle {
      right: 0;
      bottom: 0.6rem;
      &:before {
        content: "";
        border-top-color: #f5f6f7;
        right: .4rem;
        bottom: -.3rem;
      }
    }
  }
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
    display: flex;
    align-items: center;
    font-size: .3rem;
    color: #292b34;
    padding: 0.3rem;
    .title {
      text-align: center;
      width: 25%;
      font-weight: bold;
      &:nth-of-type(2) {
        width: 35%;
      }
      &:nth-of-type(3) {
        width: 33%;
      }
      &:nth-of-type(4) {
        width: 15%;
        text-align: right;
      }
    }
  }
  .bypass-item{
    .bypass-box{
      display: flex;
      justify-content: space-around;
      color: #364087;
      font-size: .18rem;
      align-items: center;
      .vertical{
        height: .36rem;
        border-left: solid 1px #ffffff;
        transform: scaleX(0.5);
      }
      .box{
        text-align: center;
      }
    }
  }
  .box {
    background: #fff;
    padding: .3rem;
    border-bottom: 1px solid #eee;
      ::v-deep  .van-checkbox {
        align-items: start;
        width: 100%;
      }
      ::v-deep .van-checkbox__label {
         width: 100%;
      }

    .status {
      color: #359F19;
      padding-top: .1rem;
    }
  }
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item {
      font-size: .24rem;
      color: #222;
      text-align: center;
      width: 25%;
      ::v-deep .van-checkbox__label {
        color: #222;
      }
      &:nth-of-type(1) {
        width: 16%;
      }
      &:nth-of-type(2) {
        width: 30%;
        margin-right: .25rem;
        text-align: center;
      }
      &:nth-of-type(4) {
        width: 15%;
        padding-right: .25rem;
        text-align: right;
      }
    }
  }
  .line {
    height: 1px;
    background: #666;
    opacity: 0.1;
  }
  .footer {
    display: flex;
    box-shadow: 2px 0 12px rgba(100, 101, 102, 0.08);
    justify-content: space-between;
    background: #ffff;
    align-items: center;
    padding: .3rem;
    color: #222222;
    font-size: .28rem;
    .footer-box {
      label{
        padding-left: .1rem;
      }
    }
  }
  .bypass-item {
    ::v-deep .van-cell {
      padding-right: 0;
    }
  }
}
.pop-box {
  padding: .5rem;
  background: #fff;
  .pop-tit{
    margin-bottom: .2rem;
    text-align: center;
    font-size: .32rem;
  }
  .list-item {
    font-size: .24rem;
    margin-bottom: .2rem;
  }
  .opeate {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .42rem;
    .cancel {
      border-color: #364487;
      color: #364487;
      background: none;
      margin-right:.2rem
    }
    .sure {
      background: #364487;
      color: #fff;
       border-color: #364487;
    }
  }
}
.empty{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  .title{
    color: #8d92a1;
    font-size: .32rem;
    padding-bottom: .4rem;
  }
  .btn {
    color: #304b91;
    font-size: .28rem;
    border-radius: 4px;
    border: solid 1px #304b91;
    padding: .1rem .3rem;
  }
}
.scrool {
  height: 2rem;
    overflow-y: auto;
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
