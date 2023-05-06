import * as types from '@/redux/mutation-types'
import { Dispatch } from 'react'
import { loginApi, getUserInfoApi, logoutApi } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'

export const login = () => {
  return async (dispatch: Dispatch<DispatchProps>) => {
    const { data } = await loginApi()
    dispatch({
      type: types.SET_TOKEN,
      payload: data.token
    })
    setToken(data.token)
  }
}

export const getInfo = () => {
  return async (dispatch: Dispatch<DispatchProps>) => {
    const { data } = await getUserInfoApi()
    dispatch({
      type: types.SET_USERINFO,
      payload: data.username
    })
    dispatch({
      type: types.SET_ROLES,
      payload: data.roles
    })
  }
}

export const logout = () => {
  return async (dispatch: Dispatch<DispatchProps>) => {
    await logoutApi()
    dispatch({
      type: types.SET_USERINFO,
      payload: null
    })
    dispatch({
      type: types.SET_ROLES,
      payload: []
    })
    removeToken()
  }
}

export const resetToken = () => {
  return (dispatch: Dispatch<DispatchProps>) => {
    dispatch({
      type: types.SET_USERINFO,
      payload: null
    })
    dispatch({
      type: types.SET_ROLES,
      payload: []
    })
    removeToken()
  }
}
