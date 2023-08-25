import type { RouteObject } from 'react-router-dom'
import { ReactNode } from 'react'
export interface RouteMeta {
  title?: string
  icon?: ReactNode | string
  breadcrumb?: boolean
  activeMenu?: string
  requiresAuth?: boolean
}

export interface AppRouteRecordRaw extends Omit<RouteObject, 'children'> {
  path: string
  name?: string
  code?: string
  hidden?: boolean
  meta?: RouteMeta
  alwaysShow?: boolean
  children?: AppRouteRecordRaw[]
}

export type AppRouteModule = AppRouteRecordRaw
