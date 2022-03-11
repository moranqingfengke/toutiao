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
        <van-icon name="search" color="white" size="18" @click="$router.push('/search')" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" sticky offset-top="1.22666667rem">
      <van-tab v-for="item in userChannel" :title="item.name" :key="item.id">
        <ArtList :channelId="item.id"></ArtList>
      </van-tab>
    </van-tabs>
    <!-- 加号，频道管理 -->
    <van-icon name="plus" size="16" class="plus" @click="show = true"/>
    <!-- 频道弹出 -->
    <van-popup v-model="show" :close-on-click-overlay="false" @closed="isDel = false">
      <div class="popup-container">

        <!-- 弹出层的头部区域 -->
        <van-nav-bar title="频道管理">
          <template #right>
            <van-icon name="cross" size="14" color="white" @click="show = false" />
          </template>
        </van-nav-bar>

        <!-- 弹出层的主体区域 -->
        <div class="pop-body">
          <!-- 我的频道 -->
          <div class="my-channel-box">
            <div class="channel-title">
              <div>
                <span class="title-bold">已添加频道：</span>
                <span class="title-gray">{{isDel?'点击移除频道':'点击进入频道'}}</span>
              </div>
              <span class="btn-edit" @click="isDel = !isDel">{{isDel?'完成':'编辑'}}</span>
            </div>
            <!-- 我的频道列表 -->
            <van-row type="flex">
              <van-col span="6" v-for="(item, index) in userChannel" :key="item.id">
                <!-- 用户的频道 Item 项 -->
                <div class="channel-item van-hairline--surround" @click="onUserChannelClick(item, index)">
                  {{item.name}}
                  <!-- 删除的图标 -->
                  <van-badge color="transparent" class="cross-badge" v-if="isDel && item.name !== '推荐' && userChannel.length > 2" @click="onUserChannelClick(item)">
                    <template #content>
                      <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="12" />
                    </template>
                  </van-badge>
                </div>
              </van-col>
            </van-row>
          </div>

          <!-- 分隔线 -->
          <div class="van-hairline--top sp-line"></div>

          <!-- 更多频道 -->
          <div class="more-channel-box">
            <div class="channel-title">
              <div>
                <span class="title-bold">可添加频道：</span>
                <span class="title-gray">点击添加频道</span>
              </div>
            </div>
            <!-- 更多频道列表 -->
            <van-row type="flex">
              <van-col span="6" v-for="item in moreChannels" :key="item.id">
                <div class="channel-item van-hairline--surround" @click="addChannel(item)">{{item.name}}</div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>

// 按需导入获取频道的接口,全部频道接口,更新用户频道接口
import { getUserChannelAPI, getAllChannelAPI, updateUserChannelAPI } from '@/api/homeAPI.js'
// 导入ArtList组件
import ArtList from '@/components/ArtList/ArtList.vue'

export default {
  name: 'Home',
  components: {
    ArtList
  },
  computed: {
    // 更多频道的数据
    moreChannels () {
    // 1. 对数组进行 filter 过滤，返回的是符合条件的新数组
      return this.allChannel.filter(item => {
      // 判断当前循环项，是否在 “我的频道” 列表之中
        const index = this.userChannel.findIndex(x => x.id === item.id)
        // 如果不在，则 return true，表示需要把这一项存储到返回的新数组之中
        if (index === -1) return true
      })
    }
  },
  data () {
    return {
      // 频道索引
      active: 0,
      // 频道数组
      userChannel: [],
      // 控制频道显示隐藏
      show: false,
      // 所有的频道列表数据
      allChannel: [],
      // 是否处于删除状态
      isDel: false
    }
  },
  methods: {
    // 用户频道
    async initUserChannel () {
      const { data: res } = await getUserChannelAPI()
      if (res.message === 'OK') {
        this.userChannel = res.data.channels
      }
    },
    // 获取所有频道
    async initAllChannel () {
      const { data: res } = await getAllChannelAPI()
      if (res.message === 'OK') {
        this.allChannel = res.data.channels
      }
    },
    // 将用户选择的频道加入到用户频道
    addChannel (item) {
      this.userChannel.push(item)
      // 更新用户频道
      this.updateChannel()
    },
    // 更新用户频道提交到后端保存
    async updateChannel (item) {
      const channels = this.userChannel
        .filter(item => item.name !== '推荐')
        .map((item, index) => {
          return {
            id: item.id,
            seq: index + 1
          }
        })

      const { data: res } = await updateUserChannelAPI(channels)
      if (res.message === 'OK') {
        // 提示更新成功
        this.$notify({ type: 'success', message: '更新成功', duration: 1000 })
      }
    },
    // 删除指定频道并提交到后台
    onUserChannelClick (channel, index) {
      if (this.isDel) {
        if (channel.name === '推荐' || this.userChannel.length === 2) return
        // 删除
        this.userChannel = this.userChannel.filter(item => item.id !== channel.id)
        this.updateChannel()
      } else {
        // 不处于删除状态,关闭弹出层，进入指定频道
        this.active = index
        this.show = false
      }
    }
  },
  created () {
    // 用户频道
    this.initUserChannel()
    // 全部频道
    this.initAllChannel()
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
  background-color: white;
}
.plus{
  position: fixed;
  top: 58px;
  right: 10px;
  z-index: 999;
}
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
    .title-bold {
      font-weight: bold;
    }
    .title-gray {
      color: gray;
      font-size: 12px;
    }
  }
}

.btn-edit {
  border: 1px solid #a3a2a2;
  padding: 0 10px;
  line-height: 20px;
  height: 20px;
  border-radius: 6px;
  font-size: 12px;
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 6px;
}

.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

.sp-line {
  margin: 10px 0 20px 0;
}
</style>
