<template>
  <el-card class="box-card" v-loading="$store.state.loading" :data="data" :class="!listShow ? 'scroll-hidden' : ''">
    <div slot="header" class="clearfix">
      <span>{{ type.title1 }}</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="listShow = !listShow">{{ listShow ? '隐藏列表' : '显示列表' }}</el-button>
    </div>
    <div class="line-chart" :id='type.detection + "lineChart"' v-show="!listShow"></div>
    <el-table
      v-show="listShow"
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="time"
        label="时间(年-月-日-时-分-秒)"
        width="200px"
      ></el-table-column>
      <el-table-column
        :prop="type.detection"
        :label="'数据(单位:' + type.formatter + ')'"
        width="200px"
      ></el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      chart: null,
      listShow: false
    }
  },
  mounted () {
    this.lineChart()
    console.log(this.$store.state.data)
  },
  computed: {
    data () {
      return this.$store.state[this.type.detection]
    },
    time () {
      return this.$store.state.time
    },
    list () {
      return this.$store.state.data
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
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
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
        }]
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
