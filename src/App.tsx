import { ConfigProvider } from 'antd'
import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import AuthRouter from './AuthRouter'

const validateMessages = {
  required: '${label}是必填字段'
}

const App: FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider form={{ validateMessages }}>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
