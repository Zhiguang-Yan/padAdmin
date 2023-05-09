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
 * 路由守卫组件
 * @returns
 */
const AuthRouter = (props) => {
  const { getInfo, children } = props
  const [renderChild, setRenderChild] = useState(children)
  const { pathname } = useLocation()
  /**
   * 扁平化权限数组
   * @param routes
   * @param roles
   * @returns
   */
  const flatPath = (routes: AppRouteModule[], roles: string[]): string[] => {
    return routes.reduce((acc: string[], route: AppRouteModule) => {
      if (route.code && roles.includes(route.code)) {
        acc.push(route.path)
        if (route.children?.length) {
          acc.push(...flatPath(route.children, roles))
        }
      }
      return acc
    }, [])
  }

  // * 在跳转路由之前，清除所有的请求
  async function mounted() {
    axiosCanceler.removeAllPending()
    if (!!store.getState().user.token) {
      // 如果是登录定向到HOME_URL
      if (pathname === '/login') return setRenderChild(<Navigate to={HOME_URL} />)
      // 没有权限路由
      if (!store.getState().user.roles.length) {
        try {
          await getInfo()
          const routerList = flatPath(routes, store.getState().user.roles).concat(WHITE_LIST)
          console.log('🌰------------------------------------路由表')
          console.table(routerList)
          console.log('🌰------------------------------------路由表')
          // 如果访问的地址没有在路由表中重定向到403页面
          if (routerList.indexOf(pathname) === -1) return setRenderChild(<Navigate to="/403" />)
        } catch (error) {
          message.error(error as string)
          return setRenderChild(<Navigate to={`/login?redirect=${pathname}`} replace />)
        }
      }
      return setRenderChild(children)
    }
    if (WHITE_LIST.indexOf(pathname) === -1) {
      setRenderChild(<Navigate to={`/login?redirect=${pathname}`} replace />)
    }
  }

  useEffect(() => {
    mounted()
  }, [pathname])

  return renderChild
}

const mapDispatchToProps = {
  getInfo
}

export default connect(null, mapDispatchToProps)(AuthRouter)
