import Vue from 'vue'
import Vuex from 'vuex'
// 导入用户基本信息接口,编辑个人资料接口
import { getUserInfoAPI, getUserProfileAPI } from '@/api/userAPI.js'

Vue.use(Vuex)

// 初始state对象
let initState = {
  // token
  tokenInfo: {},
  // 用户基本信息
  userInfo: {},
  // 用户简介
  userProfile: {}
}

// 读取本地的state
const stateStr = localStorage.getItem('state')
if (stateStr) {
  initState = JSON.parse(stateStr)
}

export default new Vuex.Store({
  state: initState,
  getters: {
    userAvatar (state) {
      let imgSrc = 'https://img.yzcdn.cn/vant/cat.jpeg'
      if (state.userInfo.photo) {
        imgSrc = state.userInfo.photo
      }
      return imgSrc
    }
  },
  mutations: {
    // 更新token方法
    updateTokenInfo (state, payload) {
      state.tokenInfo = payload
      this.commit('saveStateToStorage')
    },
    // 将state数据存到本地
    saveStateToStorage (state) {
      localStorage.setItem('state', JSON.stringify(state))
    },
    // 更新用户基本信息方法
    updateUserInfo (state, payload) {
      state.userInfo = payload
      this.commit('saveStateToStorage')
    },
    // 更新 userProfile 的方法
    updateUserProfile (state, payload) {
      state.userProfile = payload
      this.commit('saveStateToStorage')
    },
    // 清空 vuex 和本地的数据
    cleanState (state) {
      // 1. 清空 vuex 中的数据
      state.tokenInfo = {}
      state.userInfo = {}
      state.userProfile = {}
      // 2. 将清空后的 state 存储到本地
      this.commit('saveStateToStorage')
    }
  },
  actions: {
    async initUserInfo (ctx) {
      const { data: res } = await getUserInfoAPI()
      if (res.message === 'OK') {
        ctx.commit('updateUserInfo', res.data)
      }
    },
    // 初始化用户的简介信息
    async initUserProfile (ctx) {
      // 调用 API 接口
      const { data: res } = await getUserProfileAPI()
      if (res.message === 'OK') {
        ctx.commit('updateUserProfile', res.data)
      }
    }
  },
  modules: {
  }
})
