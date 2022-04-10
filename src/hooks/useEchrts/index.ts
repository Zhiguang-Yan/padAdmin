import * as Echarts from 'echarts'
import type { EChartOption } from 'echarts'
import { ref, Ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
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
  onMounted(() => {
    chart = Echarts.init(chartRef.value)
    setOption(option)
  })
  onBeforeUnmount(() => {
    chart && (chart.dispose(), (chart.value = null))
  })
  return { setOption }
}
