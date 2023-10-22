import { ConfigProvider, theme } from 'antd'
import { FC, ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Router, { routes } from './routes'
import AuthRouter from './AuthRouter'
import useTheme from './hooks/useTheme'
import { selectApp } from '@/redux/festures/appSlice'
import { useStoreSelector } from '@/redux'
import { AppRouteModule } from '@/routes/type'
import { isString } from 'lodash'
const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label}是必填字段'
}

const App: FC = () => {
  const appState = useStoreSelector(selectApp)

  const renderRoutes = (routes: AppRouteModule[]): ReactNode => {
    return routes.map((route) => {
      const { Component, children, redirect, path } = route
      if (redirect) {
        return (
          <Route
            path={path}
            key={path}
            element={isString(redirect) ? <Navigate replace to={redirect} /> : redirect}
          ></Route>
        )
      }
      if (Component) {
        return <Route element={<Component />} key={path} path={path}></Route>
      }
      return children ? renderRoutes(children) : null
    })
  }
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
          {(console.log(11111111, renderRoutes(routes)), Router)}
          {/* <Router /> */}
          <Routes>{renderRoutes(routes)}</Routes>
        </AuthRouter>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
