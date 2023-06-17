import { connect } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout, theme, FloatButton } from 'antd'
import LayoutFooter from './Footer'
import LayoutTabs from './Tabs'
import LayoutSetting from './Setting'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './Header/index.less'
import { ReactComponent as Setting } from '@/icons/svg/setting.svg'
import { useState } from 'react'
import Logo from './Logo'
import Avatar from '@/components/Avatar'
import Language from '@/components/Language'
import LayoutMenu from './Menu'

const HeaderLayout = (props) => {
  const { Content, Header } = Layout
  const { themeConfig } = props
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()
  const {
    token: { colorBgContainer, colorTextBase }
  } = theme.useToken()
  return (
    <section
      className="container"
      style={{
        color: colorTextBase
      }}
    >
      <Layout>
        <Header className="pad_header" style={{ background: colorBgContainer }}>
          <div className="nav_left">
            <Logo />
            <LayoutMenu
              uniqueOpened
              attrs={{
                mode: 'horizontal'
              }}
            />
          </div>
          <div className="nav_right">
            <div className="nav_item">
              <Avatar />
            </div>
            <div className="nav_item">
              <Language />
            </div>
          </div>
        </Header>
        <LayoutTabs />
        <Content
          style={{
            background: colorBgContainer
          }}
        >
          <SwitchTransition>
            <CSSTransition timeout={300} classNames="fade" key={pathname}>
              <Outlet />
            </CSSTransition>
          </SwitchTransition>
        </Content>
        <LayoutFooter />
      </Layout>

      <FloatButton
        shape="square"
        icon={<Setting className="menu_icon" />}
        tooltip={<div>设置</div>}
        onClick={() => setShow(true)}
      />
      <LayoutSetting open={show} onClose={() => setShow(false)} />
    </section>
  )
}

const mapStateToProps = (state: Store) => ({
  themeConfig: state.app.themeConfig
})
export default connect(mapStateToProps, null)(HeaderLayout)
