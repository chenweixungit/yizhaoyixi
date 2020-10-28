// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'
import axios from 'axios'

Vue.use(axios)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(router)
axios.defaults.baseURL = 'http://101.37.173.73:8080'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8;'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
