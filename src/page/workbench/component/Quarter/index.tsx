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
      data: ['一季度', '二季度', '三季度', '四季度'],
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
      bottom: 80,
      top: 30,
      right: 50,
      left: 60
    },
    series: [
      {
        data: [1345, 2100, 1330, 2910],
        name: '已完成订单',
        type: 'line',
        symbolSize: 1,
        symbol: 'circle',
        smooth: true,
        showSymbol: false,
        color: '#73DDBF',
        lineStyle: {
          width: 5,
          color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
            {
              offset: 0,
              color: '#73DD39'
            },
            {
              offset: 1,
              color: '#73DDFF'
            }
          ]),
          shadowColor: 'rgba(115,221,255, 0.3)',
          shadowBlur: 10,
          shadowOffsetY: 20
        }
      },
      {
        data: [1905, 1020, 3330, 512],
        name: '计划完成订单',
        type: 'line',
        symbolSize: 1,
        symbol: 'circle',
        smooth: true,
        showSymbol: false,
        color: '#73DDBF',
        lineStyle: {
          width: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: '#fe9a'
            },
            {
              offset: 1,
              color: '#fe9a8b'
            }
          ]),
          shadowColor: 'rgba(254,154,139, 0.3)',
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
  height: '298px',
  width: '100%'
}

export default LineChart
