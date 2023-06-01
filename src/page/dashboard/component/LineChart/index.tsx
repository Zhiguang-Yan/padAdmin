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
      type: 'value'
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
        data: [1279, 2522, 3225, 4552, 5255, 1200, 4500, 6252, 1456, 1252, 1567, 8956],
        name: '签单',
        type: 'line',
        symbolSize: 1,
        symbol: 'circle',
        smooth: true,
        showSymbol: false,
        color: '#39C3D5',
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(252, 177, 17, 0)',
          shadowBlur: 10,
          shadowOffsetY: 20
        },
        areaStyle: {
          color: '#39C3D5'
        }
      },
      {
        data: [2905, 4565, 1548, 5555, 555, 4514, 8874, 4512, 4854, 5888, 9666, 1244],
        name: '回款',
        type: 'line',
        yAxisIndex: 0,
        symbolSize: 1,
        color: '#46A6FF',
        symbol: 'circle',
        showSymbol: false,
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(252, 177, 17, 0)',
          shadowBlur: 10,
          shadowOffsetY: 20
        },
        areaStyle: {
          color: '#46A6FF'
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
