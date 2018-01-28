import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import db from './datastore'

// import path from 'path'
// import { remote } from 'electron'
// console.log(require.resolve('electron'))
// console.log(path.join(remote.app.getPath('userData'), '/data.db'))
// import 'bootstrap/dist/css/bootstrap.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
Vue.prototype.$db = db

db.insert([{ a: 5 }, { a: 42 }])
db.insert([{test: 'haha'}])
