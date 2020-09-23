<!--  -->
<template>
  <div class="sale">
    <van-pull-refresh class="content" v-model="loading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="immediate"
        :offset="50"
        @load="getList"
      >
        <div class="item" v-for="(item, index) in list" :key="index" @click="details(item.id)">
          <div class="content">
            <div class="img-wrap">
              <van-image width="1.5rem" height="1.5rem" :src="item.img" />
            </div>
            <div class="info">
              <div class="title">{{item.title}}</div>
              <div class="time">{{item.create_time}}</div>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <van-empty v-if="showEmpty" description="暂无数据" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import * as api from '@/api/message'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      immediate: false,
      page: 1,
      list: [],
      showEmpty: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    details (id) {
      this.$router.push({
        path: '/message/details',
        query: {
          id: id
        }
      })
    },
    onRefresh () {
      this.finished = false
      this.page = 1
      this.list.length = 0
      this.getList()
    },
    getList () {
      if (this.count == this.list.length) {
        this.loading = false
        this.finished = true
        return false
      }
      api.newsList({ page: this.page }).then(res => {
        this.list = this.list.concat(res.data.list)
        if (this.list.length == 0) {
          this.showEmpty = true
        }
        this.page = this.page + 1
        this.count = res.data.count
        this.loading = false
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
.item {
  background: #fff;
  margin-top: 0.2rem;
  .content {
    padding: 0.3rem;
    display: flex;
    .img-wrap {
      width: 1.6rem;
      margin-right: 0.26rem;
      ::v-deep .van-image{
        border-radius: 8px;
        overflow: hidden;
      }
    }
    .info {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 0.32rem;
        font-weight: bold;
        text-overflow: ellipsis;
      }
      .time {
        padding: .3rem 0;
        font-size: 0.26rem;
        font-weight: bold;
        color: #8d92a1;
      }
    }
  }
}
.line {
  height: 1px;
  background: #666;
  opacity: 0.1;
}
</style>
