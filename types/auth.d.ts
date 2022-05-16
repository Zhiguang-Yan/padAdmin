import type { IAuth } from '@/utils/permission'

export {}
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $auth: IAuth
  }
}
