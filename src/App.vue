<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family:'PingFang-SC-Medium', 'PingFang', STHeitiSC-Light, Helvetica-Light, arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.bg-white {
  background: #fff;
}
.bg-gray {
  background: #f5f5f5;
}
.common-bg {
  background: url('~@s/wallet/bg1.png') no-repeat;
  background-size: contain;
}
.common-bg1 {
  // background: url('~@s/wallet/beijing.png') no-repeat;
  background-size: contain;
}
.bindbox {
  margin: .9rem .3rem .3rem ;
  background: #fff;
  padding: 0.4rem;
  // box-shadow: 0px 9px 29px 0px rgba(36, 40, 59, 0.11);
  border-radius: 0.3rem ;
  flex: 1;
}
input:-internal-autofill-selected {
  background: none!important;
}

</style>
