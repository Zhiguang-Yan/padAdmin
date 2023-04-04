import * as types from '@/redux/mutation-types'

const initialState = {}

const permission = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default permission
