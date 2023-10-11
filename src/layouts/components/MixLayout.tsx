import { Outlet, useLocation } from 'react-router-dom'
import { Layout, theme } from 'antd'
import { updateCollapse } from '@/redux/festures/appSlice'
import { selectApp } from '@/redux/festures/appSlice'
import { useStoreSelector, useStoreDispatch } from '@/redux'
import LayoutFooter from './Footer'
import LayoutMenu from './Menu'
import Logo from './Logo'
import Avatar from '@/components/Avatar'
import Language from '@/components/Language'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

const MixLayout = (props) => {
  const { Sider, Content, Header } = Layout
  const appState = useStoreSelector(selectApp)
  const dispatch = useStoreDispatch()
  const { themeConfig, isCollapse } = appState
  const { pathname } = useLocation()
  const {
    token: { colorBgContainer, colorTextBase }
  } = theme.useToken()
  console.log(colorTextBase)
  return (
    <section className="container">
      <Layout>
        <Header className="pad_header">
          <div className="nav_left">
            <Logo />
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
        <Layout hasSider>
          <Sider
            collapsible
            width={208}
            collapsedWidth={48}
            collapsed={isCollapse}
            theme={themeConfig.theme.startsWith('dark') ? 'dark' : 'light'}
            trigger={isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onCollapse={(value) => dispatch(updateCollapse(value))}
          >
            <LayoutMenu uniqueOpened />
          </Sider>
          <Layout>
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
      </Layout>
    </section>
  )
}

export default MixLayout
