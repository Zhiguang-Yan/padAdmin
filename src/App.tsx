import { ConfigProvider } from 'antd'
import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
const App: FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Router></Router>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
