import { FC } from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import LayoutHeader from './components/Header'
import LayoutFooter from './components/Footer'
import LayoutMenu from './components/Menu'
import './index.scss'

const Layouts = (props) => {
  const { Sider } = Layout
  const { isCollapse } = props
  return (
    <section className="container">
      <Sider collapsible collapsed={isCollapse} trigger={null}>
        <LayoutMenu uniqueOpened />
      </Sider>
      <Layout>
        <LayoutHeader />
        <Outlet />
        <LayoutFooter />
      </Layout>
    </section>
  )
}

const mapStateToProps = (state: Store) => ({
  isCollapse: state.app.isCollapse
})
export default connect(mapStateToProps, null)(Layouts)
