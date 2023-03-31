import { lazy } from 'react'
import LazyLoad from '../lazyLoad'
import type { AppRouteModule } from '../type'
const Error: AppRouteModule[] = [
  {
    path: '/404',
    element: LazyLoad(lazy(() => import('@/page/errorMessage/404'))),
    meta: {
      title: '404页面'
    }
  }
]

export default Error
