import { FC } from 'react'
import { Col } from 'antd'
import { ReactComponent as Trend } from '@/icons/svg/trend.svg'
import { ReactComponent as Distribution } from '@/icons/svg/distribution.svg'
import { ReactComponent as Rank } from '@/icons/svg/rank.svg'
import BarChart from './component/BarChart'
import LineChart from './component/LineChart'
import PieChart from './component/PieChart'

const Section2: FC = () => {
  return (
    <>
      <Col span={12}>
        <div className="card">
          <div className="header">
            <Trend />
            <span>趋势</span>
          </div>
          <div className="content">
            <LineChart />
          </div>
        </div>
      </Col>
      <Col span={6}>
        <div className="card">
          <div className="header">
            <Distribution />
            <span>分布</span>
          </div>
          <div className="content">
            <PieChart />
          </div>
        </div>
      </Col>
      <Col span={6}>
        <div className="card">
          <div className="header">
            <Rank />
            <span>消费排行</span>
          </div>
          <div className="content">
            <BarChart />
          </div>
        </div>
      </Col>
    </>
  )
}

export default Section2
