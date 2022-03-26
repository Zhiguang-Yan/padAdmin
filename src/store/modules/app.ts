import { defineStore } from 'pinia'
import { store } from '../index'
interface AppState {
  isCollapsed: boolean
  mode: string
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    isCollapsed: false,
    mode: 'vertical', // vertical左右基本布局    horizontal上下布局
  }),
  getters: {},
  actions: {
    toggle() {
      this.isCollapsed = !this.isCollapsed
    },
    toggleMode(mode: string) {
      this.mode = mode
    },
  },
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
