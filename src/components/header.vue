<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item class="title" index="1">噪声与光照检测系统</el-menu-item>
    <el-submenu index="2">
      <template slot="title">设备编号</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" @click="show">Menu</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    show () {
      let flag = this.$store.state.menuShow
      if (flag === 'show') {
        this.$store.state.menuShow = 'hidden'
      } else {
        this.$store.state.menuShow = 'show'
      }
    }
  }
}
</script>
<style scoped>
.title{
    font-size: 20px;
}
@media screen and (max-width: 500px){
    .title{
        font-size: 2rem;
    }
}
</style>
