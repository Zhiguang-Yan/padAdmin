import * as Echarts from 'echarts'
import type { EChartOption } from 'echarts'
import { Ref, onMounted, onBeforeUnmount } from 'vue'
import { debounce } from 'lodash'
/**
 * echrts hooks
 * @param chartRef 传入的chart dom元素
 * @param option echart options配置
 * @returns
 */
export const useEchrts = (chartRef: Ref, option: EChartOption) => {
  let chart: any
  const setOption = (option: EChartOption) => {
    chart.setOption(option)
  }
  const $_resizeHandler = debounce(function () {
    chart.resize()
  }, 300)

  onMounted(() => {
    window.addEventListener('resize', $_resizeHandler)
    chart = Echarts.init(chartRef.value)
    setOption(option)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler)
    chart && (chart.dispose(), (chart.value = null))
  })
  return { setOption }
}
