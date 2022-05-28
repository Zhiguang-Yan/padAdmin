import { defineStore } from 'pinia'
import { store } from '../index'
import { AppRouteModule } from '@/routes/types'
import { constantRoutes, asyncRoutes } from '@/routes/index'
import { resolvePath, generateMenuList, redirectRoutes } from '@/utils'
import { cloneDeep } from 'lodash'
interface PermissionState {
  routes: AppRouteModule[]
  addRoutes: AppRouteModule[]
}

const dev = true
/**
 * 过滤动态路由
 * @param routes
 * @param roles
 * @returns
 */
const filterAsyncRoutes = (
  routes: AppRouteModule[],
  roles: string[]
): AppRouteModule[] => {
  if (!dev) {
    return routes.reduce((pre: AppRouteModule[], cur) => {
      if (roles.includes(cur.code!)) {
        cur.children?.length &&
          (cur.children = filterAsyncRoutes(cur.children, roles))
        return [...pre, cur]
      }
      return [...pre]
    }, [])
  }
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
      // 递归生成路径  使用深度拷贝避免影响到原来的路由
      return generateMenuList(
        resolvePath(cloneDeep(state.routes)).filter((v) => !v.hidden)
      )
    },
  },
  actions: {
    generateRoutes(roles: string[]) {
      return new Promise((resolve) => {
        const accessedRoutes = redirectRoutes(
          filterAsyncRoutes(asyncRoutes, roles)
        )
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
