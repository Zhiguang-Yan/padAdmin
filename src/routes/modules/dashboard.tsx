import { LayoutIndex } from '../constant'
import type { AppRouteModule } from '../type'
import Dashboard from '@/page/dashboard'

const homeRouter: AppRouteModule[] = [
  {
    path: '/',
    element: <LayoutIndex />,
    children: [
      {
        path: 'dashboard',
        code: 'dashboard',
        element: <Dashboard />
      }
    ]
  }
]

export default homeRouter
