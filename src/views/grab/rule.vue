<!--  -->
<template>
<div class='result   layout-child'>
    <van-nav-bar  title="活动规则" left-arrow @click-left="golink('/grab/index')" />

  <div class="txt"  v-html="detail">

  </div>

</div>
</template>

<script>
import * as api from '@/api/wallet'
export default {
  components: {},
  data () {
    return {
      detail: ''
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    golink (url) {
      this.$router.push({
        path: url
      })
    }
  },
  created () {
    this.$store.dispatch('setBottomType', 0)
    api.rule({}).then(res => {
      this.detail = res.data.introduction
    })
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.common-bg {
  background: #364087;
    height: 100vh;
    background: url('~@s/grab/liuchengbeijing.png');
    background-size: cover;
    position: relative;
    overflow: hidden;
    overflow-y: auto;
}
 .txt {

    flex: 1;
    border-radius: .4rem .4rem 0 0;
    padding: .5rem;
    font-size: .28rem;
 }

</style>
