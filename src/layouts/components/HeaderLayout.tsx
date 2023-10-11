import { Outlet, useLocation } from 'react-router-dom'
import { Layout, theme } from 'antd'
import LayoutFooter from './Footer'
import LayoutTabs from './Tabs'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './Header/index.less'
import Logo from './Logo'
import Avatar from '@/components/Avatar'
import Language from '@/components/Language'
import LayoutMenu from './Menu'
import { selectApp } from '@/redux/festures/appSlice'
import { useStoreSelector } from '@/redux'
const HeaderLayout = () => {
  const { Content, Header } = Layout
  const appState = useStoreSelector(selectApp)
  const { themeConfig } = appState
  console.log(themeConfig)
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
    </section>
  )
}

export default HeaderLayout
