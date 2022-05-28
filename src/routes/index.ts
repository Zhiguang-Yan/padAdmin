import { AppRouteModule } from './types'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import Layout from '@/layout/index.vue'
import { nested } from './modules/nested'
import { components } from './modules/components'
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
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index.vue'),
  },
]

export const asyncRoutes: AppRouteModule[] = [
  nested,
  components,
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
