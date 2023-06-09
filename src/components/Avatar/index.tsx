import { Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { UserOutlined, LogoutOutlined, BarsOutlined } from '@ant-design/icons'
import AvatarImg from '@/assets/images/avatar.png'

const Avatar = () => {
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
        <div>
          <LogoutOutlined /> 退出登录
        </div>
      )
    }
  ]
  return (
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
  )
}

export default Avatar
