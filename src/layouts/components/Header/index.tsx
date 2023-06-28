import './index.less'
import { Layout, Button, theme } from 'antd'
import { connect } from 'react-redux'
import { updateCollapse } from '@/redux/modules/app/action'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Avatar from '@/components/Avatar'
import Language from '@/components/Language'
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
        <div className="nav_item">
          <Avatar />
        </div>
        <div className="nav_item">
          <Language />
        </div>
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
