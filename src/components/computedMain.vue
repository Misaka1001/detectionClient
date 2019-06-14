<template>
  <section class="main">
    <div slot="header" class="clearfix">
      <span>声压级</span>
    </div>
    <div class="chart" id="LAeq"></div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      chart: ''
    }
  },
  mounted () {
    this.initChart()
    console.log(this.xAxis)
  },
  methods: {
    initChart () {
      let option = {
        xAxis: {
          type: 'category',
          boudaryGap: false,
          data: this.xAxis
        },
        yAxis: {
          min: 30,
          type: 'value',
          boundaryGap: [0, '100%']
        },
        series: [{
          name: 'LAeq',
          type: 'line',
          data: this.yAxis
        }]
      }
      this.chart = this.$echarts.init(document.getElementById('LAeq'))
      this.chart.setOption(option)
      console.log(this.xAxis, this.yAxis)
    }
  },
  computed: {
    data () {
      return this.$store.state.LAeqArr
    },
    xAxis () {
      let arr = []
      let data = this.$store.state.LAeqArr
      for (let i = 0; i < data.length; i++) {
        if (data[i]) {
          arr.push(i)
        }
      }
      return arr
    },
    yAxis () {
      let arr = []
      let data = this.$store.state.LAeqArr
      for (let i = 0; i < data.length; i++) {
        if (data[i]) {
          arr.push(data[i])
        }
      }
      return arr
    }
  }
}
</script>
<style scoped>
.main{
  width: 1000px;
}
.chart{
  width: 800px;
}
</style>
