<template>
  <section class="main">
    <line-chart class="chart" :type="Lp"/>
    <bar-chart class="chart" :type="Lp"/>
    <line-chart class="chart" :type="lum"/>
    <bar-chart class="chart" :type="lum"></bar-chart>
  </section>
</template>
<script>
import lineChart from './lineChart'
import barChart from './barChart'
export default {
  data () {
    return {
      Lp: {
        detection: 'Lp',
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
    barChart
  }
}
</script>
