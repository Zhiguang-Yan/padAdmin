import { Button, Dropdown, Modal } from 'antd'
import type { MenuProps } from 'antd'
import { connect } from 'react-redux'
import { UserOutlined, LogoutOutlined, BarsOutlined } from '@ant-design/icons'
import AvatarImg from '@/assets/images/avatar.png'
import { logout } from '@/redux/modules/user/action'
import { useLocation, useNavigate } from 'react-router-dom'

const Avatar = (props) => {
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
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div>
          <UserOutlined /> 个人中心
        </div>
      )
    },
    {
      key: 2,
      label: (
        <div>
          <BarsOutlined /> 个人设置
        </div>
      )
    },
    {
      key: 3,
      label: (
        <div onClick={handleLogout}>
          <LogoutOutlined /> 退出登录
        </div>
      )
    }
  ]
  return (
    <>
      <Dropdown menu={{ items }}>
        <Button
          type="text"
          style={{
            height: '100%',
            borderRadius: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          icon={<img height="24px" width="24px" src={AvatarImg} alt="" />}
        >
          <span>Serati Ma</span>
        </Button>
      </Dropdown>
      {contextHolder}
    </>
  )
}
const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(Avatar)
