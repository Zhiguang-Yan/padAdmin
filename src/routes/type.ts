import type { RouteObject } from 'react-router-dom'

export interface RouteMeta {
  title?: string
  icon?: string
  breadcrumb?: boolean
  activeMenu?: string
  requiresAuth?: boolean
}

export interface AppRouteRecordRaw extends Omit<RouteObject, 'children'> {
  path?: string
  component?: string | React.ReactNode
  name?: string
  code?: string
  hidden?: boolean
  meta?: RouteMeta
  alwaysShow?: boolean
  children?: AppRouteRecordRaw[]
}

export type AppRouteModule = AppRouteRecordRaw
