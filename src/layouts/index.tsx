import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import LayoutHeader from './components/Header'
import LayoutFooter from './components/Footer'
import LayoutMenu from './components/Menu'
import './index.scss'
const Layouts: FC = () => {
  const { Sider } = Layout
  return (
    <section className="container">
      <Sider>
        <LayoutMenu />
      </Sider>
      <Layout>
        <LayoutHeader />
        <Outlet />
        <LayoutFooter />
      </Layout>
    </section>
  )
}

export default Layouts
