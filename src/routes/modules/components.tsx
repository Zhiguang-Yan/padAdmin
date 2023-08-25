import { LayoutIndex } from '../constant'
import type { AppRouteModule } from '../type'
import { lazy } from 'react'
import LazyLoad from '../lazyLoad'
import { DashboardOutlined } from '@ant-design/icons'

const componentsRouter: AppRouteModule = {
  path: '/components',
  code: 'components',
  element: <LayoutIndex />,
  meta: {
    title: '组件',
    icon: <DashboardOutlined />
  },
  children: [
    {
      path: 'cropper',
      element: LazyLoad(lazy(() => import('@/page/components/Cropper'))),
      code: 'cropper',
      meta: {
        title: '图片裁剪组件'
      }
    },
    {
      path: 'wangEditor',
      element: LazyLoad(lazy(() => import('@/page/components/WangEditor'))),
      code: 'wangEditor',
      meta: {
        title: '富文本组件'
      }
    }
  ]
}

export default componentsRouter
