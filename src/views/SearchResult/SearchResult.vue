<template>
  <div class="search-result-container">
    <!-- 点击实现后退效果 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" fixed />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多数据了" @load="onLoad" :immediate-check="false">
      <ArtItem v-for="item in searchList" :key="item.art_id.toString()" :article="item" :closable="false"></ArtItem>
    </van-list>
  </div>
</template>

<script>

// 导入搜索结果接口
import { getSearchResultAPI } from '@/api/searchAPI.js'
// 导入文章组件
import ArtItem from '@/components/ArtItem/ArtItem.vue'

export default {
  name: 'SearchResult',
  components: {
    ArtItem
  },
  data () {
    return {
      // 页码值
      page: 1,
      // 搜索的结果
      searchList: [],
      // 关键词
      kw: this.$route.params.kw,
      // 是否正在进行上拉加载的数据请求
      loading: false,
      // 数据是否已经加载完毕
      finished: false
    }
  },
  methods: {
    // 获取搜索的结果
    async initSearchList () {
    // 调用 API 接口
      const { data: res } = await getSearchResultAPI(this.kw, this.page)

      if (res.message === 'OK') {
        // 为 searchList 赋值
        this.searchList = [...this.searchList, ...res.data.results]
        this.loading = false
        if (res.data.results.length === 0) {
          this.finished = true
        }
        this.page += 1
      }
    }
  },
  created () {
    this.initSearchList()
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
