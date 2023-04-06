import { AppStore } from '../../type'
import produce from 'immer'
import * as types from '@/redux/mutation-types'

const initialState: AppStore = {
  isCollapse: false,
  language: 'en'
}

const app = (state: AppStore = initialState, { type, payload }) => {
  produce(state, (draftState) => {
    switch (type) {
      case types.UPDATE_COLLAPSE:
        draftState.isCollapse = payload
        break
      case types.SET_LANGUAGE:
        draftState.language = payload
        break
      default:
        return draftState
    }
  })
}

export default app
