<template>
  <el-card class="box-card" v-loading="$store.state.loading">
    <div slot="header" class="clearfix">
      <span> {{ type.title2 }} </span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div class='bar-chart' :id='type.detection + "barChart"'></div>
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
    this.barChart()
  },
  computed: {
    mapState,
    barValue () {
      return this.$store.state[this.type.detection + 'Bar']
    }
  },
  props: ['type', 'barData'],
  methods: {
    barChart () {
      let type = this.type.detection + 'Bar'
      let barData = this.$store.state[type]
      let barOption = {
        color: ['#E15457'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: Object.keys(barData),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.title,
            type: 'bar',
            barWidth: '60%',
            data: Object.values(barData)
          }
        ]
      }
      let id = this.type.detection + 'barChart'
      this.chart = this.$echarts.init(document.getElementById(id))
      this.chart.setOption(barOption)
    }
  },
  watch: {
    barValue: {
      handler () {
        this.chart.setOption({
          xAxis: {
            data: Object.keys(this.barValue)
          },
          series: [
            {
              data: Object.values(this.barValue)
            }
          ]
        })
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.bar-chart{
  height: 450px;
  width: 450px;
}
@media screen and (max-width: 500px){
  .bar-chart{
    width: 85vw;
    height: 80vw;
  }
  .clearfix{
    font-size: 2rem;
  }
}
</style>
