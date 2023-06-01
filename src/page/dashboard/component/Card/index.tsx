import { FC, ReactNode, RefAttributes } from 'react'
import { ArrowUpOutlined } from '@ant-design/icons'
import './index.scss'

interface PropsType {
  title: string | ReactNode
  count: string | number
  icon: ReactNode
  percent: number
  className?: string
}

const Card: FC<PropsType & RefAttributes<HTMLElement>> = (props) => {
  const { title, count, icon, percent, className } = props
  return (
    <div className={`card_ ${className}`}>
      <div className="title">{title}</div>
      <div className="content">
        <div className="count">{count}</div>
        <div className="icon">{icon}</div>
      </div>
      <div className="bottom">
        <span>自上周以来</span>
        <ArrowUpOutlined className="arrow" />
        <span className="sub_title">{percent}%</span>
      </div>
    </div>
  )
}

Card.defaultProps = {
  className: ''
}

export default Card
