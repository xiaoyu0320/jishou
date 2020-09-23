<template>
  <div class="bypass layout-child">
    <van-nav-bar title="子账号管理" left-arrow @click-left="back" class="navbg" @click-right="onClickRight">
      <template #right>
        <van-icon name="plus" size="18"/>
      </template>
    </van-nav-bar>
    <div class="header">
      <van-dropdown-menu style="width: 25%;">
        <van-dropdown-item @change="downchange" v-model="value" :options="option" />
      </van-dropdown-menu>
      <div class="title">余额</div>
      <div class="title">今日拼中</div>
      <div class="title">总拼中</div>
    </div>
    <div class="layout-scorll">
      <van-pull-refresh class="content" v-model="loading" @refresh="onRefresh">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item :name="index" class="bypass-item" v-for="(item, index) in list" :key="'by' + index"  disabled>
              <template #title>
                <div>
                  <van-checkbox shape="square" style="flex: 1;" :name="item.uid" @click="toggle" checked-color="#364087">
                    <div class="item">
                      <div class="img-wrap">
                        <div class="info">
                          <div class="tel">{{item.mobile}}</div>
                        </div>
                      </div>
                      <div class="price">{{(Number(item.asc)+Number(item.freeze_asc)).toFixed(2)}}ASC</div>
                      <div class="price">{{item.day_spelling}}</div>
                      <div class="num">{{item.spelling}}</div>
                    </div>
                    <div class="item">
                      <div v-show="item.enroll != ''" class="auto">{{item.enroll}}</div>
                      <div class="auto">
                        {{item.auto}}
                      </div>
                    </div>
                  </van-checkbox>
                </div>
              </template>
              <template #right-icon>
                <van-icon @click="active(index)" style="width: .5rem;" name="arrow-down" />
              </template>
              <div class="bypass-box">
                <div class="box" @click="go(item.uid, 0)">
                  <van-image width=".31rem" height=".3rem" :src="require('@s/my/zhongjiang.png')" />
                  <div>参与记录</div>
                </div>
                <div class="vertical"></div>
                <div class="box" @click="go(item.uid, 1)">
                  <van-image width=".31rem" height=".3rem" :src="require('@s/my/shoubi.png')" />
                  <div>收币</div>
                </div>
                <div class="vertical"></div>
                <div class="box" @click="go(item.uid, 2)">
                  <van-image width=".31rem" height=".3rem" :src="require('@s/my/zhuanbi.png')" />
                  <div>转币</div>
                </div>
                <div class="vertical"></div>
                <div class="box" @click="go(item.uid, 3)">
                  <van-image width=".31rem" height=".3rem" :src="require('@s/my/baoming.png')" />
                  <div>报名</div>
                </div>
                <div class="vertical"></div>
                <div class="box" @click="del(item)">
                  <van-image width=".31rem" height=".3rem" :src="require('@s/my/shanchu.png')" />
                  <div>删除</div>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </van-checkbox-group>
        <van-empty v-if="showEmpty" description="暂无数据" />
      </van-pull-refresh>
    </div>
    <div class="footer dp-flex">
      <div style="padding-left:.3rem">
        <van-checkbox v-model="checked" shape="square" @click="change" checked-color="#364087">全选</van-checkbox>
      </div>
      <div>
        <van-button color="linear-gradient(90deg, #364387 0%, #2d5096 100%), linear-gradient(#364087, #364087)" size="large" @click="show = true" type="info">批量操作</van-button>
      </div>
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="select"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import * as api from '@/api/my'
import { Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      value: 0,
      option: [
        { text: '全部', value: 0 },
        { text: '待开团', value: 2 },
        { text: '未参团', value: 1 }
      ],
      list: [],
      loading: false,
      showEmpty: false,
      result: [],
      checked: false,
      show: false,
      actions: [{ name: '批量收币(ASC)' }, { name: '批量转币(ASC)' }, { name: '批量报名' }],
      activeName: null,
      status: 0
    }
  },
  methods: {
    del (item) {
      let asc = (Number(item.asc) + Number(item.freeze_asc)).toFixed(2)
      Dialog.confirm({
        title: '删除子账号',
        message: '子账号余额：' + asc + ' ASC,BaaS码：' + item.baasCount + ' 个'
      })
        .then(() => {
          api.childDel({ uuid: item.uid }).then(res => {
            Toast.success(res.msg)
            this.count = -1
            this.page = 1
            this.list.length = 0
            Toast.success('删除成功')
            this.getList()
          })
        })
        .catch(() => {
          Toast.fail('已取消操作')
        })
    },
    toggle () {
      this.result.length == this.list.length ? this.checked = true : this.checked = false
    },
    downchange (val) {
      this.status = val
      this.page = 1
      this.list.length = 0
      this.showEmpty = false
      this.getList()
    },
    active (i) {
      if (this.activeName == i) {
        this.activeName = null
      } else {
        this.activeName = i
      }
    },
    onClickRight () {
      this.$router.push({
        path: '/my/createChild'
      })
    },
    go (uid, type) {
      let tmp = []
      switch (type) {
        case 0:
          this.$router.push({
            path: '/my/list',
            query: {
              cid: uid
            }
          })
          break
        case 1:
          tmp.push(uid)
          this.$router.push({
            path: '/my/turn',
            query: {
              type: 0,
              result: tmp
            }
          })
          break
        case 2:
          tmp.push(uid)
          this.$router.push({
            path: '/my/turn',
            query: {
              type: 1,
              result: tmp
            }
          })
          break
        case 3:
          tmp.push(uid)
          this.$router.push({
            path: '/grab/togother',
            query: {
              jsonstr: JSON.stringify(tmp)
            }
          })
          break
      }
    },
    select (action, index) {
      if (this.result.length == 0) {
        Toast.fail('请选择需要批量操作的子账号')
        return
      }
      switch (index) {
        case 0:
          this.$router.push({
            path: '/my/turn',
            query: {
              type: 0,
              result: this.result
            }
          })
          break
        case 1:
          this.$router.push({
            path: '/my/turn',
            query: {
              type: 1,
              result: this.result
            }
          })
          break
        case 2:
          this.$router.push({
            path: '/grab/togother',
            query: {
              jsonstr: JSON.stringify(this.result)
            }
          })
          break
      }
    },
    onCancel () {
      this.show = false
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
  .header {
    display: flex;
    align-items: center;
    font-size: .3rem;
    color: #292b34;
    padding: 0 0.3rem;
    box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
    .title {
      text-align: center;
      width: 25%;
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
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    color: #222222;
    font-size: .28rem;
    font-weight: bold;
    .auto {
      padding-right: 15px;
      color: #359F19;
    }
    .img-wrap {
      width: 25%;
      display: flex;
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .apply{
          color: chartreuse;
        }
      }
    }
    .price {
      width: 32%;
    }
    .num{
      flex: 1;
    }
  }
  .line {
    height: 1px;
    background: #666;
    opacity: 0.1;
  }
  .footer {
    box-shadow: 2px 0 12px rgba(100, 101, 102, 0.08);
    justify-content: space-between;
    background: #ffff;
    align-items: center;
    div{
      flex:1
    }
    ::v-deep  .van-button--info{
      background: #364087;
      border-color:#364087
    }
  }
  .bypass-item {
    ::v-deep .van-cell {
      padding-right: 0;
    }
  }
}
</style>
<style>
.bypass .van-dropdown-menu .van-dropdown-menu__bar {
  box-shadow: none !important;
}
.bypass .van-checkbox__label {
  width: 100%;
}
.bypass .van-collapse-item__content{
  background-color: #d7d8dd;
}
</style>
