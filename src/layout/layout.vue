<!--  -->
<template>
  <div class='layout' ref="layoutHight">
    <transition name="fade-transform"
                mode="out-in">
      <router-view :key="key" />
    </transition>
    <foot :foottype="foottype"></foot>
  </div>
</template>

<script>
import Foot from '../components/Foot.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  components: {
    Foot
  },
  computed: {
    ...mapGetters(['foottype']),
    key () {
      return this.$route.path
    }
  },
  mounted () {
    if (window.navigator.userAgent.indexOf('app_ezoo') == -1) {
      let that = this
      window.onresize = function (e) {
        that.$refs.layoutHight.style.height = document.body.clientHeight + 'px'
      }
    }

    // if (window.navigator.userAgent.indexOf('app_ezoo') == -1) {
    //   this.$refs.layoutHight.style.height = document.body.clientHeight + 'px'
    // }
  },
  data () {
    return {

    }
  }
  // computed: {
  //   key () {
  //     return this.$route.path
  //   }
  // }
}
</script>
<style lang='scss' scoped>
</style>
