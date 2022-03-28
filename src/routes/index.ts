import { AppRouteModule } from './types'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import Layout from '@/layout/index.vue'
import { nested } from './modules/nested'
import { WHITE_NAME_LIST } from '@/utils/const'
export const constantRoutes: AppRouteModule[] = [
  {
    path: '/',
    component: Layout,
    name: 'admin',
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        code: 'dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'Eleme' },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('../views/login/index.vue'),
  },
]

export const asyncRoutes: AppRouteModule[] = [
  {
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
        component: () => import('../views/chooseIcon/index.vue'),
        meta: { title: '图标选择器', icon: 'Eleme' },
      },
      {
        path: 'chooseArea',
        name: 'ChooseArea',
        code: 'chooseArea',
        component: () => import('../views/chooseArea/index.vue'),
        meta: { title: '省市区选择器', icon: 'Eleme' },
      },
      {
        path: 'trend',
        name: 'Trend',
        code: 'trend',
        component: () => import('../views/trend/index.vue'),
        meta: { title: '趋势组件', icon: 'Eleme' },
      },
      {
        path: 'notificition',
        name: 'Notificition',
        code: 'notificition',
        component: () => import('../views/notificition/index.vue'),
        meta: { title: '提示组件', icon: 'Eleme' },
      },
      {
        path: 'menu',
        name: 'Menu',
        code: 'menu',
        component: () => import('../views/menu/index.vue'),
        meta: { title: '递归菜单', icon: 'Eleme' },
      },
    ],
  },
  nested,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    code: 'noFound',
    hidden: true,
    component: () => import('@/views/noFound/index.vue'),
  },
]

const router = createRouter({
  routes: constantRoutes as unknown as RouteRecordRaw[],
  history: createWebHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 重置路由
export const resetRouter = () => {
  asyncRoutes.forEach((route) => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export { router }
