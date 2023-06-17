import { connect } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout, theme, FloatButton } from 'antd'
import LayoutHeader from './Header'
import LayoutFooter from './Footer'
import LayoutMenu from './Menu'
import LayoutTabs from './Tabs'
import LayoutSetting from './Setting'
import Logo from './Logo'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './index.less'
import { ReactComponent as Setting } from '@/icons/svg/setting.svg'
import { useState } from 'react'

const MixLayout = (props) => {
  const { Sider, Content } = Layout
  const { isCollapse, themeConfig } = props
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
      <Layout hasSider>
        <Sider
          collapsible
          width={208}
          collapsedWidth={48}
          collapsed={isCollapse}
          theme={themeConfig.theme.startsWith('dark') ? 'dark' : 'light'}
          trigger={null}
        >
          <Logo />
          <LayoutMenu uniqueOpened />
        </Sider>
        <Layout>
          <LayoutHeader />
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
  isCollapse: state.app.isCollapse,
  themeConfig: state.app.themeConfig
})
export default connect(mapStateToProps, null)(MixLayout)
