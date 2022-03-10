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
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArtItem',
  props: {
    // 文章信息
    article: {
      type: Object,
      required: true
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
</style>
