import { AppRouteModule } from '@/routes/type'

export interface AppStore {
  isCollapse: boolean
  language: string
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
