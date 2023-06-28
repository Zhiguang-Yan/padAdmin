import styles from './index.module.less'
import { ReactComponent as LogoIcon } from '@/icons/svg/logo.svg'
import { theme } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'

const Logo: FC<{ isCollapse?: boolean }> = (props) => {
  const {
    token: { colorPrimary }
  } = theme.useToken()
  const { isCollapse } = props
  const navigate = useNavigate()
  return (
    <div className={styles.logo} onClick={() => navigate(HOME_URL)}>
      <LogoIcon className={styles.icon} />
      {!isCollapse && (
        <span
          style={{
            color: colorPrimary
          }}
        >
          Ant Design Plus
        </span>
      )}
    </div>
  )
}

Logo.defaultProps = {
  isCollapse: false
}

// const mapStateToProps = (state: Store) => ({
//   isCollapse: state.app.isCollapse
// })

export default Logo
