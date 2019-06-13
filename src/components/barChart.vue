<template>
  <el-card class="box-card" v-loading="$store.state.loading" :class="!listShow ? 'scroll-hidden' : ''">
    <div slot="header" class="clearfix">
      <span> {{ type.title2 }} </span>
      <el-button style="float: right; padding: 3px 0" @click="listShow = !listShow" type="text">{{ listShow ? '隐藏列表' : '显示列表' }}</el-button>
    </div>
    <div
    class='bar-chart'
    :id='type.detection + "barChart"'
    v-show="!listShow"
    ></div>
    <el-table
      v-show="listShow"
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="key"
        label="等级"
        width="200px"
      ></el-table-column>
      <el-table-column
        prop="val"
        label="测得次数"
        width="200px"
      ></el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      chart: null,
      listShow: false
    }
  },
  mounted () {
    this.barChart()
  },
  computed: {
    mapState,
    barValue () {
      return this.$store.state[this.type.detection + 'Bar']
    },
    list () {
      let barValue = this.$store.state[this.type.detection + 'Bar']
      let temp = []
      for (let [key, val] of Object.entries(barValue)) {
        temp.push({
          key: key,
          val: val
        })
      }
      return temp
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
