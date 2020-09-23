<!--  -->
<template>
<div class='index layout-child'>
    <van-nav-bar  >
      <template #left>
        <img src="@s/new/fliter.png" style="width:.35rem">
      </template>
      <template #title>
        <van-search
          v-model="content"
          shape="round"
          placeholder="请输入搜索关键词"
          >
            <template #left-icon>
                <img src="@s/new/scan.png" style="width:.31rem">
            </template>
            <template #right-icon>
                <img src="@s/new/search.png" style="width:.29rem">
            </template>
          </van-search>
      </template>
      <template #right>
        <img src="@s/new/msg.png" style="width:.35rem">
      </template>
  </van-nav-bar>
  <div class="container">
     <div class="banner">
      <van-row gutter="20">
        <van-col span="24"><img src="@s/new/banner.png"></van-col>
      </van-row>
     </div>
     <div class="menu">
         <div class="item" v-for="(item,i) in menu" :key="i">
            <img src="@s/new/jd.png">
            {{item.name}}
         </div>
     </div>
     <div class="scorll">
        <div class="left">
            <img src="@s/new/shopM.png">
             <div class="msg">
               <div class="list">
                  <div class="item">千元商品联购专场</div>
                  <div class="item">邀请好友活力多多</div>
               </div>
            </div>
        </div>
        <div class="right">
            <div class="icon">
               <van-icon name="arrow" color="#759a74"/>
            </div>
        </div>
     </div>
     <div class="title">
        <h3>爆款推荐</h3><span>限时抢购</span>
     </div>
     <div class="shop">
           <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(shop1,index) in recommend" :key="index"  >
                  <div class="box">
                     <img src="@s/new/zs.png">
                     <div class="info">
                        <div class="title">{{shop1.title}}</div>
                        <div class="price">￥<span>{{shop1.price}}</span> </div>
                        <div class="cost-price">￥{{shop1.cost_price}}</div>
                    </div>
                   </div>
                </div>
             </div>
           </div>
     </div>
     <div class="shops">
       <img src="@s/new/jg-banner.png" class="bg-banner">
       <van-tabs v-model="active" :border="false">
            <van-tab  v-for="(menu,k) in menu2" :key="k" :title="menu.name" :name="menu.type">
               <div class="pp-box">
                   <div class="item" v-for="(item,i) in list" :key="i">
                       <img src="@s/new/zs.png" />
                       <div class="info">
                           <div class="titles">
                               {{item.title}}
                           </div>
                           <div class="price">
                               <span>￥{{item.price}}</span>
                               <van-button class="btn">马上抢</van-button>
                           </div>
                       </div>
                   </div>
               </div>
            </van-tab>
        </van-tabs>
     </div>
  </div>
</div>
</template>

<script>
const Swiper = window.Swiper
export default {
  components: {},
  data () {
    return {
      active: 0,
      content: '',
      funEvent: null,
      menu: [
        { name: '爆款' },
        { name: '爆款' },
        { name: '爆款' },
        { name: '爆款' },
        { name: '爆款' },
        { name: '爆款' },
        { name: '爆款' },
        { name: '爆款' },
        { name: '爆款' },
        { name: '爆款' }
      ],
      recommend: [{
        title: '泰迪珍藏联名...',
        price: '2999.00',
        'cost_price': '3999.00'
      }, {
        title: '泰迪珍藏联名...',
        price: '2999.00',
        'cost_price': '3999.00'
      }, {
        title: '泰迪珍藏联名...',
        price: '2999.00',
        'cost_price': '3999.00'
      }, {
        title: '泰迪珍藏联名...',
        price: '2999.00',
        'cost_price': '3999.00'
      }],
      menu2: [{
        name: '品牌名称',
        type: 0
      }, {
        name: '100元区',
        type: 1
      }, {
        name: '300元区',
        type: 2
      }, {
        name: '500元区',
        type: 3
      }, {
        name: '1000元区',
        type: 4
      }],
      list: [{
        title: '全铜免打孔肥皂盒香皂架网不锈钢单碟玻璃...',
        price: '101.00'
      }, {
        title: '全铜免打孔肥皂盒香皂架网不锈钢单碟玻璃...',
        price: '101.00'
      },
      {
        title: '全铜免打孔肥皂盒香皂架网不锈钢单碟玻璃...',
        price: '101.00'
      }]
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {

  },
  created () {

  },
  mounted () {
    let cardSwiper = new Swiper('.swiper-container', {
      slidesPerView: 2.8,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }

    })
    this.funEvent = cardSwiper
  }
}
</script>
<style lang="scss" scoped>
  .index {
    font-size: .24rem;
    ::v-deep .van-nav-bar__title {
      max-width: 80%;
      width: 80%;
    }
    ::v-deep .van-field__left-icon, .van-field__right-icon {
        display: flex;
        align-items: center;
    }
    ::v-deep .van-search__content {
        background: none;
        border: 1px solid #eee;
    }
    ::v-deep  .van-search {
          background: none;
      }
    .container {
      margin:0 .3rem;
    }
    .banner {
      img {
        width: 100%;
      }
    }
    .menu {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top:.4rem;
      .item {
        font-size: .24rem;
        color: #2b2f32;
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: .4rem;
         img {
          width:.85rem;
          padding-bottom:.1rem
        }
      }
    }
    .scorll {
      background:#dcffdb ;
      padding: .1rem .3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: .2rem;
      margin-bottom: .4rem;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: .58rem;
          margin-right: .2rem;
        }
        .item {
          margin-bottom: .1rem;
          position: relative;
          padding-left: .2rem;
          color: #23492a;
          &::before {
            display: block;
            content: '';
            width: .06rem;
            height: .1rem;
            border-radius: 3px;
            background: #fe685a;
            position: absolute;
            left: 0px;
            top: 50%;
            margin-top:-.05rem;
          }
          &:last-child {
            margin-bottom: 0;
          }

        }
      }
    }
    .title {
      display: flex;
      align-items: flex-end;
      margin-bottom: .2rem;
      h3 {
        font-size: .36rem;
        color: #2b2e32;
        margin-right: .2rem;
      }
      span {
        color: #a4acb5;
        font-size: .24rem;
      }
    }
    .shop {
        .box {
            background-color: #fff;
            border-radius: .2rem;
            box-shadow: 0px 8px 14px 1px rgba(219, 223, 230, 0.2);
            margin-bottom: .1rem;
            img {
                 width: 100%;
            }
        }
        .info {
            .title {
                font-size: .3rem;
                color: #2b2e32;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .price {
                color: #ff672b;
                font-size: .24rem;
                span {
                    font-size: .32rem;
                    font-weight: bold;
                }
            }
            .cost-price {
                color: #a4acb5;
                font-size: .24rem;
                text-decoration: line-through;
            }
        }
    }
    .bg-banner {
        margin: .3rem 0;
    }
  }
   .shops {
     ::v-deep .van-tab--active {
        .van-tab__text--ellipsis {
          color: #2d9bfd;
          font-size: .30rem;
        }

     }
     ::v-deep .van-tabs__line {
            background: #37c234;
        }
   }
    .pp-box {
      display:flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top:.4rem;
      .item {
        width: 48%;
        box-shadow: 0px 8px 14px 1px rgba(219, 223, 230, 0.2);
        margin-bottom: .3rem;
        border-radius: .2rem;
        .info {
          padding: .2rem;
          .titles {
              color: #2b2e32;
              font-size: .28rem;
              line-height: .39rem;
              margin-bottom: .2rem;
          }
        }
        .price {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #ff672b;
        }
        .btn {
            background-image: linear-gradient(90deg,
            #ffb82f 0%,
            #ff7120 100%),
        linear-gradient(
            #fff7ec,
            #fff7ec);
            color: #fff;
            border-radius: .28rem;
            font-weight: normal;
            font-size: .26rem;
            height: .56rem;
        }
      }

    }
</style>
