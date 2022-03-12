import axios from 'axios'
// 导入Toast轻提示
import { Toast } from 'vant'
import store from '@/store/index.js'
import router from '@/router/index.js'

// 调用 axios.create() 方法，创建 axios 的实例对象
const instance = axios.create({
  // 请求根路径
  baseURL: 'http://www.liulongbin.top:8000'
})

// 请求拦截器  添加loading效果
instance.interceptors.request.use(
  config => {
    Toast.loading({
      message: '加载中。。。',
      duration: 0
    })
    // 获取token
    const tokenStr = store.state.tokenInfo.token
    // 若有在头部添加token字段
    if (tokenStr) {
      config.headers.Authorization = `Bearer ${tokenStr}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器 隐藏loading效果
instance.interceptors.response.use(
  response => {
    Toast.clear()
    return response
  },
  error => {
    Toast.clear()
    if (error.response && error.response.status === 401) {
      console.log('token 过期啦')
      store.commit('cleanState')
      router.replace('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
