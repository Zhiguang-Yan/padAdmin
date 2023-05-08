import { lazy } from 'react'
import LazyLoad from '../lazyLoad'
import type { AppRouteModule } from '../type'
const errorRouter: AppRouteModule[] = [
  {
    path: '/404',
    code: '404',
    element: LazyLoad(lazy(() => import('@/page/errorMessage/404'))),
    meta: {
      title: '404页面'
    }
  },
  {
    path: '/403',
    code: '403',
    element: LazyLoad(lazy(() => import('@/page/errorMessage/403'))),
    meta: {
      title: '403页面'
    }
  },
  {
    path: '/500',
    code: '500',
    element: LazyLoad(lazy(() => import('@/page/errorMessage/500'))),
    meta: {
      title: '500页面'
    }
  }
]

export default errorRouter
