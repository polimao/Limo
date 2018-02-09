import Vue from "vue"
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/help',
      name: 'help',
      component: require('@/components/Help').default
    },
    {
      path: '/file-compare',
      name: 'file-compare',
      component: require('@/components/FileCompare').default
    },
    {
      path: '/host-editer',
      name: 'host-editer',
      component: require('@/components/HostEditer').default
    },
    {
      path: '/code-mirror',
      name: 'code-mirror',
      component: require('@/components/CodeMirror').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
