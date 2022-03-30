<template>
  <div
    ref="chartRef"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { PropType, ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
const props = defineProps({
  className: {
    type: String,
    default: 'chart',
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '300px',
  },
})

const chart = ref<any>()
const chartRef = ref<HTMLElement>()
const animationDuration = 300
function initChart() {
  chart.value = echarts.init(chartRef.value!)
  chart.value.setOption({
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: 10,
      left: '2%',
      right: '2%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'pageA',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [79, 52, 200, 334, 390, 330, 220],
        animationDuration,
      },
      {
        name: 'pageB',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [80, 52, 200, 334, 390, 330, 220],
        animationDuration,
      },
      {
        name: 'pageC',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [30, 52, 200, 334, 390, 330, 220],
        animationDuration,
      },
    ],
  })
}
onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

onBeforeUnmount(() => {
  if (!chart.value) {
    return
  }
  chart.value.dispose()
  chart.value = null
})
</script>

<style scoped>
</style>