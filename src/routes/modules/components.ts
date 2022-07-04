import Layout from '@/layout/index.vue'
import { AppRouteModule } from '../types'
export const components: AppRouteModule = {
  path: '/components',
  name: 'components',
  code: 'components',
  component: Layout,
  meta: { title: '组件' },
  children: [
    {
      path: 'chooseIcon',
      name: 'ChooseIcon',
      code: 'chooseIcon',
      component: () => import('@/views/components/choose-icon.vue'),
      meta: { title: '图标选择器' },
    },
    {
      path: 'chooseArea',
      name: 'ChooseArea',
      code: 'chooseArea',
      component: () => import('@/views/components/choose-area.vue'),
      meta: { title: '省市区选择器' },
    },
    {
      path: 'trend',
      name: 'Trend',
      code: 'trend',
      component: () => import('@/views/components/trend.vue'),
      meta: { title: '趋势组件' },
    },
    {
      path: 'notificition',
      name: 'Notificition',
      code: 'notificition',
      component: () => import('@/views/components/notificition.vue'),
      meta: { title: '提示组件' },
    },
    {
      path: 'menu',
      name: 'Menu',
      code: 'menu',
      component: () => import('@/views/components/menu.vue'),
      meta: { title: '递归菜单' },
    },
    {
      path: 'chooseTime',
      name: 'ChooseTime',
      code: 'chooseTime',
      component: () => import('@/views/components/choose-time.vue'),
      meta: { title: '时间联动选择器' },
    },
    {
      path: 'progress',
      name: 'Progress',
      code: 'progress',
      component: () => import('@/views/components/progress.vue'),
      meta: { title: '进度条' },
    },
    {
      path: 'table',
      name: 'Table',
      code: 'table',
      component: () => import('@/views/components/table.vue'),
      meta: { title: '表格组件' },
    },
    {
      path: 'form',
      name: 'Form',
      code: 'form',
      component: () => import('@/views/components/form.vue'),
      meta: { title: '表单组件' },
    },
    {
      path: 'message',
      name: 'Message',
      code: 'message',
      component: () => import('@/views/components/message.vue'),
      meta: { title: 'message组件' },
    },
    {
      path: 'cropper',
      name: 'Cropper',
      code: 'cropper',
      component: () => import('@/views/components/cropper.vue'),
      meta: { title: '图片裁剪组件' },
    },
    {
      path: 'rich',
      name: 'Rich',
      code: 'rich',
      component: () => import('@/views/components/rich-text.vue'),
      meta: { title: '富文本组件' },
    },
    {
      path: 'print',
      name: 'Print',
      code: 'print',
      component: () => import('@/views/components/print.vue'),
      meta: { title: '打印组件' },
    },
  ],
}
