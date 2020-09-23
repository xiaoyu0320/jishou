<template>
  <div class="foot">
    <div class="foot-box"
         v-if="foottype == 1">
      <a @click="golink(item)" class="foot-li" :class="{active:item.index==active}"
                   v-for="(item, index) in tabs"
                   :key="index"
                   :to="item.link">
        <img :src="item.img_n"
             class="img_n" /><img :src="item.img_y"
             class="img_y" />
        <label>{{ item.name }}</label>
      </a>
    </div>
  </div>
</template>

<script>
import { golinks } from '@/utils/utils'
import { Toast } from 'vant'
export default {
  props: {
    foottype: {
      type: Number
    }
  },
  data () {
    return {
      active: 1,
      tabs: [
        {
          img_n: require('@/assets/foot/zichan(wei).png'),
          img_y: require('@/assets/foot/zichan.png'),
          name: '资产',
          link: '/wallet/index',
          index: 0
        },
        {
          img_n: require('@/assets/foot/pintuan(wei).png'),
          img_y: require('@/assets/foot/pintuan.png'),
          name: '拼团',
          link: '/grab/index',
          index: 1
        },
        {
          img_n: require('@/assets/foot/xiaoxi(wei).png'),
          img_y: require('@/assets/foot/xiaoxi.png'),
          name: '消息',
          link: '/message/index',
          index: 2
        },
        {
          img_n: require('@/assets/foot/wode(wei).png'),
          img_y: require('@/assets/foot/wode.png'),
          name: '我的',
          link: '/my/index',
          index: 3
        }
      ]
    }
  },
  created () {
    this.tabs.map(item => {
      if (this.$route.path == item.link) {
        this.active = item.index
      }
    })
  },
  methods: {
    golink (item) {
      // if(item.index == 1|| item.index == 2) {
      //   Toast.fail('即将上线，敬请期待')
      //   return false
      // }
      this.active = item.index
      golinks(item)
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.tabs.map(data => {
          if (data.link == val.path) {
            this.active = data.index
          }
        })
      },
      // 深度观察监听
      deep: true
    }
  },
  components: {}
}
</script>
<style scoped lang="scss">
.foot {
  ul {
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      align-items: center;
      flex-direction: column;
      color: rgb(51, 51, 51);
      img {
        width: 6vw;
      }
      label {
        font-size: 0.2rem;
      }
    }
  }
}
.foot-box {
  border-top: 1px  solid #eee;
  background: #fff;
  padding: 0.1rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 1rem;
}
.foot-li {
  flex: 1;
  color: rgb(51, 51, 51);
  height: 100%;
}
.foot-li img {
  width: 0.4rem;
  height: auto;
  margin: 0.1rem auto;
  display: block;
}
.foot-li label {
  font-size: 0.2rem;
  display: block;
  text-align: center;
  color: #aab1ce;
}
.router-link-active {
  color: #e51c23;
}
.router-link-active .welath {
  color: #364387;
}
.foot-li .img_y {
  display: none;
}
.router-link-active .img_y {
  display: block;
  margin-bottom: 0.08rem;
}
.router-link-active .img_n {
  display: none;
}

/**acive */

.active .img_y {
  display: block;
  margin-bottom: 0.08rem;
}
.active label {
 color: #0b5cd7;
}
.active .img_n {
  display: none;
}

</style>
