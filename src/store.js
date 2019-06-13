import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loading: true,
    Lp: [],
    lum: [],
    time: [],
    lumBar: {
      '0~0.5lx': 0,
      '0.5~1lx': 0,
      '1~3lx': 0,
      '3~5lx': 0,
      '5~10lx': 0,
      '10~15lx': 0,
      '15~30lx': 0,
      '20~30lx': 0,
      '30~50lx': 0,
      '50~75lx': 0,
      '75~100lx': 0,
      '100~150lx': 0,
      '150~200lx': 0,
      '200~300lx': 0,
      '300~500lx': 0,
      '500~750lx': 0,
      '750~1000lx': 0,
      '1000~1500lx': 0,
      '1500~2000lx': 0,
      '2000~3000lx': 0,
      '3000~5000lx': 0
    },
    LpBar: {
      '30~40dB': 0,
      '40~50dB': 0,
      '50~70dB': 0,
      '70~90dB': 0,
      '90~120dB': 0
    },
    deviceId: '',
    menuShow: 'show',
    data: [],
    hasData: true
  },
  mutations: {
    initData (state, data) {
      state.deviceId = data[0]['device_id']
      data.map(item => {
        let date = new Date(item.time)
        state.Lp.push(item.Lp)
        state.lum.push(item.lum)
        state.time.push(date)
        state.data.push({
          date: item.time,
          time: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`,
          Lp: item.Lp,
          lum: item.lum
        })
        this.commit('LpAnalyze', item.Lp)
        this.commit('lumAnalyze', item.lum)
      })
      setTimeout(() => {
        state.loading = false
      }, 1000)
    },
    upData (state, data) {
      state.Lp.push(data.Lp)
      state.lum.push(data.lum)
      state.time.push(new Date(data.time))
      this.commit('LpAnalyze', data.Lp)
      this.commit('lumAnalyze', data.lum)
    },
    LpAnalyze (state, data) {
      let barData = state.LpBar
      data = parseFloat(data)
      if (data < 50) {
        if (data < 40) {
          barData['30~40dB'] += 1
        } else {
          barData['40~50dB'] += 1
        }
      } else {
        if (data < 90) {
          if (data < 70) {
            barData['50~70dB'] += 1
          } else {
            barData['70~90dB'] += 1
          }
        } else {
          barData['90~120dB'] += 1
        }
      }
    },
    lumAnalyze (state, data) {
      let barData = state.lumBar
      data = parseFloat(data)
      if (data < 100) {
        if (data < 10) {
          if (data < 3) {
            if (data < 1) {
              if (data < 0.5) {
                barData['0~0.5lx'] += 1
              } else {
                barData['0.5~1lx'] += 1
              }
            } else {
              barData['1~3lx'] += 1
            }
          } else {
            if (data < 5) {
              barData['3~5lx'] += 1
            } else {
              barData['5~10lx'] += 1
            }
          }
        } else {
          if (data < 50) {
            if (data < 30) {
              if (data < 15) {
                barData['10~15lx'] += 1
              } else {
                barData['15~30lx'] += 1
              }
            } else {
              barData['30~50lx'] += 1
            }
          } else {
            if (data < 75) {
              barData['50~75lx'] += 1
            } else {
              barData['75~100lx'] += 1
            }
          }
        }
      } else {
        if (data < 750) {
          if (data < 200) {
            if (data < 150) {
              barData['100~150lx'] += 1
            } else {
              barData['150~200lx'] += 1
            }
          } else {
            if (data < 500) {
              if (data < 300) {
                barData['200~300lx'] += 1
              } else {
                barData['300~500lx'] += 1
              }
            } else {
              barData['500~750lx'] += 1
            }
          }
        } else {
          if (data < 1500) {
            if (data < 1000) {
              barData['750~1000lx'] += 1
            } else {
              barData['1000~1500lx'] += 1
            }
          } else {
            if (data < 2000) {
              barData['1500~2000lx'] += 1
            } else {
              if (data < 3000) {
                barData['2000~3000lx'] += 1
              } else {
                barData['3000~5000lx'] += 1
              }
            }
          }
        }
      }
    },
    history (state, data) {
      state.loading = true
      if (data.length === 0) {
        state.hasData = false
      } else {
        state.hasData = true
      }
      state.Lp = []
      state.lum = []
      state.time = []
      state.data = []
      state.LpBar = {
        '30~40dB': 0,
        '40~50dB': 0,
        '50~70dB': 0,
        '70~90dB': 0,
        '90~120dB': 0
      }
      state.lumBar = {
        '0~0.5lx': 0,
        '0.5~1lx': 0,
        '1~3lx': 0,
        '3~5lx': 0,
        '5~10lx': 0,
        '10~15lx': 0,
        '15~30lx': 0,
        '20~30lx': 0,
        '30~50lx': 0,
        '50~75lx': 0,
        '75~100lx': 0,
        '100~150lx': 0,
        '150~200lx': 0,
        '200~300lx': 0,
        '300~500lx': 0,
        '500~750lx': 0,
        '750~1000lx': 0,
        '1000~1500lx': 0,
        '1500~2000lx': 0,
        '2000~3000lx': 0,
        '3000~5000lx': 0
      }
      data.map(item => {
        let date = new Date(item.time)
        state.Lp.push(item.Lp)
        state.lum.push(item.lum)
        state.time.push(date)
        state.data.push({
          date: item.time,
          time: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`,
          Lp: item.Lp,
          lum: item.lum
        })
        this.commit('LpAnalyze', item.Lp)
        this.commit('lumAnalyze', item.lum)
      })
      state.loading = false
      console.log(state.data)
    }
  },
  actions: {
    getData (context) {
      axios.get('http://runasama.club/data').then((res) => {
        context.commit('initData', res.data.reverse())
      })
    }
  }
})
