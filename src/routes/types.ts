import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'
export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name?: string
  code?: string
  hidden?: boolean
  component: Component | string
  children?: AppRouteRecordRaw[]
  meta?: RouteMeta
}
export type AppRouteModule = AppRouteRecordRaw
