import Vue from 'vue'
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
      path: '/file-compare',
      name: 'file-compare',
      component: require('@/components/FileCompare').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
