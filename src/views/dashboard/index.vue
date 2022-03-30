<template>
  <el-row>
    <el-col :span="24">
      <LineChart :chart-data="lineChartData.newVisitis" />
    </el-col>
  </el-row>
  <el-row :gutter="30">
    <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24"><RaddarChart /></el-col>
    <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
      <PieChart />
    </el-col>
    <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
      <BarChart />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { LineChart, BarChart, RaddarChart, PieChart } from './component'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
}
</script>

<style scoped>
</style>