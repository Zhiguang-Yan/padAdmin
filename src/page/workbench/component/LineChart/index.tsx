import { FC } from 'react'
import { useEcharts } from '@/hooks/useEcharts'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

interface PropsType {
  className?: string
  width?: string
  height?: string
}

const LineChart: FC<PropsType> = (props) => {
  const { className, width, height } = props
  const options: EChartsOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      splitLine: {
        show: true
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      boundaryGap: false,
      type: 'value',
      splitLine: {
        show: false
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      bottom: 20,
      top: 10,
      right: 15,
      left: 50
    },
    series: [
      {
        data: [1279, 1020, 3330, 512, 4463, 1200, 5000, 3000, 1456, 1252, 1567, 3000],
        name: '销售额',
        type: 'line',
        symbolSize: 1,
        symbol: 'circle',
        smooth: true,
        showSymbol: false,
        color: '#73DDBF',
        lineStyle: {
          width: 5,
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: '#9effff'
            },
            {
              offset: 1,
              color: '#9E87FF'
            }
          ]),
          shadowColor: 'rgba(158,135,255, 0.3)',
          shadowBlur: 10,
          shadowOffsetY: 20
        }
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

LineChart.defaultProps = {
  className: '',
  height: '200px',
  width: '100%'
}

export default LineChart
