<template>
  <el-container id="app">
    <el-header>
      <top-menu></top-menu>
    </el-header>
    <section class="content">
      <aside :class="menuShow + ' aside-menu'">
        <aside-menu></aside-menu>
      </aside>
      <section class="main">
        <line-chart class="chart" :type="lp"/>
        <bar-chart class="chart" :type='lp'/>
        <line-chart class="chart" :type='lum'/>
        <bar-chart class="chart" :type='lum'></bar-chart>
      </section>
    </section>
  </el-container>
</template>
<script>
import { mapMutations } from 'vuex'
import lineChart from './components/lineChart'
import barChart from './components/barChart'
import topMenu from './components/header'
import asideMenu from './components/aside'
export default {
  mounted () {
    this.initWebSocket()
    console.log(this.$store.state.menuShow)
  },
  data () {
    return {
      lp: {
        detection: 'lp',
        title1: '噪声变化趋势',
        title2: '噪声数据统计',
        formatter: 'dB',
        min: 30
      },
      lum: {
        detection: 'lum',
        title1: '光照变化趋势',
        title2: '光照数据统计',
        formatter: 'lx',
        min: 0
      }
    }
  },
  components: {
    lineChart,
    barChart,
    topMenu,
    asideMenu
  },
  methods: {
    mapMutations,
    initWebSocket () {
      let ws = new WebSocket('ws://123.206.37.27:80/wsData')
      ws.addEventListener('open', function () {
        ws.send('connection')
      }, false)
      ws.addEventListener('message', (event) => {
        let data = JSON.parse(event.data)
        this.$store.commit('upData', data)
      })
    }
  },
  computed: {
    menuShow () {
      return this.$store.state.menuShow
    }
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
:root{
  color: #303133;
}
.el-header{
  padding: 0;
}
.content{
  position: relative;
}
.aside-menu{
  width: 300px;
  height: 60vh;
  transition: all 1s;
  position: relative;
  z-index: 2;
  position: absolute;
}
.main{
  position: absolute;
  z-index: 1;
}
.chart{
  display: inline-block;
  width: 500px;
  height: 600px;
  margin: 30px;
}
@media screen and (min-width: 500px){
  body{
    min-width: 1500px;
  }
  .main{
    left: 300px;
  }
  .show{
    transform: translateX(0);
  }
  .hidden{
    transform: translateX(-100%);
    background: black;
  }
}
@media screen and (max-width: 500px){
  :root{
    font-size: 2vw;
  }
  .show{
    transform: translateX(-100%);
  }
  .hidden{
    transform: translateX(0);
  }
  .chart{
    margin: 1vw;
    width: 97vw;
    height: 110vw;
  }
}
</style>
