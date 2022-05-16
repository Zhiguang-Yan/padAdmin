import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { computed } from 'vue'
export const useMenu = () => {
  const permission = usePermissionStoreWithOut()
  return computed(() => permission.menu_list)
}
