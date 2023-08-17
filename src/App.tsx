import { ConfigProvider, theme } from 'antd'
import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import AuthRouter from './AuthRouter'
import useTheme from './hooks/useTheme'
import { selectApp } from '@/store/festures/appSlice'
import { useStoreSelector } from '@/store'
const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label}是必填字段'
}

const App: FC = () => {
  const appState = useStoreSelector(selectApp)
  const { themeConfig } = appState
  useTheme(themeConfig)
  return (
    <BrowserRouter>
      <ConfigProvider
        form={{ validateMessages }}
        theme={{
          algorithm: themeConfig.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: themeConfig.primary,
            borderRadius: themeConfig.borderRadius
          }
        }}
      >
        <AuthRouter>
          <Router />
        </AuthRouter>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
