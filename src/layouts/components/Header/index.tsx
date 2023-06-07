import './index.less'
import { Layout, Button, Switch, theme } from 'antd'
import { connect } from 'react-redux'
import { updateCollapse } from '@/redux/modules/app/action'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Logout from '@/components/Logout'
import Breadcrumb from '@/components/Breadcrumb'
import { ReactComponent as Sum } from '@/icons/svg/sum.svg'
import { ReactComponent as Moon } from '@/icons/svg/moon.svg'
import { setThemeConfig } from '@/redux/modules/app/action'

const { Header } = Layout
const LayoutHeader = (props) => {
  const { isCollapse, updateCollapse, themeConfig, setThemeConfig } = props
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <Header className="pad_header" style={{ background: colorBgContainer }}>
      <div className="nav_left">
        <Button
          className="header_btn"
          type="text"
          icon={isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => updateCollapse(!isCollapse)}
        />
        <Breadcrumb />
      </div>
      <div className="nav_right">
        <Switch
          defaultChecked={themeConfig.theme === 'dark'}
          checkedChildren={<Moon className="icon" />}
          unCheckedChildren={<Sum className="icon" />}
          onChange={(value) =>
            setThemeConfig({
              theme: value ? 'dark' : 'light'
            })
          }
        ></Switch>
        <Logout />
      </div>
    </Header>
  )
}

const mapStateToProps = (state: Store) => ({
  isCollapse: state.app.isCollapse,
  themeConfig: state.app.themeConfig
})

const mapDispatchToProps = {
  updateCollapse,
  setThemeConfig
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutHeader)
