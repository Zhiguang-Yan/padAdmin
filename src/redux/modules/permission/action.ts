import * as types from '@/redux/mutation-types'
import { AppRouteModule } from '@/routes/type'

export const setRoutes = (payload: AppRouteModule) => ({
  type: types.SET_ROUTES,
  payload
})

export const setAddRoutes = (payload: AppRouteModule) => ({
  type: types.SET_ADD_ROUTES,
  payload
})
