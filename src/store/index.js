import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 初始state对象
let initState = {
  tokenInfo: {}
}

// 读取本地的state
const stateStr = localStorage.getItem('state')
if (stateStr) {
  initState = JSON.parse(stateStr)
}

export default new Vuex.Store({
  state: initState,
  mutations: {
    // 更新token方法
    updateTokenInfo (state, payload) {
      state.tokenInfo = payload
      this.commit('saveStateToStorage')
    },
    // 将state数据存到本地
    saveStateToStorage (state) {
      localStorage.setItem('state', JSON.stringify(state))
    }
  },
  actions: {
  },
  modules: {
  }
})
