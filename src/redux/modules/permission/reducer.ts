import * as types from '@/redux/mutation-types'
import { PermissionStore } from '@/redux/type'
import produce from 'immer'

const initialState: PermissionStore = {
  routes: [],
  addRoutes: []
}

const permission = (state: PermissionStore = initialState, { type, payload }) => {
  produce(state, (draftState) => {
    switch (type) {
      case types.SET_ROUTES:
        return (draftState.routes = payload)
      case types.SET_ADD_ROUTES:
        return (draftState.addRoutes = payload)
      default:
        return draftState
    }
  })
}

export default permission
