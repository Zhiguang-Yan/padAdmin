import type { AppRouteModule } from './type'
import type { RouteObject } from 'react-router-dom'
import { useRoutes, Navigate } from 'react-router-dom'
import Login from '@/page/login/index'
import { resolvePath } from '../utils/index'
import { cloneDeep } from 'lodash'

// @ts-ignore
const metaRouters = require.context('./modules/', true, /\.tsx$/)

export const routerArray: AppRouteModule[] = metaRouters
  .keys()
  .reduce(
    (modules: AppRouteModule[], modulePath) => modules.concat(metaRouters(modulePath).default),
    []
  )

export const routes: AppRouteModule[] = resolvePath(
  cloneDeep([
    {
      path: '/login',
      code: 'login',
      hidden: true,
      element: <Login />,
      meta: {
        title: '登录页'
      }
    },
    ...routerArray,
    {
      path: '*',
      element: <Navigate to="/404" />
    }
  ])
)

const Router = () => useRoutes(routes as RouteObject[])

export default Router
