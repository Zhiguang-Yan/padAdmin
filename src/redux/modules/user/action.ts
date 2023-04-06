import * as types from '@/redux/mutation-types'

export const setRoles = (payload: string[]) => ({
  type: types.SET_ROLES,
  payload
})

export const setUserInfo = (payload: Record<string, any>) => ({
  type: types.SET_USERINFO,
  payload
})

export const setToken = (payload: string) => ({
  type: types.SET_TOKEN,
  payload
})
