import type { App } from 'vue'
import { useUserStoreWithOut } from '@/store/modules/user'

export function checkPermission(value: (string | number)[]): boolean {
  const { roles } = useUserStoreWithOut()
  if (value && Array.isArray(value) && value.length) {
    const hasPermission = roles.some((role) => value.includes(role))
    return hasPermission
  }
  console.error(`need roles! Like v-auth="[]"`)
  return false
}

export function setAuth(app: App<Element>) {
  app.config.globalProperties.$auth = checkPermission
}

// eslint-disable-next-line no-unused-vars
export type IAuth = (value: (string | number)[]) => boolean
