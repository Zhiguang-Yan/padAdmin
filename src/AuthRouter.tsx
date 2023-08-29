/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, Navigate } from 'react-router-dom'
import { AxiosCanceler } from '@/utils/http/helper'
import { HOME_URL, WHITE_LIST, ASSETS_URL } from '@/config'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { routes } from '@/routes/index'
import { store, useStoreDispatch } from './store'
import { getUserInfo } from '@/store/festures/userSlice'
import type { AppRouteModule } from '@/routes/type'

const axiosCanceler = new AxiosCanceler()
console.log(ASSETS_URL)

/**
 * 路由守卫组件。组件内部会调用各种子函数进行身份验证和授权检查。
 * @returns 组件本身渲染的内容。
 */
const AuthRouter = (props) => {
  const { children } = props
  const [renderChild, setRenderChild] = useState<any>()
  const dispatch = useStoreDispatch()
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
  const checkIsLoggedIn = (): boolean => !!store.getState().user.token

  /**
   * 处理路由跳转事件。
   * 如果用户已经登录，则根据路由表跳转到相应的页面；
   * 如果用户未登录，则将用户重定向到登录页面以进行身份验证。
   */
  const handleRouteChange = async () => {
    axiosCanceler.removeAllPending()
    setRenderChild(children)
    if (!checkIsLoggedIn()) {
      if (WHITE_LIST.indexOf(pathname) === -1) {
        if (pathname !== '/') {
          return setRenderChild(<Navigate to={`/login?redirect=${pathname}`} replace />)
        }
        setRenderChild(<Navigate to={`/login`} />)
      }
      return
    }
    if (pathname === '/login') {
      setRenderChild(<Navigate to={HOME_URL} />)
      return
    }

    if (!store.getState().user.roles.length) {
      try {
        await dispatch(getUserInfo())
        const routerList = flattenRoutes(routes, store.getState().user.roles).concat(WHITE_LIST)
        console.log('🌰------------------------------------路由表')
        console.table(routerList)
        console.log('🌰------------------------------------路由表')
        if (routerList.indexOf(pathname) === -1) {
          setRenderChild(<Navigate to="/403" />)
          return
        }
      } catch (error) {
        message.error(error as string)
        setRenderChild(<Navigate to={`/login?redirect=${pathname}`} replace />)
      }
    }
  }

  useEffect(() => {
    pathname && handleRouteChange()
  }, [pathname])

  return renderChild
}

export default AuthRouter
