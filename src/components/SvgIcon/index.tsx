import { FC } from 'react'
import '../../assets/svg/weChat.svg'
import '../../assets/svg/qq.svg'
interface SvgProps {
  name: string // 图标的名称 ==> 必传
  color?: string //图标的颜色 ==> 非必传
  prefix?: string // 图标的前缀 ==> 非必传（默认为"icon"）
  iconStyle?: { [key: string]: any } // 图标的样式 ==> 非必传
}

const SvgIcon: FC<SvgProps> = (props) => {
  const { prefix, name, iconStyle } = props
  const symbolId = `#${prefix}-${name}`
  return (
    <svg aria-hidden="true" style={iconStyle}>
      <use xlinkHref={symbolId} />
    </svg>
  )
}

SvgIcon.defaultProps = {
  prefix: 'icon',
  iconStyle: { width: '100px', height: '100px' },
  color: '#000'
}

export default SvgIcon
