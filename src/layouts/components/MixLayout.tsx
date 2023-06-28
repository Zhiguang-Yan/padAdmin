import { connect } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout, theme } from 'antd'
import { updateCollapse } from '@/redux/modules/app/action'
import LayoutFooter from './Footer'
import LayoutMenu from './Menu'
import Logo from './Logo'
import Avatar from '@/components/Avatar'
import Language from '@/components/Language'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

const MixLayout = (props) => {
  const { Sider, Content, Header } = Layout
  const { isCollapse, themeConfig, updateCollapse } = props
  const { pathname } = useLocation()
  const {
    token: { colorBgContainer, colorTextBase }
  } = theme.useToken()
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
            onCollapse={(value) => updateCollapse(value)}
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

const mapStateToProps = (state: Store) => ({
  isCollapse: state.app.isCollapse,
  themeConfig: state.app.themeConfig
})

const mapDispatchToProps = {
  updateCollapse
}

export default connect(mapStateToProps, mapDispatchToProps)(MixLayout)
