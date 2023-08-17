import './index.less'
import { Layout, Button, theme } from 'antd'
import { updateCollapse, selectApp } from '@/store/festures/appSlice'
import { useStoreDispatch, useStoreSelector } from '@/store'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Avatar from '@/components/Avatar'
import Language from '@/components/Language'
import Breadcrumb from '@/components/Breadcrumb'

const { Header } = Layout
const LayoutHeader = () => {
  const appState = useStoreSelector(selectApp)
  const { isCollapse } = appState
  const dispatch = useStoreDispatch()
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
          onClick={() => dispatch(updateCollapse(!isCollapse))}
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

export default LayoutHeader
