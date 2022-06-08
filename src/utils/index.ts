import { AppRouteModule } from '@/routes/types'
import type { MenuItem } from '@/components/Menu/src/type'

export function toLine(value: string) {
  return value.replace(/[A-Z]g/, '$1').toLocaleLowerCase()
}
/**
 * 递归生成访问路径 并动态重定向
 * @param menuList
 * @param basePath
 * @returns
 */
export function resolvePath(
  menuList: AppRouteModule[],
  basePath: string = ''
): AppRouteModule[] {
  return menuList.map((list) => {
    const curPath =
      basePath && basePath !== '/'
        ? `${basePath}/${list.path}`
        : basePath === '/'
        ? `${basePath}${list.path}`
        : list.path
    if (list.children && list.children.length) {
      resolvePath(list.children, curPath)
    }
    list.path = curPath
    return list
  })
}

/**
 * 生成递归菜单
 * @param menuList
 * @returns
 */
export function generateMenuList(menuList: AppRouteModule[]): MenuItem[] {
  return menuList
    .filter((v) => !v.hidden)
    .map((list) => {
      const item: MenuItem = {
        i: '',
        name: list.name,
        icon: (list.meta?.icon as string) || '',
        title: (list.meta?.title as string) || '',
        path: list.path,
      }
      if (list!.children?.length) {
        if (list.children!.length > 1 || list.alwaysShow) {
          item.children = generateMenuList(list.children)
        } else {
          const onlyChild = list.children[0]
          item.icon = (onlyChild.meta?.icon as string) || ''
          item.title = (onlyChild.meta?.title as string) || ''
          item.path = onlyChild.path
          if (onlyChild.children?.length) {
            item.children = generateMenuList(onlyChild.children)
          }
        }
      }
      return item
    })
}

interface Isource {
  [key: string]: any
}
/**
 * 深拷贝
 * @param source
 * @returns
 */
export function cloneDeep(source: Isource) {
  if (!source && typeof source !== 'object') {
    return source
  }
  const targetObj: Isource = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((key) => {
    if (source[key] && typeof source[key] !== 'object') {
      targetObj[key] = cloneDeep(source[key])
    } else {
      targetObj[key] = source[key]
    }
  })

  return targetObj
}

/**
 * 给路由加上重定向为第一个路由
 * @param routes
 * @returns
 */
export function redirectRoutes(routes: AppRouteModule[]): AppRouteModule[] {
  return routes.map((route) => {
    if (route.children && route.children.length) {
      const { name } = route.children[0]
      route.redirect = { name }
      redirectRoutes(route.children)
    }
    return route
  })
}
