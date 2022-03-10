<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
        <ArtItem v-for="item in artlist" :key="item.art_id" :article="item" @remove-article="removeArticle"></ArtItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>

// 导入请求文章的接口
import { getArtListAPI } from '@/api/homeAPI.js'
// 导入ArtItem组件
import ArtItem from '@/components/ArtItem/ArtItem.vue'

export default {
  name: 'ArtList',
  components: {
    ArtItem
  },
  props: {
    // 频道id
    channelId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 文章列表数组
      artlist: [],
      // 时间
      timestamp: Date.now(),
      // 上拉加载
      loading: false,
      finished: false,
      // 下拉刷新
      isLoading: false
    }
  },
  methods: {
    async initArtList (isRefresh) {
      const { data: res } = await getArtListAPI(this.channelId, this.timestamp)
      if (res.message === 'OK') {
        this.timestamp = res.data.pre_timestamp
        if (isRefresh) {
          this.artlist = [...res.data.results, ...this.artlist]
          this.isLoading = false
        } else {
          // 上拉加载，旧数据在前，新数据在后
          this.artlist = [...this.artlist, ...res.data.results]
          this.loading = false
        }
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
      }
    },
    // 上拉加载
    onLoad () {
      this.initArtList()
    },
    // 下拉刷新
    onRefresh () {
      this.initArtList(true)
    },
    // 移除文章
    removeArticle (id) {
      // 过滤器，过滤掉指定id文章
      this.artlist = this.artlist.filter(item => item.art_id.toString() !== id)
      // 当文章不能铺满整个屏幕，导致下拉和上拉失效
      if (this.artlist.length < 10) {
      // 主动请求下一页的数据
        this.initArtList()
      }
    }
  },
  created () {
    this.initArtList()
  }
}
</script>

<style lang="less" scoped>

</style>
