import Layout from '@/layout/index.vue'
import { AppRouteModule } from '../types'
export const components: AppRouteModule = {
  path: '/components',
  name: 'components',
  code: 'components',
  component: Layout,
  meta: { title: '组件', icon: 'Eleme' },
  redirect: { name: 'ChooseIcon' },
  children: [
    {
      path: 'chooseIcon',
      name: 'ChooseIcon',
      code: 'chooseIcon',
      component: () => import('@/views/chooseIcon/index.vue'),
      meta: { title: '图标选择器', icon: 'Eleme' },
    },
    {
      path: 'chooseArea',
      name: 'ChooseArea',
      code: 'chooseArea',
      component: () => import('@/views/chooseArea/index.vue'),
      meta: { title: '省市区选择器', icon: 'Eleme' },
    },
    {
      path: 'trend',
      name: 'Trend',
      code: 'trend',
      component: () => import('@/views/trend/index.vue'),
      meta: { title: '趋势组件', icon: 'Eleme' },
    },
    {
      path: 'notificition',
      name: 'Notificition',
      code: 'notificition',
      component: () => import('@/views/notificition/index.vue'),
      meta: { title: '提示组件', icon: 'Eleme' },
    },
    {
      path: 'menu',
      name: 'Menu',
      code: 'menu',
      component: () => import('@/views/menu/index.vue'),
      meta: { title: '递归菜单', icon: 'Eleme' },
    },
    {
      path: 'chooseTime',
      name: 'ChooseTime',
      code: 'chooseTime',
      component: () => import('@/views/chooseTime/index.vue'),
      meta: { title: '时间联动选择器', icon: 'Eleme' },
    },
    {
      path: 'progress',
      name: 'Progress',
      code: 'progress',
      component: () => import('@/views/progress/index.vue'),
      meta: { title: '进度条', icon: 'Eleme' },
    },
  ],
}
