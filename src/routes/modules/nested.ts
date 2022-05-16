import Layout from '@/layout/index.vue'
import { AppRouteModule } from '../types'
export const nested: AppRouteModule = {
  path: '/nested',
  name: 'Nested',
  code: 'nested',
  meta: { title: 'nested', icon: 'dashboard' },
  component: Layout,
  children: [
    {
      path: 'menu1',
      name: 'Menu1',
      code: 'menu1',
      meta: { title: 'menu1' },
      component: () => import('@/views/nested/menu1/index.vue'),
      children: [
        {
          path: 'menu1-1',
          name: 'Menu1-1',
          code: 'menu1-1',
          meta: { title: 'menu1-1' },
          component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
        },
        {
          path: 'menu1-2',
          name: 'Menu1-2',
          code: 'menu1-2',
          meta: { title: 'menu1-2' },
          component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
          children: [
            {
              path: 'menu1-2-1',
              name: 'Menu1-2-1',
              code: 'menu1-2-1',
              meta: { title: 'menu1-2-1' },
              component: () =>
                import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
            },
            {
              path: 'menu1-2-2',
              name: 'Menu1-2-2',
              code: 'menu1-2-2',
              meta: { title: 'menu1-2-2' },
              component: () =>
                import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
            },
          ],
        },
        {
          path: 'menu1-3',
          name: 'Menu1-3',
          code: 'menu1-3',
          meta: { title: 'menu1-3' },
          component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2',
      code: 'menu2',
      meta: { title: 'menu2' },
      component: () => import('@/views/nested/menu2/index.vue'),
    },
  ],
}
