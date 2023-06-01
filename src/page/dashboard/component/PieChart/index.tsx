import { FC } from 'react'
import { useEcharts } from '@/hooks/useEcharts'
import type { EChartsOption } from 'echarts'

interface PropsType {
  className?: string
  width?: string
  height?: string
}

const chartData = [
  { value: 300, name: '视频广告' },
  { value: 1048, name: '搜索引擎' },
  { value: 735, name: '直接访问' },
  { value: 580, name: '邮件营销' },
  { value: 484, name: '联盟广告' }
]

const sum = chartData.reduce((per, cur) => per + cur.value, 0)
const gap = (1 * sum) / 100
const pieData: any = []

chartData.forEach((element) => {
  pieData.push(element)
  pieData.push({
    name: '',
    value: gap,
    itemStyle: {
      color: 'transparent'
    }
  })
})

const PieChart: FC<PropsType> = (props) => {
  const { className, width, height } = props

  const options: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => `访问来源<br/>${params.marker}${params.name} ${params.value}`
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],
        itemStyle: {
          borderRadius: 10
        },
        data: pieData
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

PieChart.defaultProps = {
  className: '',
  height: '200px',
  width: '100%'
}
export default PieChart
