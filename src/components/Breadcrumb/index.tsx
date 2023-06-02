import { FC, ReactNode } from 'react'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import { routes } from '@/routes'
import { cloneDeep } from 'lodash'
import type { AppRouteModule } from '@/routes/type'

interface ItemType {
  href?: string
  title: string & ReactNode
}

const CBreadcrumb: FC = () => {
  const tempRoutes = cloneDeep(routes)
  const { pathname } = useLocation()

  const generatorBreadcrumb = (pathname: string, routes: AppRouteModule[]) => {
    return routes
      .filter((route) => pathname.includes(route.path))
      .map((route) => {
        return {
          // href: route.path,
          title: (
            <>
              {route.meta?.icon}
              <span>{route.meta?.title}</span>
            </>
          ),
          children:
            route && route.children?.length
              ? generatorBreadcrumb(pathname, route.children)
              : undefined
        }
      })
  }
  /**
   * 扁平化数组
   * @param items
   * @returns
   */
  const flattenRoutes = (items): ItemType[] => {
    return items.reduce((acc, item) => {
      acc.push(item)
      if (Array.isArray(item.children) && item.children.length) {
        acc.push(...flattenRoutes(item.children))
      }
      return acc
    }, [])
  }
  //
  const items = flattenRoutes(generatorBreadcrumb(pathname, tempRoutes))

  // console.log(items)

  return (
    <div>
      <Breadcrumb items={items} />
    </div>
  )
}

export default CBreadcrumb
