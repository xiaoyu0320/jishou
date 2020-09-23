<!--  -->
<template>
  <div class='detail layout-child'>
    <van-nav-bar title="文章详情" left-arrow @click-left="back"/>
    <div class="details-content layout-scorll">
      <div class="title">{{data.title}}</div>
      <div class="time">{{data.create_time}}</div>
      <div class="content" v-html="$xss(data.content)"></div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/message'
export default {
  data () {
    return {
      id: this.$route.query.id,
      data: {}
    }
  },
  methods: {
    getDetail () {
      api.newsDetail({ id: this.id }).then(res => {
        this.data = res.data
      })
    },
    back () {
      sessionStorage.setItem('mesActive', 0)
      this.$router.back()
    }
  },
  created () {
    this.getDetail()
    this.$store.dispatch('setBottomType', 0)
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.details-content{
  padding: .3rem;
  .title{
    font-size: .4rem;
  }
  .time{
    padding: .3rem 0;
    color: #999;
  }
  .content{
    margin-top: .4rem;
    ::v-deep img {
      max-width: 100%;
    }
  }
}
</style>
