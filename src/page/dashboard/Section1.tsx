import { ReactComponent as Order } from '@/icons/svg/order.svg'
import { ReactComponent as Money } from '@/icons/svg/money.svg'
import { ReactComponent as User } from '@/icons/svg/user.svg'
import { ReactComponent as Deal } from '@/icons/svg/deal.svg'
import Card from './component/Card'
import { useState, FC } from 'react'
import { Col } from 'antd'

const Section1: FC = () => {
  const [curIndex, setCurIndex] = useState(0)
  const styles = {
    background: 'linear-gradient(90deg, #74bcff, #1890ff)',
    color: '#fff'
  }

  const colSpan = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 12 },
    lg: { span: 8 },
    xl: { span: 8 },
    xxl: { span: 6 }
  }
  const cardList = [
    {
      title: '总销量',
      count: '￥4,718',
      icon: <Money />,
      percent: 40
    },
    {
      title: '总成交',
      count: '5,559',
      icon: <Deal />,
      percent: 33
    },
    {
      title: '活跃用户',
      count: '9,694',
      icon: <User />,
      percent: 10
    },
    {
      title: '订单',
      count: '2,553',
      icon: <Order />,
      percent: 15
    }
  ]

  return (
    <>
      {cardList.map((card, index) => (
        <Col {...colSpan} key={index} onClick={() => setCurIndex(index)}>
          <Card className={curIndex === index ? 'is_active' : ''} {...card} />
        </Col>
      ))}
    </>
  )
}

export default Section1
