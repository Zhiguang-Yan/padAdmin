import { AppRouteModule } from '@/routes/type'

export interface AppStore {
  isCollapse: boolean
  language: string
  themeConfig: {
    primary: string
    theme: 'dark' | 'light'
    weakOrGray: 'weak' | 'gray' | 'normal'
    breadcrumb: boolean
    tabs: boolean
    footer: boolean
  }
}

export interface PermissionStore {
  routes: AppRouteModule[]
  addRoutes: AppRouteModule[]
}

export interface UserStore {
  roles: string[]
  token: string | null
  userInfo: Record<string, any> | null
}

export interface Store {
  app: AppStore
  user: UserStore
  permission: PermissionStore
}
