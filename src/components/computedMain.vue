<template>
  <section class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>历史数据分析结果</span>
      </div>
      <div class="chart" id="LAeq"></div>
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
  },
  methods: {
    initChart () {
      let option = {
        title: {
          text: '噪声历史数据变化',
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
          data: ['LAeq'],
          right: '15%',
          top: '3%'
        },
        xAxis: {
          name: '时间(时)',
          nameTextStyle: {
            fontSize: 14
          },
          axisLine: {
            symbol: ['none', 'arrow']
          },
          type: 'category',
          boudaryGap: false,
          data: this.xAxis,
          axisLabel: {
            formatter: '{value}',
            interval: 1
          }
        },
        yAxis: {
          min: 30,
          name: '噪声值(dB)',
          nameTextStyle: {
            fontSize: 14
          },
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            symbol: ['none', 'arrow']
          }
        },
        series: [{
          name: '噪声值',
          type: 'line',
          data: this.yAxis,
          markLine: {
            data: [
              {
                name: '昼间限定值',
                yAxis: 55,
                label: {
                  normal: {
                    show: true,
                    formatter: '昼间限定值55'
                  }
                }
              },
              {
                name: '夜间限定值',
                yAxis: 45,
                label: {
                  normal: {
                    show: true,
                    formatter: '夜间限定值45'
                  }
                }
              }
            ]
          }
        }],
        grid: {
          left: '15%',
          right: '20%'
        }
      }
      this.chart = this.$echarts.init(document.getElementById('LAeq'))
      this.chart.setOption(option)
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
  },
  watch: {
    yAxis () {
      this.chart.setOption({
        xAxis: {
          data: this.xAxis
        },
        series: {
          data: this.yAxis
        }
      })
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
