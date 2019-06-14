<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-menu-item>Menu</el-menu-item>
    <el-menu-item>
      <div class="block" v-if="true">
        <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
      </div>
    </el-menu-item>
    <el-menu-item>
      <el-button @click="getHistoryValue">查询</el-button>
      <router-link :to="{ name: 'computedLAeq'}">User</router-link>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {
      flag: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      date: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    getHistoryValue () {
      let hour = 3600000
      for (let i = 0; i < 24; i++) {
        this.$axios.get('http://runasama.club/getHistoryValue', { params: {date: this.date.getTime() + i * hour} }).then((res) => {
          this.$store.commit('history', {data: res.data, time: i})
        })
      }
    }
  }
}
</script>
<style scoped>
.el-menu{
    height: 50vh;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
}
.el-button{
    width: 90%;
}
.slide{
    width: 15px;
    height: 15px;
    background: black;
}
</style>
