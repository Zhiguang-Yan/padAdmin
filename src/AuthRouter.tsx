import { useLocation, Navigate } from 'react-router-dom'
import { AxiosCanceler } from '@/utils/http/helper'
import { routes } from '@/routes/index'
import { store } from '@/redux'
import { searchRoute } from '@/utils'
import { HOME_URL } from '@/config/config'
import { message } from 'antd'

const axiosCanceler = new AxiosCanceler()

const whiteList = ['/login'] // no redirect whitelist

/**
 * 路由守卫组件
 * @returns
 */
const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation()

  const hasToken = store.getState().user.token
  // * 在跳转路由之前，清除所有的请求
  axiosCanceler.removeAllPending()
  // 是否有token
  if (hasToken) {
    if (pathname === '/login') {
      return <Navigate to={HOME_URL} />
    }
    // 是否有roles
    const hasRoles = store.getState().user.roles && store.getState().user.roles.length
    console.log(hasRoles)
    if (hasRoles) {
      return props.children
    } else {
      try {
        return props.children
      } catch (error) {
        message.error(error as string)
        // remove token and go to login page to re-login
        return <Navigate to={`/login?redirect=${pathname}`} replace />
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(pathname) !== -1) {
      // in the free login whitelist, go directly
      return props.children
    } else {
      return <Navigate to={`/login?redirect=${pathname}`} replace />
    }
  }
}

export default AuthRouter
