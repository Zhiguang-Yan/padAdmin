import { Outlet, useLocation } from 'react-router-dom'
import { Layout, theme } from 'antd'
import LayoutHeader from './Header'
import LayoutFooter from './Footer'
import LayoutMenu from './Menu'
import LayoutTabs from './Tabs'
import Logo from './Logo'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { selectApp } from '@/store/festures/appSlice'
import { useStoreSelector } from '@/store'
const SiderLayout = () => {
  const { Sider, Content } = Layout
  const appState = useStoreSelector(selectApp)
  const { isCollapse, themeConfig } = appState
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
          <Logo isCollapse={isCollapse} />
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
    </section>
  )
}

export default SiderLayout
