import Vue from 'vue'
import Router from 'vue-router'
import homeMain from '../components/homeMain'
import computedMain from '../components/computedMain'
import lumComputed from '../components/lumComputed'
Vue.use(Router)
export default new Router({
  mode: 'history',
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
    },
    {
      path: '/lumComputed',
      name: 'lumComputed',
      component: lumComputed
    }
  ]
})
