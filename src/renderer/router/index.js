import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
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
      path: '/host-manager',
      name: 'host-manager',
      component: require('@/views/HostManager').default
    },
    {
      path: '/php-runner',
      name: 'php-runner',
      component: require('@/views/PHPRunner').default
    },
    {
      path: '/code-mirror',
      name: 'code-mirror',
      component: require('@/views/CodeMirror').default
    },
    {
      path: '/test2',
      name: 'test2',
      component: require('@/views/test2').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
