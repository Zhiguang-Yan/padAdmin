import { connect } from 'react-redux'
import './index.scss'
import { ExportOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { logout } from '@/redux/modules/user/action'
import { useLocation, useNavigate } from 'react-router-dom'

export const Logout = (props) => {
  const { logout } = props
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const handleLogout = async () => {
    try {
      await logout()
      navigate(`/login?redirect=${pathname}`, { replace: true })
    } catch (error) {}
  }
  return (
    <Button type="text" className="logout" onClick={handleLogout}>
      退出
      <ExportOutlined />
    </Button>
  )
}

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(Logout)
