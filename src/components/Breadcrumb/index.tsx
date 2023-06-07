import { FC, ReactNode } from 'react'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import { routes } from '@/routes'
import { cloneDeep } from 'lodash'
import type { AppRouteModule } from '@/routes/type'

interface BreadcrumbItem {
  href?: string
  title: string & ReactNode
}

const CBreadcrumb: FC = () => {
  const tempRoutes = cloneDeep(routes)
  const { pathname } = useLocation()
  const generatorBreadcrumb = (pathname: string, routes: AppRouteModule[]) => {
    return routes
      .filter((route) => pathname.includes(route.path))
      .map((route) => ({
        key: route.path,
        // href: route.path,
        title: (
          <>
            {route.meta?.icon}
            <span>{route.meta?.title}</span>
          </>
        ),
        children: route?.children?.length && generatorBreadcrumb(pathname, route.children)
      }))
  }
  /**
   * 扁平化数组
   * @param items
   * @returns
   */
  const flattenRoutes = (items): BreadcrumbItem[] => {
    return items.reduce((acc, item) => {
      acc.push(item)
      if (Array.isArray(item.children) && item.children.length) {
        acc.push(...flattenRoutes(item.children))
      }
      return acc
    }, [])
  }
  return (
    <div>
      <Breadcrumb items={flattenRoutes(generatorBreadcrumb(pathname, tempRoutes))} />
    </div>
  )
}

export default CBreadcrumb
