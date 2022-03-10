import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// vant
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'

import '../index.less'

Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
