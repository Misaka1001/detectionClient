<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ type.title1 }}</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div class="line-chart" :id='type.detection + "lineChart"'></div>
  </el-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.lineChart()
  },
  computed: {
    mapState,
    data () {
      return this.$store.state[this.type.detection]
    },
    time () {
      return this.$store.state.time
    }
  },
  props: ['type'],
  methods: {
    lineChart () {
      var option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        grid: {
          x: '12%', y: '8%', width: '80%', height: '70%'
        },
        legend: {
          data: []
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          min: this.type.min,
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: '{value}' + this.type.formatter
          }
        },
        series: [{
          name: this.type.detection,
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            color: 'rgb(255, 70, 131)'
          },
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(255, 158, 68)'
            }, {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }])
          },
          data: []
        }],
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ]
      }
      let id = this.type.detection + 'lineChart'
      this.chart = this.$echarts.init(document.getElementById(id))
      this.chart.setOption(option)
    }
  },
  watch: {
    data () {
      this.chart.setOption({
        xAxis: {
          data: this.time.map(item => item.getMinutes() + 'm' + item.getSeconds() + 's')
        },
        series: [{
          data: this.data
        }]
      })
    }
  }
}
</script>
<style scoped>
.line-chart{
  height: 450px;
  width: 450px;
}
@media screen and (max-width: 500px){
  .line-chart{
    width: 85vw;
    height: 80vw;
  }
  .clearfix{
    font-size: 2rem;
  }
}
</style>
