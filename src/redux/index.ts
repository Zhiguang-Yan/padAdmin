import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'

import app from './festures/appSlice'
import user from './festures/userSlice'

const reducer = combineReducers({
  app,
  user
})

export const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store.getState>

export type StoreDispatch = typeof store.dispatch

export const useStoreDispatch = () => useDispatch<StoreDispatch>()

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
