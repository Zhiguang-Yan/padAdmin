import { useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

export const useEcharts = (options: EChartsOption) => {
  const chartRef = useRef(null)
  let chart: any
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
  useEffect(() => {
    chart = echarts.init(chartRef.current!)
    setOption(options)
    $_initResizeEvent()
    return () => $_destroyResizeEvent()
  }, [])
  return { chartRef, setOption }
}

export default useEcharts
