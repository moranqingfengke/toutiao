<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <van-nav-bar fixed>
      <!-- 左侧的插槽 -->
      <template #left>
        <img src="../../assets/个人logo.jpg" alt="logo" class="logo" />
      </template>
      <!-- 右侧的插槽 -->
      <template #right>
        <van-icon name="search" color="white" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" sticky offset-top="1.22666667rem">
      <van-tab v-for="item in userChannel" :title="item.name" :key="item.id">内容 1</van-tab>
    </van-tabs>
    <van-icon name="plus" size="16" class="plus"/>
  </div>
</template>

<script>

// 按需导入获取频道的接口
import { getUserChannelAPI } from '@/api/homeAPI.js'

export default {
  name: 'Home',
  data () {
    return {
      // 频道索引
      active: 0,
      // 频道数组
      userChannel: []
    }
  },
  methods: {
    async initUserChannel () {
      const { data: res } = await getUserChannelAPI()
      if (res.message === 'OK') {
        this.userChannel = res.data.channels
      }
    }
  },
  created () {
    this.initUserChannel()
  }
}
</script>

<style lang="less" scoped>
.home-container{
  padding-top: 46px;
  padding-bottom: 50px;
}
.logo{
  width: 10%;
  border-radius: 50%;
}
/deep/ .van-tabs__wrap{
  padding-right: 36px;
}
.plus{
  position: fixed;
  top: 58px;
  right: 10px;
}
</style>
