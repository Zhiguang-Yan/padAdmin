import { defineStore } from 'pinia'
import { store } from '../index'
interface UserState {
  roles: string[]
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      roles: [],
    }
  },
  getters: {
    // roles(state) {
    //   return state.roles
    // },
  },
  actions: {
    getInfo() {
      return new Promise((resolve) => {
        const roles = [
          'components',
          'chooseIcon',
          'chooseArea',
          'trend',
          'notificition',
          'menu',
        ]
        this.roles = roles
        resolve({ roles })
      })
    },
    resetToken() {},
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
