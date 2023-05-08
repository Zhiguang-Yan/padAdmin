import { FC } from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'

const NotAuth: FC = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="403"
      title="403"
      subTitle="不好意思，你没有该权限，请联系领导开通"
      extra={
        <Button type="primary" onClick={() => navigate(HOME_URL)}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotAuth
