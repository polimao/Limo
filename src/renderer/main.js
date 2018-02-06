import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import db from './datastore'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'codemirror/lib/codemirror.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(ElementUI)

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$db = db
db.insert([{ a: 5 }, { a: 42 }])
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
