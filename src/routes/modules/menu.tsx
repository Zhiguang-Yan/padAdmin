import { lazy } from 'react'
import LazyLoad from '../lazyLoad'
import { LayoutIndex } from '../constant'
import type { AppRouteModule } from '../type'

const menuRouter: AppRouteModule[] = [
  {
    path: '/menu',
    code: 'menu',
    element: <LayoutIndex />,
    meta: {
      title: '嵌套菜单'
    },
    children: [
      {
        path: 'menu1',
        code: 'menu1',
        element: LazyLoad(lazy(() => import('@/page/menu/menu1'))),
        meta: {
          title: '菜单1'
        }
      },
      {
        path: 'menu2',
        code: 'menu2',
        element: LazyLoad(lazy(() => import('@/page/menu/menu2'))),
        meta: {
          title: '菜单2'
        },
        children: [
          {
            path: 'menu21',
            code: 'menu21',
            element: LazyLoad(lazy(() => import('@/page/menu/menu2/menu21'))),
            meta: {
              title: '菜单21'
            }
          },
          {
            path: 'menu22',
            code: 'menu22',
            element: LazyLoad(lazy(() => import('@/page/menu/menu2/menu22'))),
            meta: {
              title: '菜单22'
            },
            children: [
              {
                path: 'menu221',
                code: 'menu221',
                element: LazyLoad(lazy(() => import('@/page/menu/menu2/menu22/menu221'))),
                meta: {
                  title: '菜单221'
                }
              },
              {
                path: 'menu222',
                code: 'menu222',
                element: LazyLoad(lazy(() => import('@/page/menu/menu2/menu22/menu222'))),
                meta: {
                  title: '菜单222'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'menu3',
        code: 'menu3',
        element: LazyLoad(lazy(() => import('@/page/menu/menu3'))),
        meta: {
          title: '菜单3'
        },
        children: [
          {
            path: 'menu31',
            code: 'menu31',
            element: LazyLoad(lazy(() => import('@/page/menu/menu3/menu31'))),
            meta: {
              title: '菜单31'
            }
          },
          {
            path: 'menu32',
            code: 'menu32',
            element: LazyLoad(lazy(() => import('@/page/menu/menu3/menu32'))),
            meta: {
              title: '菜单32'
            }
          }
        ]
      }
    ]
  }
]
export default menuRouter
