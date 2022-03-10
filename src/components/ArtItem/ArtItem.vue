<template>
  <div>
    <van-cell>
      <!-- 标题 -->
      <template #title>
        <div class="title-box">
          <span>{{article.title}}</span>
          <!-- 单张图片 -->
          <img v-lazy="article.cover.images[0]" alt="" v-if="article.cover.type === 1" class="thumb">
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type === 3">
          <img v-for="(item, index) in article.cover.images" :key="index" v-lazy="item" alt="" class="thumb">
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>{{article.aut_name}} &nbsp;&nbsp; {{article.comm_count}}评论 &nbsp;&nbsp; {{article.pubdate}}</span>
          <!-- 关闭按钮 -->
          <van-icon name="cross" @click.stop="show = true"/>
        </div>
      </template>
    </van-cell>
    <!-- 反馈的动作面板 -->
    <van-action-sheet v-model="show" cancel-text="取消" :closeable="false" @closed="isFirst = true" get-container="body">
      <!-- 第一个反馈面板 -->
      <div class="content" v-if="isFirst">
        <van-cell v-for="item in actions" :key="item.name" :title="item.name" clickable class="center-title" @click="onCellClick(item.name)"/>
      </div>
      <!-- 第二个面板 -->
      <div v-else>
        <van-cell title="返回" clickable title-class="center-title" @click="isFirst = true"/>
        <van-cell :title="item.label" clickable title-class="center-title" v-for="item in reports" :key="item.type" @click="reportArticle(item.type)"/>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>

// 引入举报模块
import reports from '@/api/reports .js'
// 导入不感兴趣接口，举报接口
import { dislikeArticleAPI, reportArticleAPI } from '@/api/homeAPI.js'

export default {
  name: 'ArtItem',
  props: {
    // 文章信息
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
  // 文章 Id 的计算属性
    artId () {
    // 注意：文章对象的 art_id 是大数对象，需要调用 .toString() 方法转换为字符串形式
      return this.article.art_id.toString()
    }
  },
  data () {
    return {
      // 是否展示反馈面板
      show: false,
      // 选项列表
      actions: [
        { name: '不感兴趣' },
        { name: '举报' },
        { name: '拉黑作者' }
      ],
      // 是否展示第一个面板
      isFirst: true,
      // 举报模块
      reports
    }
  },
  methods: {
    async onCellClick (name) {
      if (name === '不感兴趣') {
        const { data: res } = await dislikeArticleAPI(this.artId)
        if (res.message === 'OK') {
          // 通过自定义事件将id传给ArtList
          this.$emit('remove-article', this.artId)
        }
        this.show = false
      } else if (name === '拉黑作者') {
        console.log('拉黑作者')
        this.show = false
      } else if (name === '举报') {
        // TODO：展示二级反馈面板
        this.isFirst = false
      }
    },
    // 举报文章（形参 type 是举报的类型值）
    async reportArticle (type) {
    // 1. 发起举报文章的请求
      const { data: res } = await reportArticleAPI(this.artId, type)
      if (res.message === 'OK') {
      // 2. 炸楼操作，触发自定义事件，把文章 Id 发送给父组件
        this.$emit('remove-article', this.artId)
      }
      // 3. 关闭动作面板
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
.center-title {
  text-align: center;
}
</style>
