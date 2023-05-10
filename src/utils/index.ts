import type { AppRouteModule } from '../routes/type'

/**
 * 生成route
 * @param routes 路由
 * @param basePath 根路径
 * @returns
 */
export const resolvePath = (routes: AppRouteModule[], basePath?: string): AppRouteModule[] => {
  const processRoute = (route: AppRouteModule, basePath?: string): AppRouteModule => {
    const pathPrefix = basePath && basePath !== '/' ? `${basePath}/` : basePath === '/' ? '/' : ''
    route.path = `${pathPrefix}${route.path}`
    if (route.children?.length) {
      route.children = route.children.map((child) => processRoute(child, route.path))
    }
    return route
  }
  return routes.map((route) => processRoute(route, basePath))
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (
  path: string,
  routes: AppRouteModule[] = []
): Partial<AppRouteModule> => {
  let result: Partial<AppRouteModule> = {}
  for (let item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}
