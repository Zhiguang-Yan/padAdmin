import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react'

const NotFound: FC = () => {
  const navigate = useNavigate()
  function goHome() {
    navigate({
      pathname: '/'
    })
  }
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="不好意思，你没有该权限，请联系领导开通"
        extra={
          <Button type="primary" onClick={goHome}>
            Back Home
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
