<template>
  <div
    ref="chartRef"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { ref, watch } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'
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
  chartData: {
    type: Object,
    required: true,
  },
})
const chartRef = ref<HTMLElement>()
function setData(data: any) {
  return {
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
          borderWidth: 2,
          borderColor: '#FFF',
        },
        lineStyle: {
          shadowBlur: 12,
          shadowColor: 'rgba(43, 184, 208, 1)',
          shadowOffsetX: 1,
          shadowOffsetY: 1,
        },
        smooth: true,
        symbol: 'none',
        type: 'line',
        data: data.expectedData,
        animationDuration: 2800,
        animationEasing: 'cubicInOut',
      },
      {
        name: 'actual',
        smooth: true,
        type: 'line',
        symbol: 'none',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#FFF',
        },
        lineStyle: {
          shadowBlur: 12,
          shadowColor: 'rgba(92, 139, 218, 1)',
          shadowOffsetX: 1,
          shadowOffsetY: 1,
        },
        data: data.actualData,
        animationDuration: 2800,
        animationEasing: 'quadraticOut',
      },
    ],
  }
}
const { setOption } = useEcharts(
  setData(props.chartData) as EChartsOption,
  chartRef
)
watch(
  () => props.chartData,
  (newValue) => {
    setOption(setData(newValue) as EChartsOption)
  }
)
</script>

<style scoped></style>
