<template>
  <section class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>历史数据分析结果</span>
      </div>
      <div class="chart" id="lumAverage"></div>
    </el-card>
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
    console.log(this.xAxis, this.yAxis)
  },
  methods: {
    initChart () {
      console.log(this.xAxis)
      console.log(this.yAxis)
      let option = {
        title: {
          text: '光照历史数据变化',
          left: 'center',
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: ['光照强度'],
          right: '15%',
          top: '3%'
        },
        xAxis: {
          name: '时间(时)',
          nameTextStyle: {
            fontSize: 14
          },
          type: 'category',
          boudaryGap: false,
          data: this.xAxis,
          axisLabel: {
            formatter: '{value}',
            interval: 1
          },
          axisLine: {
            symbol: ['none', 'arrow']
          }
        },
        yAxis: {
          min: 0,
          type: 'value',
          name: '光照强度(lx)',
          nameTextStyle: {
            fontSize: 14
          },
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            symbol: ['none', 'arrow']
          }
        },
        series: [{
          name: 'lumAverage',
          type: 'line',
          data: this.yAxis
        }],
        grid: {
          left: '15%',
          right: '20%'
        }
      }
      this.chart = this.$echarts.init(document.getElementById('lumAverage'))
      this.chart.setOption(option)
    }
  },
  computed: {
    data () {
      return this.$store.state.lumAverageArr
    },
    xAxis () {
      let arr = []
      let data = this.$store.state.lumAverageArr
      for (let i = 0; i < data.length; i++) {
        if (data[i]) {
          arr.push(i)
        }
      }
      return arr
    },
    yAxis () {
      let arr = []
      let data = this.$store.state.lumAverageArr
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
.chart{
  width: 800px;
  height: 500px;
}
.clearfix{
  text-align: center;
}
@media screen and (max-width: 500px){
  .chart{
    width: 85vw;
    height: 80vw;
  }
  .clearfix{
    font-size: 2rem;
  }
}
</style>
