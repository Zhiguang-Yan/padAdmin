import { UserStore } from '@/redux/type'
import produce from 'immer'
import * as types from '@/redux/mutation-types'

const initialState: UserStore = {
  token: null,
  roles: [],
  userInfo: null
}

const user = (state = initialState, { type, payload }) => {
  produce(state, (draftState) => {
    switch (type) {
      case types.SET_TOKEN:
        return (draftState.token = payload)
      case types.SET_ROLES:
        return (draftState.roles = payload)
      case types.SET_USERINFO:
        return (draftState.userInfo = payload)
      default:
        return draftState
    }
  })
}

export default user
