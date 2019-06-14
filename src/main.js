import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from './lib/initEcharts'
import axios from 'axios'
import store from './store'
import { Button,
  Container,
  Header,
  Footer,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  DatePicker,
  Card,
  Table,
  TableColumn,
  Loading } from 'element-ui'
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(DatePicker)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Table)
Vue.use(TableColumn)
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate () {
    store.dispatch('getData')
  }
})
