import type { AppRouteModule } from '../routes/type'

/**
 * 生成route
 * @param routes 路由
 * @param basePath 根路径
 * @returns
 */
export const resolvePath = (routes: AppRouteModule[], basePath?: string): AppRouteModule[] => {
  const processRoute = (route: AppRouteModule, basePath?: string): AppRouteModule => {
    route.path = basePath ? `${basePath}/${route.path}` : route.path
    if (route.children?.length) {
      route.children = route.children.map((child) => processRoute(child, route.path))
    }
    return route
  }
  return routes.map((route) => processRoute(route, basePath))
}
