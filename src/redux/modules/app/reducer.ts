import { appStore } from '../../type'
import produce from 'immer'
import * as types from '@/redux/mutation-types'

const initialState: appStore = {
  isCollapse: false,
  language: 'en'
}

const app = (state: appStore = initialState, { type, payload }) => {
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
