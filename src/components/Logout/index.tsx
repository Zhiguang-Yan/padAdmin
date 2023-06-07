import { connect } from 'react-redux'
import './index.less'
import { ExportOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { logout } from '@/redux/modules/user/action'
import { useLocation, useNavigate } from 'react-router-dom'

export const Logout = (props) => {
  const { logout } = props
  const [modal, contextHolder] = Modal.useModal()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const handleLogout = () => {
    modal.confirm({
      title: '提示',
      centered: true,
      content: '您确定要退出该账户',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await logout()
          navigate(`/login?redirect=${pathname}`, { replace: true })
        } catch (error) {}
      }
    })
  }

  return (
    <>
      <Button type="text" className="logout" onClick={handleLogout}>
        退出
        <ExportOutlined />
      </Button>
      {contextHolder}
    </>
  )
}

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(Logout)
