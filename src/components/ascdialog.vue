<!--  -->
<template>
<div class="asc-dialog">
   <div class="asc-dialog-header">您当前的账号已被挤出请重新登录</div>
   <div class="asc-dialog-content">弹窗内容</div>
   <div class="asc-dialog-footer">
    <button class="asc-dialog-btn asc-dialog-defalut">确认</button>
    <button class="asc-dialog-btn asc-dialog-confirm">取消</button>
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

  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped>
 .asc-dialog{
    position: fixed;
    top: 45%;
    left: 50%;
    width: 320px;
    overflow: hidden;
    font-size: 16px;
    background-color: #fff;
    border-radius: 16px;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-transition-property: opacity,-webkit-transform;
    transition-property: opacity,-webkit-transform;
    transition-property: transform,opacity;
    transition-property: transform,opacity,-webkit-transform;
 }
 .asc-dialog-header {
   padding-top: 24px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
 }
 .asc-dialog-footer {
  display: flex;
 }
 .asc-dialog-btn {
   position: relative;
    display: inline-block;
    box-sizing: border-box;
    height: 44px;
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 42px;
    text-align: center;
    border-radius: 2px;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
    -webkit-appearance: none;
    -webkit-text-size-adjust: 100%;
    width: 100%;
    height: 50px;
    line-height: 48px;
 }
 .asc-dialog-defalut {
   color: #1989fa
 }
 .van-button--default {
    color: #323233;
    background-color: #fff;
    border: 1px solid #ebedf0;
 }
</style>
