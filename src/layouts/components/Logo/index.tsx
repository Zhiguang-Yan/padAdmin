import styles from './index.module.less'
import { ReactComponent as LogoIcon } from '@/icons/svg/logo.svg'
import { theme } from 'antd'
import { connect } from 'react-redux'
import { FC } from 'react'

const Logo: FC<{ isCollapse: boolean }> = (props) => {
  const {
    token: { colorPrimary }
  } = theme.useToken()
  const { isCollapse } = props
  return (
    <div className={styles.logo}>
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

const mapStateToProps = (state: Store) => ({
  isCollapse: state.app.isCollapse
})

export default connect(mapStateToProps, null)(Logo)
