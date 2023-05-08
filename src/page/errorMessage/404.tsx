import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react'
import { HOME_URL } from '@/config/config'

const NotFound: FC = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="找不到页面"
        extra={
          <Button type="primary" onClick={() => navigate(HOME_URL)}>
            Back Home
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
