<template>
  <el-container id="app">
    <el-header>
      <top-menu></top-menu>
    </el-header>
    <section class="content">
      <aside :class="menuShow + ' aside-menu'">
        <aside-menu></aside-menu>
      </aside>
      <router-view></router-view>
    </section>
  </el-container>
</template>
<script>
import { mapMutations } from 'vuex'
import topMenu from './components/header'
import asideMenu from './components/aside'
import homeMain from './components/homeMain'
export default {
  mounted () {
    this.initWebSocket()
  },
  data () {
    return {}
  },
  components: {
    topMenu,
    asideMenu,
    homeMain
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
  overflow-x: hidden;
  overflow-y: auto;
}
.scroll-hidden::-webkit-scrollbar{
  display: none;
}
.el-card::-webkit-scrollbar {
  width: 8px;
}
.el-card::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) inset;
  background: rgba(0, 0, 0, 0.2);
}
.el-card::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) inset;
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
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
