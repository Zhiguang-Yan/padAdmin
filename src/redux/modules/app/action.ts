import * as types from '@/redux/mutation-types'

export const updateCollapse = (payload: boolean) => ({
  type: types.UPDATE_COLLAPSE,
  payload
})

export const setLanguage = (payload: string) => ({
  type: types.SET_LANGUAGE,
  payload
})

export const setTheme = (payload: 'dark' | 'light') => ({
  type: types.SET_THEME,
  payload
})
