import { FC, useState } from 'react'
import { Button } from 'antd'
const Login: FC = () => {
  const [state, setState] = useState(0)

  return (
    <div>
      <Button type="primary" onClick={() => setState((state) => (state += 1))}>
        add
      </Button>
      {state}
    </div>
  )
}

export default Login
