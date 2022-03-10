import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录
import Login from '@/views/Login/Login.vue'
// 主页基础布局
import Main from '@/views/Main/Main.vue'
// 首页
import Home from '@/views/Home/Home.vue'
// 用户界面
import User from '@/views/User/User.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/',
    component: Main,
    children: [
      { path: '', component: Home, name: 'home' },
      { path: '/user', component: User, name: 'user' }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
