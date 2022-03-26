import { defineStore } from 'pinia'
import { store } from '../index'
import { resetRouter } from '@/routes'
import { removeToken, setToken, getToken } from '@/utils/auth'
interface UserState {
  roles: string[]
  token: string
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      roles: [],
      token: getToken(),
    }
  },
  getters: {
    // roles(state) {
    //   return state.roles
    // },
  },
  actions: {
    login() {},
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
    resetToken() {
      return new Promise((resolve) => {
        this.token = ''
        this.roles = []
        removeToken()
        resolve(true)
      })
    },
    logout() {
      return new Promise((resolve) => {
        this.token = ''
        this.roles = []
        removeToken()
        resetRouter()
        console.log('sasa')

        resolve(true)
      })
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
