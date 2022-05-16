import { onMounted, onBeforeUnmount, Ref } from 'vue'
import { debounce } from 'lodash'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

export const useEcharts = (
  options: EChartsOption,
  chartRef: Ref<HTMLElement | undefined>
) => {
  let chart: any
  // eslint-disable-next-line func-names
  const $_resizeHandler = debounce(function () {
    chart.resize()
  }, 300)
  function $_initResizeEvent() {
    window.addEventListener('resize', $_resizeHandler)
  }
  const setOption = (option: EChartsOption) => {
    // 第二个参数意思不会合并配置
    chart.setOption(option as EChartsOption, true)
  }
  function $_destroyResizeEvent() {
    window.removeEventListener('resize', $_resizeHandler)
    chart = null
  }
  onMounted(() => {
    chart = echarts.init(chartRef.value as HTMLElement)
    setOption(options)
    $_initResizeEvent()
  })
  onBeforeUnmount(() => {
    $_destroyResizeEvent()
  })
  return {
    setOption,
  }
}

export default useEcharts
