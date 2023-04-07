import * as types from '@/redux/mutation-types'
import { PermissionStore } from '@/redux/type'
import produce from 'immer'

const initialState: PermissionStore = {
  routes: [],
  addRoutes: []
}

const permission = (state: PermissionStore = initialState, { type, payload }) =>
  produce(state, (draftState) => {
    switch (type) {
      case types.SET_ROUTES:
        draftState.routes = payload
        break
      case types.SET_ADD_ROUTES:
        draftState.addRoutes = payload
        break
      default:
        return draftState
    }
  })

export default permission
