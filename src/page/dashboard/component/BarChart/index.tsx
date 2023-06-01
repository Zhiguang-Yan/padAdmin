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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: (params) =>
        `${params[0].name}<br/>${params[0].marker}${params[0].seriesName}：${Number(
          (params[0].value.toFixed(4) / 10000).toFixed(2)
        ).toLocaleString()} 万元`
    },
    grid: {
      bottom: 0,
      top: 0,
      right: 60,
      left: 50
    },
    color: '#1890FF',
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
        data: ['富豪', '黄忠', '凯', '姜子牙', '刘备', '刘禅', '李信', '穷逼']
      },
      {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: {
          show: false
        },
        show: true,
        axisLabel: {
          formatter: function (value) {
            if (value >= 10000) {
              return (value / 10000).toLocaleString() + '万'
            } else {
              return value.toLocaleString()
            }
          }
        },
        data: [990000, 860000, 740000, 650000, 580000, 470000, 360000, 250000]
      }
    ],
    series: [
      {
        name: '累计消费',
        type: 'bar',
        itemStyle: {
          borderRadius: 15
        },
        barWidth: 10,
        data: [990000, 860000, 740000, 650000, 580000, 470000, 360000, 250000]
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
