import { LayoutIndex } from '../constant'
import type { AppRouteModule } from '../type'
import Dashboard from '@/page/dashboard'

const homeRouter: AppRouteModule[] = [
  {
    path: '/',
    code: 'layout',
    element: <LayoutIndex />,
    children: [
      {
        path: 'dashboard',
        code: 'dashboard',
        element: <Dashboard />,
        meta: {
          title: '首页'
        }
      }
    ]
  }
]

export default homeRouter
