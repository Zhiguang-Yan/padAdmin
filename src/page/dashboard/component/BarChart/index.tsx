import { FC } from 'react'

import { useEcharts } from '@/hooks/useEcharts'
import type { EChartsOption } from 'echarts'

interface PropsType {
  className?: string
  width?: string
  height?: string
}
const BarChart: FC<PropsType> = (props) => {
  const { className, width, height } = props
  const options: EChartsOption = {
    xAxis: {
      type: 'category',
      show: false
    },
    grid: {
      left: '0%'
    },
    yAxis: {
      offset: 30,
      name: '单位：元',
      show: false,
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line',
        symbolSize: [6, 6]
      }
    ]
  }
  const { chartRef, setOption } = useEcharts(options)

  return (
    <div
      ref={chartRef}
      className={className}
      style={{
        width,
        height
      }}
    ></div>
  )
}

BarChart.defaultProps = {
  className: '',
  height: '200px',
  width: '100%'
}
export default BarChart
