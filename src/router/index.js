import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录
import Login from '@/views/Login/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' }
]

const router = new VueRouter({
  routes
})

export default router
