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
// 搜索
import Search from '@/views/Search/Search.vue'
// 搜索结果
import SearchResult from '@/views/SearchResult/SearchResult.vue'
// 文章详情
import ArticleDetail from '@/views/ArticleDetail/ArticleDetail.vue'
// 编辑个人资料
import UserEdit from '@/views/UserEdit/UserEdit.vue'
// 小思同学
import Chat from '@/views/Chat/Chat.vue'
// 导入vuex
import store from '@/store/index.js'

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
  },
  { path: '/search', component: Search, name: 'search' },
  { path: '/search/:kw', component: SearchResult, name: 'search-result', props: true },
  { path: '/article/:id', component: ArticleDetail, name: 'art-detail', props: true },
  { path: '/user/edit', component: UserEdit, name: 'user-edit' },
  { path: '/chat', component: Chat, name: 'chat' }
]

const router = new VueRouter({
  routes
})

// 有权限的路径
const pagePathArr = ['/user', '/user/edit']

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (pagePathArr.indexOf(to.path) !== -1) {
    const tokenStr = store.state.tokenInfo.token
    if (tokenStr) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
