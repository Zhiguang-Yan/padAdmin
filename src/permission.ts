import { router } from '@/routes'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useUserStoreWithOut } from './store/modules/user'
import { getToken } from './utils/auth'
import type { RouteRecordRaw } from 'vue-router'
import type { AppRouteModule } from '@/routes/types'
import { ElMessage } from 'element-plus'
const WHITE_NAME_LIST: string[] = []

const user = useUserStoreWithOut()
const permission = usePermissionStoreWithOut()
router.beforeEach(async (to, form, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = user.roles && user.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles }: any = await user.getInfo()
          const accessRoutes = (await permission.generateRoutes(
            roles
          )) as AppRouteModule[]
          accessRoutes.forEach((route: AppRouteModule) => {
            router.addRoute(route as unknown as RouteRecordRaw)
          })

          next({ ...to, replace: true })
        } catch (error) {
          user.resetToken()
          ElMessage.error(error as string)

          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (WHITE_NAME_LIST.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {})
