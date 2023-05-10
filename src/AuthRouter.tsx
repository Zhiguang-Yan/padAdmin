import { useLocation, Navigate } from 'react-router-dom'
import { AxiosCanceler } from '@/utils/http/helper'
import { HOME_URL, WHITE_LIST } from '@/config/config'
import { message } from 'antd'
import { connect } from 'react-redux'
import { getInfo } from '@/redux/modules/user/action'
import { useEffect, useState } from 'react'
import { routes } from '@/routes/index'
import { store } from '@/redux'
import type { AppRouteModule } from '@/routes/type'

const axiosCanceler = new AxiosCanceler()

/**
 * 路由守卫组件。组件内部会调用各种子函数进行身份验证和授权检查。
 * @returns 组件本身渲染的内容。
 */
const AuthRouter = (props) => {
  const { getInfo, children } = props
  const [renderChild, setRenderChild] = useState(children)
  const { pathname } = useLocation()

  /**
   * 将路由数组扁平化为权限数组。
   * @param routes - 路由对象数组。
   * @param roles - 用户角色数组。
   * @returns 返回扁平化后的权限数组。
   */
  const flattenRoutes = (routes: AppRouteModule[], roles: string[]): string[] => {
    return routes.reduce((acc: string[], route: AppRouteModule) => {
      if (route.code && roles.includes(route.code)) {
        acc.push(route.path)
        if (route.children?.length) {
          acc.push(...flattenRoutes(route.children, roles))
        }
      }
      return acc
    }, [])
  }

  /**
   * 检查是否已经登录。如果未登录，则需要先将用户重定向到登录页面以进行身份验证。
   * @returns 如果已登录，则返回 true；否则返回 false。
   */
  const checkIsLoggedIn = (): boolean => {
    if (!!store.getState().user.token) {
      return true
    } else {
      return false
    }
  }

  /**
   * 处理路由跳转事件。
   * 如果用户已经登录，则根据路由表跳转到相应的页面；
   * 如果用户未登录，则将用户重定向到登录页面以进行身份验证。
   */
  const handleRouteChange = () => {
    axiosCanceler.removeAllPending()
    if (!checkIsLoggedIn()) {
      if (WHITE_LIST.indexOf(pathname) === -1) {
        setRenderChild(<Navigate to={`/login?redirect=${pathname}`} replace />)
      }
      return
    }
    if (pathname === '/login') {
      setRenderChild(<Navigate to={HOME_URL} />)
      return
    }
    if (!store.getState().user.roles.length) {
      getInfo()
        .then(() => {
          const routerList = flattenRoutes(routes, store.getState().user.roles).concat(WHITE_LIST)
          console.log('🌰------------------------------------路由表')
          console.table(routerList)
          console.log('🌰------------------------------------路由表')
          if (routerList.indexOf(pathname) === -1) {
            setRenderChild(<Navigate to="/403" />)
            return
          }
          setRenderChild(children)
        })
        .catch((e) => {
          message.error(e as string)
          setRenderChild(<Navigate to={`/login?redirect=${pathname}`} replace />)
        })
      return
    }
    setRenderChild(children)
  }

  useEffect(() => {
    handleRouteChange()
  }, [pathname])

  return renderChild
}

const mapDispatchToProps = {
  getInfo
}

export default connect(null, mapDispatchToProps)(AuthRouter)
