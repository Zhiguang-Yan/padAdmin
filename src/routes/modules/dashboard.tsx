import { LayoutIndex } from '../constant'
import type { AppRouteModule } from '../type'
import { lazy } from 'react'
import LazyLoad from '../lazyLoad'
import { DashboardOutlined, BankOutlined } from '@ant-design/icons'

const homeRouter: AppRouteModule[] = [
  {
    path: '/layout',
    code: 'layout',
    element: <LayoutIndex />,
    meta: {
      title: '首页',
      icon: <BankOutlined />
    },
    children: [
      {
        path: 'dashboard',
        code: 'dashboard',
        element: LazyLoad(lazy(() => import('@/page/dashboard'))),
        meta: {
          title: '看板',
          icon: <DashboardOutlined />
        }
      },
      {
        path: 'workbench',
        code: 'workbench',
        element: LazyLoad(lazy(() => import('@/page/workbench'))),
        meta: {
          title: '工作台',
          icon: <BankOutlined />
        }
      }
    ]
  }
]

export default homeRouter
