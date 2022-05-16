import { AppRouteModule } from '@/routes/types'
import type { MenuItem } from '@/components/Menu/src/type'
export function toLine(value: string) {
  return value.replace(/[A-Z]g/, '$1').toLocaleLowerCase()
}
/**
 * 递归生成访问路径
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
  return menuList.map((list) => {
    const item: MenuItem = {
      i: '',
      icon: (list.meta?.icon as string) || '',
      title: (list.meta?.title as string) || '',
      path: list.path,
      name: list.name,
    }
    if (list!.children?.length) {
      if (list.children!.length > 1) {
        item.children = generateMenuList(list.children)
      } else {
        const onlyChild = list.children[0]
        item.icon = (onlyChild.meta?.icon as string) || ''
        item.title = (onlyChild.meta?.title as string) || ''
        item.path = onlyChild.path
      }
    }
    return item
  })
}

interface Isource {
  [key: string]: any
}
/**
 *
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
