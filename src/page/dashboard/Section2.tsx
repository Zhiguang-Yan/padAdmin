/*
 * @Author: liangxuemei 2668923320@qq.com
 * @Date: 2023-06-01 12:12:06
 * @LastEditors: liangxuemei 2668923320@qq.com
 * @LastEditTime: 2023-06-01 12:20:40
 * @FilePath: /padAdmin/src/page/dashboard/Section2.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FC } from 'react'
import { Col } from 'antd'
import { ReactComponent as Trend } from '@/icons/svg/trend.svg'
import { ReactComponent as Distribution } from '@/icons/svg/distribution.svg'
import { ReactComponent as Rank } from '@/icons/svg/rank.svg'
import BarChart from './component/BarChart'
import LineChart from './component/LineChart'
import PieChart from './component/PieChart'
// import TestChart from './component/TestChart'

const Section2: FC = () => {
  return (
    <>
      {/* <Col span={6}>
        <div className="card">
          <div className="header">
            <Trend />
            <span>我是新的chart</span>
          </div>
          <div className="content">
            <TestChart />
          </div>
        </div>
      </Col> */}
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
