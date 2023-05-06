import { UserStore } from '@/redux/type'
import produce from 'immer'
import * as types from '@/redux/mutation-types'
import { getToken } from '@/utils/auth'

const initialState: UserStore = {
  token: getToken(),
  roles: [],
  userInfo: null
}

const user = (state = initialState, { type, payload }) =>
  produce(state, (draftState) => {
    switch (type) {
      case types.SET_TOKEN:
        draftState.token = payload
        break
      case types.SET_ROLES:
        draftState.roles = payload
        break
      case types.SET_USERINFO:
        draftState.userInfo = payload
        break
      default:
        return draftState
    }
  })

export default user
