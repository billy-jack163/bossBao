<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style lang="less" scoped>
// 1.占据整个屏幕 2.实现响应式 3.移动端适配
.app {
  width: 100vw;
  height: 100vh;
}
</style>
