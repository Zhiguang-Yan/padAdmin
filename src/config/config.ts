// * Tabs（黑名单地址，不需要添加到 tabs 的路由地址，暂时没用）
export const TABS_BLACK_LIST: string[] = [
  '/403',
  '/404',
  '/500',
  '/layout',
  '/login',
  '/dataScreen'
]

// * 首页地址（默认）
export const HOME_URL: string = '/dashboard'
export const WHITE_LIST: string[] = ['/login', '/404', '/403', '/500', '/dashboard']

export const WHITE_CODE: string[] = ['login', '404', '403', '500', 'dashboard', 'layout']

// * 高德地图key
export const MAP_KEY: string = ''

export const MAP_ROLE = {
  ADMIN: []
}
