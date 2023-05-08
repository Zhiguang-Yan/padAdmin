import { useLocation, Navigate } from 'react-router-dom'
import { AxiosCanceler } from '@/utils/http/helper'
import { HOME_URL, WHITE_LIST } from '@/config/config'
import { message } from 'antd'
import { connect } from 'react-redux'
import { getInfo } from '@/redux/modules/user/action'
import { useEffect, useState } from 'react'

const axiosCanceler = new AxiosCanceler()

/**
 * 路由守卫组件
 * @returns
 */
const AuthRouter = (props) => {
  const { getInfo, children, token, roles } = props
  const [renderChild, setRenderChild] = useState(children)

  const { pathname } = useLocation()
  // * 在跳转路由之前，清除所有的请求
  async function mounted() {
    axiosCanceler.removeAllPending()
    // 是否有token
    if (!!token) {
      if (pathname === '/login') {
        return setRenderChild(<Navigate to={HOME_URL} />)
      }
      // 是否有roles
      if (!!roles.length) {
        return setRenderChild(children)
      } else {
        try {
          await getInfo()
          const dynamicRouter = roles
          const routerList = dynamicRouter.concat(WHITE_LIST)
          // 如果访问的地址没有在路由表中重定向到403页面
          if (routerList.indexOf(pathname) === -1) return setRenderChild(<Navigate to="/403" />)
          return setRenderChild(children)
        } catch (error) {
          message.error(error as string)
          // remove token and go to login page to re-login
          return setRenderChild(<Navigate to={`/login?redirect=${pathname}`} replace />)
        }
      }
    } else {
      // 没有token
      if (WHITE_LIST.indexOf(pathname) !== -1) {
        return setRenderChild(children)
      } else {
        return setRenderChild(<Navigate to={`/login?redirect=${pathname}`} replace />)
      }
    }
  }

  useEffect(() => {
    mounted()
  }, [pathname])

  return renderChild
}

const mapStateToProps = (state: Store) => ({
  token: state.user.token,
  roles: state.user.roles
})
const mapDispatchToProps = {
  getInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRouter)
