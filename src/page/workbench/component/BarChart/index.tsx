import { FC } from 'react'
import { useEcharts } from '@/hooks/useEcharts'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

interface PropsType {
  className?: string
  width?: string
  height?: string
}
const BarChart: FC<PropsType> = (props) => {
  const { className, width, height } = props
  const options: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      formatter: (params) =>
        `${params[0].name}<br/>${params[0].marker}${
          params[0].seriesName
        }：${params[0].value.toLocaleString()} 亿元`
    },
    grid: {
      bottom: 0,
      top: 0,
      right: 60,
      left: 50
    },
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      {
        offset: 0,
        color: '#3ED473'
      },
      {
        offset: 1,
        color: '#399EFB'
      }
    ]),
    xAxis: {
      type: 'value',
      show: false
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLabel: {
          show: true
        },
        splitLine: {
          show: false
        },
        axisTick: 'none',
        axisLine: {
          show: false
        },
        data: ['南山区', '福田区', '罗湖区', '宝安区', '龙华区', '龙岗区']
      }
    ],
    series: [
      {
        name: '累计消费',
        type: 'bar',
        itemStyle: {
          borderRadius: 4
        },
        barWidth: 25,
        data: [650, 390, 374, 341, 302, 320],
        label: {
          show: true,
          position: 'right',
          color: '#399EFB',
          fontSize: 14,
          formatter: '{c}亿元'
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

BarChart.defaultProps = {
  className: '',
  height: '300px',
  width: '100%'
}
export default BarChart
