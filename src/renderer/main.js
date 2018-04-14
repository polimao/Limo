import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import db from './datastore'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// ================ 02-08
// 主题载入
import 'codemirror/lib/codemirror.css'

// import 'codemirror/theme/base16-dark.css'
// import 'codemirror/theme/solarized.css'

// // 载入 codemirror 组件
// import CodeMirror from 'codemirror/lib/codemirror'
// import 'codemirror/mode/php/php'

// window.CodeMirror = CodeMirror

import VueCodemirror from 'vue-codemirror'

import VueCookies from 'vue-cookies'

Vue.use(VueCodemirror)
// ================ 02-08

Vue.use(VueCookies)

// ================ 04-10

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(ElementUI)

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$db = db
// db.insert([
//   {
//     a: 5
//   },
//   {
//     a: 42
//   }
// ])
/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
