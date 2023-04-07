import { combineReducers, applyMiddleware, legacy_createStore as createStore } from 'redux'
import app from './modules/app/reducer'
// import permission from './modules/permission/reducer'
// import user from './modules/user/reducer'
import reduxThunk from 'redux-thunk'

const reducer = combineReducers({
  app
  // user,
  // permission
})

const store = createStore(reducer, applyMiddleware(reduxThunk))

export { store }
