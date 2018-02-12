import Vue from "vue"
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: require('@/views/Home').default
    },
    {
      path: '/help',
      name: 'help',
      component: require('@/views/Help').default
    },
    {
      path: '/file-compare',
      name: 'file-compare',
      component: require('@/views/FileCompare').default
    },
    {
      path: '/host-editer',
      name: 'host-editer',
      component: require('@/views/HostEditer').default
    },
    {
      path: '/code-run',
      name: 'code-run',
      component: require('@/views/CodeRun').default
    },
    {
      path: '/code-mirror',
      name: 'code-mirror',
      component: require('@/views/CodeMirror').default
    },
    {
      path: '/test',
      name: 'test',
      component: require('@/views/Test').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})