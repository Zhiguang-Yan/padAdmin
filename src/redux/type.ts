import { AppRouteModule } from '@/routes/type'

export interface AppStore {
  isCollapse: boolean
  language: string
  themeConfig: {
    primary: string
    theme: 'dark' | 'lightMenu' | 'darkMenu'
    weakOrGray: 'weak' | 'gray' | 'normal'
    layout: 'siderLayout' | 'headerLayout' | 'mixLayout'
    breadcrumb: boolean
    tabs: boolean
    footer: boolean
    borderRadius: number
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
