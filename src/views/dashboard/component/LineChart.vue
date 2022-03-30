<template>
  <div
    ref="chartRef"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartOption } from 'echarts'
import { ref, PropType, onMounted, nextTick, onBeforeUnmount } from 'vue'
// import resize from './mixins/resize'
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
    default: '350px',
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  chartData: {
    type: Object,
    required: true,
  },
})
const chart = ref<any>()
const chartRef = ref<HTMLElement>()
function setOptions(data: any) {
  chart.value.setOption({
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false,
      axisTick: {
        show: false,
      },
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
    },
    yAxis: {
      axisTick: {
        show: false,
      },
    },
    legend: {
      data: ['expected', 'actual'],
    },
    series: [
      {
        name: 'expected',
        itemStyle: {
          normal: {
            color: '#FF005A',
            lineStyle: {
              color: '#FF005A',
              width: 2,
            },
          },
        },
        smooth: true,
        type: 'line',
        data: data.expectedData,
        animationDuration: 2800,
        animationEasing: 'cubicInOut',
      },
      {
        name: 'actual',
        smooth: true,
        type: 'line',
        itemStyle: {
          normal: {
            color: '#3888fa',
            lineStyle: {
              color: '#3888fa',
              width: 2,
            },
            areaStyle: {
              color: '#f3f8ff',
            },
          },
        },
        data: data.actualData,
        animationDuration: 2800,
        animationEasing: 'quadraticOut',
      },
    ],
  })
}
function initChart() {
  chart.value = echarts.init(chartRef.value!)
  setOptions(props.chartData)
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