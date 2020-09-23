<!--  -->
<template>
<div class="ios2 dialog" style="background: rgb(255, 255, 255); height: 100%; margin-bottom: 50px; overflow: auto;">
    <div>
        <h1>一、首先第一步点击<span>允许</span>，之后点击<span>关闭</span></h1>
    </div>
    <div class="img">
        <img src="http://d.616.hk/moban/shouji/img/04.png" alt="">
        <img src="http://d.616.hk/moban/shouji/img/03.png" alt="">
    </div>
    <div>
        <h1>二、打开手机设置-<span>已下载描述文件</span>-里面进行安装</h1>
    </div>
    <div class="img">
        <img src="http://d.616.hk/moban/shouji/img/05.png" alt="">
        <img src="http://d.616.hk/moban/shouji/img/06.png" alt="">
    </div>
    <div class="img" style="padding: 20px;margin-bottom: 60px;">
        <a  @click="golink" class="btn pintuan-btn">
             确定安装
        </a>
    </div>
</div>
</template>

<script>

export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    golink () {
      window.location.href = '/download/app.mobileconfig'
      this.$emit('callback', false)
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped>
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    width: 70%;
    height: 50px;
    line-height: 36px;
}
  .ios2 h1{
          font-size: 15px;
          margin-left: 15px;
  }
  .ios2 h1 span{
      color: red;
  }
  .ios2 .img{
      text-align: center;
  }
  .ios2 .img img{
      width: 75%;
  }
</style>
