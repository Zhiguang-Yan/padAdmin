import { ConfigProvider, theme } from 'antd'
import { FC } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import AuthRouter from './AuthRouter'
import useTheme from './hooks/useTheme'

const validateMessages = {
  required: '${label}是必填字段'
}

const App: FC = (props: any) => {
  const { themConfig } = props

  useTheme(themConfig)
  return (
    <BrowserRouter>
      <ConfigProvider
        form={{ validateMessages }}
        theme={{
          algorithm: themConfig.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: themConfig.primary,
            borderRadius: themConfig.borderRadius
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

const mapStateToProps = (state: Store) => ({
  themConfig: state.app.themeConfig
})

export default connect(mapStateToProps, null)(App)
