<template>
<div>
  <div class="ez-dialog">
      <div class="ez-txt" v-html="msgContent">
      </div>
     <van-button type="info" size="large" class="ez-btn" @click="close" round>知道了</van-button>
  </div>
  <div class="ez-overlay"></div>
</div>
</template>
<script>
export default {
  props: {
    msgContent: {
      type: String,
      default: ''
    }
  },
  methods: {

    close() {
      this.$emit('callback', false)
    }
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
.ez-dialog {
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  width: 90%;
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  -webkit-transition: -webkit-transform 0.3s ease-out;
  transition: -webkit-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  -webkit-overflow-scrolling: touch;
  background:#fff url("../assets/common/tanchuang.png") no-repeat top;
  background-size: contain;
  height: 60%;
  z-index: 10;
  display: flex;
  flex-direction: column;
   border-radius: .2rem;
}
.ez-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index:9;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
}
.ez-txt {
    width: 80%;
    height: 4rem;
    margin: 0 auto;
    margin-top: 2rem;
    overflow: hidden;
    overflow-y: auto;
    line-height: 1.8;
    font-size: 0.32rem;

}
.ez-btn {
    background-image: linear-gradient(90deg, #1684ff 0%, #3fa9ff 100%);
    width: 80%;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    margin-left: -40%;
    bottom: 5%;
    border: 1px solid #3fa9ff!important;
    background-color: #3fa9ff!important;
    height: 40px;
    line-height: 40px;
}
</style>
