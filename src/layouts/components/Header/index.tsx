import './index.scss'
import { Layout, Button } from 'antd'
import { connect } from 'react-redux'
import { updateCollapse } from '@/redux/modules/app/action'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const { Header } = Layout
const LayoutHeader = (props) => {
  const { isCollapse, updateCollapse } = props
  return (
    <Header className="pad_header">
      <Button
        className="header_btn"
        type="text"
        icon={isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => updateCollapse(!isCollapse)}
      />
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
