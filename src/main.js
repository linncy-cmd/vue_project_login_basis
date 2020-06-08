import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
// 配置请求路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// ---------------------------------------------------------------

// 配置请求携带token
axios.interceptors.request.use(config => {
  // NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
axios.interceptors.response.use(config => {
  // NProgress.done()
  // 在最后必须 return config
  return config
})
// ----------------------------------------------------------------------

// 在Vue原型上 挂载axios，可以通过this进行调用
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
