import { LayoutIndex } from '../constant'
import type { AppRouteModule } from '../type'
import Dashboard from '@/page/dashboard'
import { ReactComponent as Qq } from '@/icons/svg/qq.svg'

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
          title: '首页',
          icon: <Qq className="menu_icon" />
        }
      }
    ]
  }
]

export default homeRouter
