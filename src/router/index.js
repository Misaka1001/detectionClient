import Vue from 'vue'
import Router from 'vue-router'
import homeMain from '../components/homeMain'
import computedMain from '../components/computedMain'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeMain',
      component: homeMain
    },
    {
      path: '/computed',
      name: 'computedLAeq',
      component: computedMain
    }
  ]
})
