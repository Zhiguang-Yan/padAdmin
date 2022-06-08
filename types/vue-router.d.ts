export {}
declare module 'vue-router' {
  export interface RouteMeta extends Record<string | number | symbol, unknown> {
    title?: string
    icon?: string
    breadcrumb?: boolean
    activeMenu?: string
  }
}
