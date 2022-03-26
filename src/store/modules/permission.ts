import { defineStore } from 'pinia'
import { store } from '../index'
import { AppRouteModule } from '@/routes/types'
import { constantRoutes, asyncRoutes } from '@/routes/index'
import { resolvePath, generateMenuList } from '@/utils'
interface PermissionState {
  routes: AppRouteModule[]
  addRoutes: AppRouteModule[]
}

export const filterAsyncRoutes = (
  routes: AppRouteModule[],
  roles: string[]
) => {
  return routes
}
export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => {
    return {
      routes: [],
      addRoutes: [],
    }
  },
  getters: {
    permission_routes(state) {
      return state.routes
    },
    menu_list(state) {
      // 递归生成路径
      return generateMenuList(
        resolvePath(state.routes).filter((v) => !v.hidden)
      )
    },
  },
  actions: {
    generateRoutes(roles: string[]) {
      return new Promise((resolve) => {
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        this.routes = constantRoutes.concat(accessedRoutes)
        this.addRoutes = accessedRoutes
        resolve(accessedRoutes)
      })
    },
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
