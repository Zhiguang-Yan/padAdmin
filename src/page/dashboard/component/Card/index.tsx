import { FC, ReactNode, RefAttributes } from 'react'
import { ArrowUpOutlined } from '@ant-design/icons'
import styles from './index.module.less'

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
    <div className={`${styles.card} ${styles[className!]}`}>
      <div>{title}</div>
      <div className={styles.content}>
        <div>{count}</div>
        <div className={styles.icon}>{icon}</div>
      </div>
      <div className={styles.bottom}>
        <span>自上周以来</span>
        <ArrowUpOutlined className={styles.arrow} />
        <span className={styles.sub_title}>{percent}%</span>
      </div>
    </div>
  )
}

Card.defaultProps = {
  className: ''
}

export default Card
