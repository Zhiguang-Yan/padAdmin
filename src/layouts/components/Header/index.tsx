import './index.less'
import { Layout, Button, theme } from 'antd'
import { connect } from 'react-redux'
import { updateCollapse } from '@/redux/modules/app/action'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Logout from '@/components/Logout'
import Breadcrumb from '@/components/Breadcrumb'

const { Header } = Layout
const LayoutHeader = (props) => {
  const { isCollapse, updateCollapse } = props
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
        <Logout />
      </div>
    </Header>
  )
}

const mapStateToProps = (state: Store) => ({
  isCollapse: state.app.isCollapse
})

const mapDispatchToProps = {
  updateCollapse
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutHeader)
