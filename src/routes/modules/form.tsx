import { lazy } from 'react'
import { LayoutIndex } from '../constant'
import type { AppRouteModule } from '../type'
import LazyLoad from '../lazyLoad'

// 表单 Form 模块
const formRouter: AppRouteModule[] = [
  {
    element: <LayoutIndex />,
    meta: {
      title: '表单'
    },
    path: '/form',
    children: [
      {
        path: 'basicForm',
        element: LazyLoad(lazy(() => import('@/page/form/basicForm/index'))),
        meta: {
          title: '基础表单'
        }
      },
      {
        path: 'dynamicForm',
        element: LazyLoad(lazy(() => import('@/page/form/dynamicForm/index'))),
        meta: {
          title: '动态表单'
        }
      }
    ]
  }
]

export default formRouter
